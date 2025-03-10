var player = {
    points: 0,
    ppc: {
        base: 1,
        mult: {
            1: 1,
            2: 1,
            pre6total: 1,
            3.1: 1,
            3.2: 1,
            totalmanual: 1,
            totalauto: 1,
        }
    },
    cards: {
        1: { cost: 20, has: false },
        2: { cost: 200, has: false },
        3: { cost: 500, has: false },
        4: { cost: 2000, has: false },
        5: { cost: 2000, has: false },
        6.1: { cost: 5000, has: false },
        6.2: { cost: 5000, has: false },
    },
    buyables: {
        1: { amount: 0, cost: 20 },
        2: { amount: 0, cost: 100 },
        3: { amount: 0, cost: 1000 }
    },
    autoclicker: { strength: 0, cooldown: 20, cps: 0 }, // in ticks. 1 tick: 50 ms
    defaultcountdowns: { 0: Infinity, 1: 20, 2: 10, 3: 5, 4: 2, 5: 1, current: 20 },

}

var shorthands = {
    tabs: {
        main: document.getElementById('main')
    }
}

function swaptab(tab) {
    switch (tab) {
        case 1: // Go to the main tab
            shorthands.tabs.main.style.display = "block"
            document.getElementById("cards").style.display = "none"
            document.getElementById("buyables").style.display = "none"
            document.getElementById("stats").style.display = "none"
            document.getElementById("story").style.display = "none"
            document.getElementById("save").style.display = "none"
            break;
        case 2: // Go to the cards tab
            shorthands.tabs.main.style.display = "none"
            document.getElementById("cards").style.display = "block"
            document.getElementById("buyables").style.display = "none"
            document.getElementById("stats").style.display = "none"
            document.getElementById("story").style.display = "none"
            document.getElementById("save").style.display = "none"
            break;
        case 3: // Go to the buyables tab
            shorthands.tabs.main.style.display = "none"
            document.getElementById("cards").style.display = "none"
            document.getElementById("buyables").style.display = "block"
            document.getElementById("stats").style.display = "none"
            document.getElementById("story").style.display = "none"
            document.getElementById("save").style.display = "none"
            break;
        case 4: // Go to the buyables tab
            shorthands.tabs.main.style.display = "none"
            document.getElementById("cards").style.display = "none"
            document.getElementById("buyables").style.display = "none"
            document.getElementById("stats").style.display = "block"
            document.getElementById("story").style.display = "none"
            document.getElementById("save").style.display = "none"
            break;
        case 5:
            shorthands.tabs.main.style.display = "none"
            document.getElementById("cards").style.display = "none"
            document.getElementById("buyables").style.display = "none"
            document.getElementById("stats").style.display = "none"
            document.getElementById("story").style.display = "block"
            document.getElementById("save").style.display = "none"
            break
        case 6:
            shorthands.tabs.main.style.display = "none"
            document.getElementById("cards").style.display = "none"
            document.getElementById("buyables").style.display = "none"
            document.getElementById("stats").style.display = "none"
            document.getElementById("story").style.display = "none"
            document.getElementById("save").style.display = "block"
    }
}

function getpoints() { player.points += (player.ppc.base * player.ppc.mult.totalmanual) }
    function autoclick() { player.points += (player.ppc.base * player.ppc.mult.totalauto) }

    function cardeffect(card) {
        switch (card) {
            case 1:
                document.getElementById("buyable1").style.display = "block" // Show buyable 1
                document.getElementById('notunlocked').style.display = 'none'; break
            case 2:
                document.getElementById("buyable2").style.display = 'block' // show buyable 2
                document.getElementById("autoclickers").style.display = 'block'; break
            case 3: player.ppc.mult[1] = 2; break // Double ppc
            case 5: document.getElementById("buyable3").style.display = 'block'; break
            case 6.1:
                player.ppc.mult[3.1] = 3
                document.getElementById("card6pairwarning").style.display = 'none'
                document.getElementById("card6.2").style.display = 'none'; break
            case 6.2:
                player.ppc.mult[3.2] = 2;
                document.getElementById("card6pairwarning").style.display = 'none'
                document.getElementById("card6.1").style.display = 'none'; break
        }
    }

    function buycard(card) {
        if (player.points >= player.cards[card].cost) {
            player.points -= player.cards[card].cost
            player.cards[card].has = true
            document.getElementById(`card${card}`).style.display = "none"
        }
        cardeffect(card)
    }

    function buybuyable(buyable) {
        if (player.points >= player.buyables[buyable].cost) {
            player.points -= player.buyables[buyable].cost
            player.buyables[buyable].amount++
            switch (buyable) {
                case 1: player.ppc.base = 1 + player.buyables[1].amount; break
                case 2: if (player.autoclicker.strength <= 5) { player.autoclicker.strength++ }; break
                case 3: player.ppc.mult[2] = 1.2 ** player.buyables[3].amount; break
            }
        }
    }

    function applysaveboosts() {
        if (player.cards[1].has) document.getElementById("notunlocked").style.display = 'none'
        for (i = 1; i <= 5; i++) {
            if (player.cards[i].has) { document.getElementById(`card${i}`).style.display = 'none'; cardeffect(i) }
        }
    }

    function save() { localStorage.setItem("player", JSON.stringify(player)) }
    function load() { player = JSON.parse(localStorage.getItem("player")); applysaveboosts() }
    function reset() { if (confirm("Are you sure?")) { localStorage.removeItem("player"); load() } }

    function update() {
        player.ppc.mult.pre6total = player.ppc.mult[1] * player.ppc.mult[2]
        player.ppc.mult.totalmanual = (player.ppc.mult.pre6total * player.ppc.mult[3.1]).toFixed(2)
        player.ppc.mult.totalauto = (player.ppc.mult.pre6total * player.ppc.mult[3.2]).toFixed(2)
        player.autoclicker.cps = 20 / player.defaultcountdowns.current
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
        document.getElementById("buyable3eff").textContent = player.ppc.mult[2]
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
        document.getElementById('ppcmultpre6total').textContent = Math.round(player.ppc.mult.pre6total)
        document.getElementById("ppcstat").textContent = player.ppc.base * player.ppc.mult.totalmanual
        document.getElementById('ppcautostat').textContent = player.ppc.base * player.ppc.mult.totalauto * (20 / player.defaultcountdowns.current)
        document.getElementById('ppcautocps').textContent = 20 / (player.defaultcountdowns[player.autoclicker.strength])
        document.getElementById('ppcautocpsstat').textContent = 20 / (player.defaultcountdowns[player.autoclicker.strength])
        // autoclicker
        player.autoclicker.cooldown--
        if (player.autoclicker.cooldown <= 0 && player.autoclicker.strength != 0) {
            autoclick(); player.autoclicker.cooldown = player.defaultcountdowns[player.autoclicker.strength]
            player.defaultcountdowns.current = player.defaultcountdowns[player.autoclicker.strength]
        }
        // Scaling
        if (!player.cards[4].has) { player.buyables[1].cost = Math.floor(20 * (1.5 ** player.buyables[1].amount)) }
        else { player.buyables[1].cost = Math.floor(20 * (1.3 ** player.buyables[1].amount)) }
        player.buyables[2].cost = Math.floor(100 * (3 ** player.buyables[2].amount))
        player.buyables[3].cost = Math.floor(1000 * (1.5 ** player.buyables[3].amount))
    }

    setInterval(update, 50) // A tick is 50 ms