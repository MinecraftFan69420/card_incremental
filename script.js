const default_player = {
    points: 0,
    ppc: {
        base: 1,
        mult: { // A list of multipliers to the point gain.
            1: 1, // #1 from card 3
            2: 1, // #2 from card 5 / buyable 3
            pre6total: 1, // The total of all multiplies before card 6
            3.1: 1, 3.2: 1, // 3A from card 6A, and 3B from card 6B.
            4: 1, // #4 from card 7
            5: 1, // #5 from card 8
            post6constantstotal: 1, //this is the total of all constant multipliers after card 6
            6.1: 1, 6.2: 1, // #6A from card 9A, 6B from card 9B.
            totalmanual: 1, // Total of manual bonuses
            totalauto: 1, // Total of autoclicker multipliers
        }
    },
    cards: { // Costs of cards & if the player has them.
        1: { cost: 20, has: false },
        2: { cost: 200, has: false },
        3: { cost: 500, has: false },
        4: { cost: 2000, has: false },
        5: { cost: 2000, has: false },
        6.1: { cost: 5000, has: false }, 6.2: { cost: 5000, has: false }, 
        7: {cost: 10_000, has: false},
        8: {cost: 31_415, has: false},
        9.1: { cost: 100_000, has: false }, 9.2: { cost: 100_000, has: false },
    },
    buyables: { // Cost of buyables & how many the player has, and maximum purchases. Infinity means no limit.
        1: { amount: 0, cost: 20, maxpurchases: Infinity },
        2: { amount: 0, cost: 100, maxpurchases: 5 },
        3: { amount: 0, cost: 1000, maxpurchases: Infinity }
    },
    autoclicker: { strength: 0, cooldown: Infinity, cps: 0 }, // Stats, cooldown in ticks. 
    defaultcooldowns: {0: Infinity, 1: 20, 2: 10, 3: 5, 4: 2, 5: 1, current: Infinity, power: 1 }, // Default autoclicker cooldowns in ticks
}
player = default_player
function resetplayer() {player = default_player}

function swaptab(tab) { // Switch tabs!
    const tabnames = ["main", "cards", "stats", "story", "save"]
    tabnames.forEach(t => document.getElementById(t).style.display = "none")
    document.getElementById(tabnames[tab - 1]).style.display = "block"
}

function getpoints() { player.points += (player.ppc.base * player.ppc.mult.totalmanual) } // Manual click
function autoclick() { player.points += (player.ppc.base * player.ppc.mult.totalauto) } // Autoclicker press

function cardeffect(card) { // Apply a card's effect
    switch (card) { // Which card is it?
        case 1: 
            document.getElementById("buyable1").style.display = "block"
            document.getElementById("card2").style.display = "block"; break // Show buyable 1
        case 2:
            document.getElementById("buyable2").style.display = 'block' // show buyable 2
            document.getElementById("autoclickers").style.display = 'block'
            document.getElementById("ppsdisp").style.display = 'block'
            document.getElementById("card3").style.display = 'block'; break
        case 3: 
            player.ppc.mult[1] = 2
            document.getElementById("card4").style.display = 'block'; break // Double ppc
        case 4: document.getElementById("card5").style.display = 'block'; break
        case 5:
            document.getElementById("buyable3").style.display = 'block'
            document.getElementById("card6.1").style.display = 'block';
            document.getElementById("card6.2").style.display = 'block';break
        case 6.1:
            player.ppc.mult[3.1] = 3 // Triple manual click multiplier
            document.getElementById("card6pairwarning").style.display = 'none'
            document.getElementById("card6.2").style.display = 'none'
            document.getElementById("card7").style.display = 'block'; break
        case 6.2:
            player.ppc.mult[3.2] = 2 // Double autoclicker click multiplier
            document.getElementById("card6pairwarning").style.display = 'none'
            document.getElementById("card6.1").style.display = 'none'
            document.getElementById("card7").style.display = 'block'; break
        case 7: 
            player.ppc.mult[4] = 3
            document.getElementById("card8").style.display = "block"; break // Triple the point gain
        case 8: 
            player.ppc.mult[5] = 3.14
            document.getElementById("card9.1").style.display = "block"
            document.getElementById("card9.2").style.display = "block"; break
        case 9.1: document.getElementById("card9.2").style.display = "none"; break
        case 9.2:
            player.buyables[2].maxpurchases = 7;
            document.getElementById("card9.1").style.display = "none"; break
    }
}

function buycard(card) { // Buy a card
    if (player.points >= player.cards[card].cost) {
        player.points -= player.cards[card].cost; player.cards[card].has = true 
        document.getElementById(`card${card}`).style.display = "none"; cardeffect(card) // Hide card and apply eff
    }
}

function buybuyable(buyable) { // Buy a buyable
    if (player.points >= player.buyables[buyable].cost && player.buyables[buyable].amount <= player.buyables[buyable].maxpurchases) {
        player.points -= player.buyables[buyable].cost; player.buyables[buyable].amount++ 
        switch (buyable) { // Apply the buyable thing
            case 1: player.ppc.base = 1 + player.buyables[1].amount; break
            case 2:
                if (player.autoclicker.strength < player.buyables[2].maxpurchases) player.autoclicker.strength++
                player.defaultcooldowns.current = player.defaultcooldowns[player.autoclicker.strength]
                player.autoclicker.cooldown = player.defaultcooldowns.current; break
            case 3: player.ppc.mult[2] = 1.2 ** player.buyables[3].amount; break
        }
    }
}

function applysaveboosts() { // Apply save boosts based on what cards you have
    for (i = 1; i <= 9; i++) { // Hide all cards which the player has and apply card effects
        if (i === 6 || i === 9) continue // Skip the card 6 & 9 pairs
        else if (player.cards[i].has) {document.getElementById(`card${i}`).style.display = 'none'; cardeffect(i)}
    }
    if (player.cards[6.1].has) {document.getElementById('card6.1').style.display = 'none'; cardeffect(6.1)}
    if (player.cards[6.2].has) {document.getElementById('card6.2').style.display = 'none'; cardeffect(6.2)}
    if (player.cards[9.1].has) {document.getElementById('card9.1').style.display = 'none'; cardeffect(9.1)}
    if (player.cards[9.2].has) {document.getElementById('card9.2').style.display = 'none'; cardeffect(9.2)}
}

// Save menu
function save() { localStorage.setItem("player", JSON.stringify(player)) }
function load() {
    if (localStorage.getItem("player") != null) {
        player = JSON.parse(localStorage.getItem("player")); applysaveboosts()
        for (buyable in Object.values(player.buyables)) {
            if (buyable.maxpurchases == null) buyable.maxpurchases = Infinity
        } // For some reason localStorage is storing the Infinity as a string so convert it back
        if (player.autoclicker.cooldown == "Infinity") player.autoclicker.cooldown == Infinity
    }
}
function reset() { if (confirm("Are you sure?")) {resetplayer(); localStorage.removeItem("player") } }

function update() {
    player.ppc.mult.pre6total = player.ppc.mult[1] * player.ppc.mult[2]
    player.ppc.mult.post6constantstotal = (player.ppc.mult[4] * player.ppc.mult[5])
    player.ppc.mult.totalmanual = (player.ppc.mult.pre6total * player.ppc.mult[3.1] * player.ppc.mult.post6constantstotal * player.ppc.mult[6.1]).toFixed(2)
    player.ppc.mult.totalauto = (player.ppc.mult.pre6total * player.ppc.mult[3.2] * player.ppc.mult.post6constantstotal * player.ppc.mult[6.2]).toFixed(2)
    if (player.autoclicker.strength === 0) player.defaultcooldowns.current = Infinity
    else player.defaultcooldowns.current = player.defaultcooldowns[Math.min(player.autoclicker.strength,5)]
    if (player.cards[9.1].has) {player.ppc.mult[6.1] = ( player.autoclicker.cps * player.ppc.mult[3.2]*player.player.ppc.mult[6.2]) ** 0.5}
    else player.ppc.mult[6.1] = 1
    if (player.autoclicker.strength > 5) {
        switch (player.autoclicker.strength) {
            case 6: player.ppc.mult[6.2] == 2; break
            case 7: player.ppc.mult[6.2] == 4; break
        }
    } else player.ppc.mult[6.2] = 1
    player.autoclicker.cps = 20 / player.defaultcooldowns.current
    // Visual updates
    document.getElementById("points").textContent = player.points.toFixed(2)
    document.getElementById("ppc").textContent = (player.ppc.base * player.ppc.mult.totalmanual).toFixed(2)
    document.getElementById("pps").textContent = (player.ppc.base * player.ppc.mult.totalauto * player.autoclicker.cps).toFixed(2)
    document.getElementById("autoclickstr").textContent = player.autoclicker.strength
    document.getElementById("buyable1cost").textContent = player.buyables[1].cost
    if (player.autoclicker.strength >= player.buyables[2].maxpurchases) {
        document.getElementById("buyable2cost").textContent = "MAX"
    }
    else document.getElementById("buyable2cost").textContent = player.buyables[2].cost
    document.getElementById("buyable3cost").textContent = player.buyables[3].cost
    // Stats
    document.getElementById("buyable3eff").textContent = player.ppc.mult[2].toFixed(2)
    document.getElementById("buyable1eff").textContent = player.buyables[1].amount
    document.getElementById("ppcbasetotal").textContent = player.ppc.base
    document.getElementById("ppcmultpost6constantstotal").textContent = player.ppc.mult.post6constantstotal.toFixed(2)
    document.getElementById("ppcmulttotalmanual").textContent = player.ppc.mult.totalmanual
    document.getElementById("ppcmulttotalauto").textContent = player.ppc.mult.totalauto
    document.getElementById("ppcbase").textContent = player.ppc.base
    document.getElementById('ppcautobase').textContent = player.ppc.base
    document.getElementById('ppcmultstat').textContent = player.ppc.mult.totalmanual
    document.getElementById('ppcmultautostat').textContent = player.ppc.mult.totalauto
    document.getElementById('ppcmult').textContent = player.ppc.mult[1]
    document.getElementById('ppcmult3a').textContent = player.ppc.mult[3.1]
    document.getElementById('ppcmult3b').textContent = player.ppc.mult[3.2]
    document.getElementById('ppcmult4').textContent = player.ppc.mult[4]
    document.getElementById("ppcmult5").textContent = player.ppc.mult[5]
    document.getElementById("ppcmult6a").textContent = player.ppc.mult[6.1]
    document.getElementById("ppcmult6b").textContent = player.ppc.mult[6.2]
    document.getElementById('ppcmultpre6total').textContent = player.ppc.mult.pre6total.toFixed(2)
    document.getElementById("ppcstat").textContent = player.ppc.base * player.ppc.mult.totalmanual
    document.getElementById('ppcautostat').textContent = player.ppc.base * player.ppc.mult.totalauto * player.autoclicker.cps
    document.getElementById('ppcautocps').textContent = player.autoclicker.cps
    document.getElementById('ppcautocpsstat').textContent = player.autoclicker.cps
    // autoclicker
    if (player.autoclicker.strength !== 0) player.autoclicker.cooldown--
    if (player.autoclicker.cooldown <= 0) {autoclick(); player.autoclicker.cooldown = player.defaultcooldowns.current}
    // Scaling
    if (!player.cards[4].has) { player.buyables[1].cost = Math.floor(20 * (1.5 ** player.buyables[1].amount)) }
    else { player.buyables[1].cost = Math.floor(20 * (1.3 ** player.buyables[1].amount)) }
    player.buyables[2].cost = Math.floor(100 * (3 ** player.buyables[2].amount))
    player.buyables[3].cost = Math.floor(1000 * (1.5 ** player.buyables[3].amount))
}
setInterval(update, 50) // A tick is 50 ms

function aprilfools() {
    alert("APRIL FOOLS MOTHER F*****")
    window.open("https://youtube.com/watch?v=dQw4w9WgXcQ")    
}