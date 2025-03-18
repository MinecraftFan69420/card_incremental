player = { // The player object.
    points: 0,
    ppc: {
        base: 1,
        mult: { // A list of multipliers to the point gain.
            1: 1, // #1 from card 3
            2: 1, // #2 from card 5 / buyable 3
            pre6total: 1, // The total of all multiplies before card 6
            3.1: 1, // #3A from card 6A
            3.2: 1, // #3B from card 6B
            4: 1, // #4 from card 7
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
        6.1: { cost: 5000, has: false },
        6.2: { cost: 5000, has: false }, 
        7: {cost: 10_000, has: false},
    },
    buyables: { // Cost of buyables & how many the player has.
        1: { amount: 0, cost: 20 },
        2: { amount: 0, cost: 100 },
        3: { amount: 0, cost: 1000 }
    },
    autoclicker: { strength: 0, cooldown: Infinity, cps: 0 }, // Stats. Cooldown in ticks.
    defaultcooldowns: { 0: Infinity, 1: 20, 2: 10, 3: 5, 4: 2, 5: 1, current: Infinity } // Default autoclicker cooldowns
}

function resetplayer() {
    player = { // The player object.
        points: 0,
        ppc: {
            base: 1,
            mult: { // A list of multipliers to the point gain.
                1: 1, // #1 from card 3
                2: 1, // #2 from card 5 / buyable 3
                pre6total: 1, // The total of all multiplies before card 6
                3.1: 1, // #3A from card 6A
                3.2: 1, // #3B from card 6B
                4: 1, // #4 from card 7
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
            6.1: { cost: 5000, has: false },
            6.2: { cost: 5000, has: false }, 
            7: {cost: 10_000, has: false},
        },
        buyables: { // Cost of buyables & how many the player has.
            1: { amount: 0, cost: 20 },
            2: { amount: 0, cost: 100 },
            3: { amount: 0, cost: 1000 }
        },
        autoclicker: { strength: 0, cooldown: Infinity, cps: 0 }, // Stats. Cooldown in ticks.
        defaultcooldowns: { 0: Infinity, 1: 20, 2: 10, 3: 5, 4: 2, 5: 1, current: Infinity } // Default autoclicker cooldowns
    }
}

function swaptab(tab) { // Switch tabs!
    switch (tab) {
        case 1: // Go to the main tab
            document.getElementById("main").style.display = "block"
            document.getElementById("cards").style.display = "none"
            document.getElementById("stats").style.display = "none"
            document.getElementById("story").style.display = "none"
            document.getElementById("save").style.display = "none"; break;
        case 2: // Go to the cards tab
            document.getElementById("main").style.display = "none"
            document.getElementById("cards").style.display = "block"
            document.getElementById("stats").style.display = "none"
            document.getElementById("story").style.display = "none"
            document.getElementById("save").style.display = "none"; break;
        case 3: // Go to the stats tab
            document.getElementById("main").style.display = "none"
            document.getElementById("cards").style.display = "none"
            document.getElementById("stats").style.display = "block"
            document.getElementById("story").style.display = "none"
            document.getElementById("save").style.display = "none";  break;
        case 4: // Go to the story tab
            document.getElementById("main").style.display = "none"
            document.getElementById("cards").style.display = "none"
            document.getElementById("stats").style.display = "none"
            document.getElementById("story").style.display = "block"
            document.getElementById("save").style.display = "none"; break
        case 5: // Go to the save tab
            document.getElementById("main").style.display = "none"
            document.getElementById("cards").style.display = "none"
            document.getElementById("stats").style.display = "none"
            document.getElementById("story").style.display = "none"
            document.getElementById("save").style.display = "block"
    }
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
        case 4: document.getElementById("card5").style.display = 'block'
        case 5:
            document.getElementById("buyable3").style.display = 'block'
            document.getElementById("card6.1").style.display = 'block';
            document.getElementById("card6.2").style.display = 'block';break
        case 6.1:
            player.ppc.mult[3.1] = 3 // Triple manual click multiplier
            document.getElementById("card6pairwarning").style.display = 'none'
            document.getElementById("card6.2").style.display = 'none'; break
        case 6.2:
            player.ppc.mult[3.2] = 2 // Double autoclicker click multiplier
            document.getElementById("card6pairwarning").style.display = 'none'
            document.getElementById("card6.1").style.display = 'none'; break
        case 7: player.ppc.mult[4] = 3; break // Triple the point gain
    }
}

function buycard(card) { // Buy a card
    if (player.points >= player.cards[card].cost) {
        player.points -= player.cards[card].cost; player.cards[card].has = true
        document.getElementById(`card${card}`).style.display = "none"; cardeffect(card)
    }
}

function buybuyable(buyable) { // Buy a buyable
    if (player.points >= player.buyables[buyable].cost) {
        player.points -= player.buyables[buyable].cost
        player.buyables[buyable].amount++
        switch (buyable) {
            case 1: player.ppc.base = 1 + player.buyables[1].amount; break
            case 2:
                if (player.autoclicker.strength < 5) { player.autoclicker.strength++ };
                player.autoclicker.cooldown = player.defaultcooldowns.current; break
            case 3: player.ppc.mult[2] = 1.2 ** player.buyables[3].amount; break
        }
    }
}

function applysaveboosts() { // Apply save boosts based on what cards you have
    for (i = 1; i <= 7; i++) { // Hide all cards which the player has and apply card effects
        if (i === 6) continue
        else if (player.cards[i].has) { 
            document.getElementById(`card${i}`).style.display = 'none'; cardeffect(i)
        }
    }
    if (player.cards[6.1].has) {document.getElementById('card6.1').style.display = 'none'; cardeffect(6.1)}
    if (player.cards[6.2].has) {document.getElementById('card6.2').style.display = 'none'; cardeffect(6.2)}
}

// Save menu
function save() { localStorage.setItem("player", JSON.stringify(player)) }
function load() {
    if (localStorage.getItem("player") != null) {
        player = JSON.parse(localStorage.getItem("player")); applysaveboosts()
    }
}
function reset() { if (confirm("Are you sure?")) {resetplayer(); localStorage.removeItem("player") } }

function update() {
    player.ppc.mult.pre6total = player.ppc.mult[1] * player.ppc.mult[2]
    player.ppc.mult.totalmanual = (player.ppc.mult.pre6total * player.ppc.mult[3.1] * player.ppc.mult[4]).toFixed(2)
    player.ppc.mult.totalauto = (player.ppc.mult.pre6total * player.ppc.mult[3.2] * player.ppc.mult[4]).toFixed(2)
    player.defaultcooldowns.current = player.defaultcooldowns[player.autoclicker.strength]
    player.autoclicker.cps = 20 / player.defaultcooldowns.current
    // Visual updates
    document.getElementById("points").textContent = player.points.toFixed(2)
    document.getElementById("ppc").textContent = (player.ppc.base * player.ppc.mult.totalmanual).toFixed(2)
    document.getElementById("pps").textContent = (player.ppc.base * player.ppc.mult.totalauto * player.autoclicker.cps).toFixed(2)
    document.getElementById("autoclickstr").textContent = player.autoclicker.strength
    document.getElementById("buyable1cost").textContent = player.buyables[1].cost
    if (player.autoclicker.strength >= 5) document.getElementById("buyable2cost").textContent = "MAX"
    else document.getElementById("buyable2cost").textContent = player.buyables[2].cost
    document.getElementById("buyable3cost").textContent = player.buyables[3].cost
    // Stats
    document.getElementById("buyable3eff").textContent = player.ppc.mult[2].toFixed(2)
    document.getElementById("buyable1eff").textContent = player.buyables[1].amount
    document.getElementById("ppcbasetotal").textContent = player.ppc.base
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