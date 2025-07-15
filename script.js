const cardnos = [1, 2, 3, 4, 5, 6.1, 6.2, 7, 8, 9.1, 9.2, 10, 11, 12]

function swaptab(tab) { // Switch tabs!
    const tabnames = ["pointsnstuff", "cards", "stats", "story", "save", "devconsole"]
    if ((tab - 1) % 1 === 0) {
        const tabtoswapto = tabnames[tab - 1]
        tabnames.forEach(t => document.getElementById(t).style.display = "none")
        document.getElementById(tabtoswapto).style.display = "block"
        devlog(`Tab switch to ${tabtoswapto} succesful`)
    } else {
        switch (Math.floor(tab)) {
            case 3:
                let subtabtoshow;
                if (tab === 3.1) {subtabtoshow = "regular"}
                else if (tab === 3.2) {subtabtoshow = "charge"}
                Array.from(document.getElementsByClassName("cardsubtab")).forEach(el => el.style.display = "none")
                document.getElementById(`cardsubtab-${subtabtoshow}`).style.display = "block"; break
        }
    }
}

function getpoints() {
    player.points += (player.ppc.base * player.ppc.mult.totalmanual); devlog("Manual click success")
}
function autoclick() {
    player.points += (player.ppc.base * player.ppc.mult.totalauto); devlog("Autoclicker click success")
}

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
            player.ppc.mult.C3 = 2
            document.getElementById("card4").style.display = 'block'; break // Double ppc
        case 4: document.getElementById("card5").style.display = 'block'; break
        case 5:
            document.getElementById("card6pairwarning").style.display = 'block'
            document.getElementById("buyable3").style.display = 'block' // Show buyable 3
            document.getElementById("card6.1").style.display = 'block';
            document.getElementById("card6.2").style.display = 'block';break
        case 6.1:
            player.ppc.mult.C6A = 3 // Triple manual click multiplier
            document.getElementById("card6pairwarning").style.display = 'none'
            document.getElementById("card6.2").style.display = 'none'
            document.getElementById("card7").style.display = 'block'; break
        case 6.2:
            player.ppc.mult.C6B = 2 // Double autoclicker click multiplier
            document.getElementById("card6pairwarning").style.display = 'none'
            document.getElementById("card6.1").style.display = 'none'
            document.getElementById("card7").style.display = 'block'; break
        case 7: 
            player.ppc.mult.C7 = 3
            document.getElementById("card8").style.display = "block"; break // Triple the point gain
        case 8: 
            player.ppc.mult.C8 = Math.E - 1
            document.getElementById("card9pairwarning").style.display = 'block'
            document.getElementById("card9.1").style.display = "block"
            document.getElementById("card9.2").style.display = "block"; break
        case 9.1: 
            document.getElementById("card9pairwarning").style.display = 'none'
            document.getElementById("card9.2").style.display = "none"; 
            document.getElementById("card10").style.display = "block"; break
        case 9.2:
            player.buyables[2].maxpurchases = 7;
            document.getElementById("card9pairwarning").style.display = 'none'
            document.getElementById("card9.1").style.display = "none"
            document.getElementById("card10").style.display = "block"; break
        case 10:
            player.charge.unlocked = true
            document.getElementById("chargedisp").style.display = 'block'// Shows the charge resource
            document.getElementById("chargereset").style.display = 'block' // Shows the charge reset
            break
        case 11:
            player.ppc.mult.C11 = Math.log10(69)
            document.getElementById("card12").style.display = "block"; break
        case 12: document.getElementById("gochargecards").style.display = "block"; break
        default: devlog("Card effect failure: such card doesn't exist!")
    }
}

function chargecardeffect(card) {
    switch (card) {
        case 1: player.ppc.mult.C3 = player.ppc.mult.C3 ** 2 // "**=" doesn't exist as far as i'm concerned
    }   
}

function buycard(card) {
    const targetcard = player.cards.regular[card]
    let hassufficientpoints = player.points >= targetcard.cost
    if (hassufficientpoints && targetcard.has === false) {
        player.points -= targetcard.cost; targetcard.has = true 
        document.getElementById(`card${card}`).style.display = "none"; cardeffect(card)
        devlog(`Card ${card} bought succesfully!`)
    } else devlog(`Card purchase failure: not enough points!`)
}

function buychargecard(card) {
    const targetcard = player.cards.charge[card]
    hassufficientresources = player.points >= targetcard.cost[0] && player.charge.amount >= targetcard.cost[1]
    if (hassufficientresources && targetcard.has === false) {
        player.points -= targetcard.cost[0]; player.charge.amount -= targetcard.cost[1]; targetcard.has = true 
        document.getElementById(`chargecard${card}`).style.display = "none"; cardeffect(card)
        devlog(`Charge card ${card} bought succesfully!`)
    } else devlog(`Charge card purchase failure: not enough resources (missing points / charge)`)
}

function buybuyable(buyable) {
    const targetbuyable = player.buyables[buyable]
    if (player.points >= targetbuyable.cost && targetbuyable.amount <= targetbuyable.maxpurchases) {
        player.points -= targetbuyable.cost; targetbuyable.amount++ 
        switch (buyable) {
            case 1: player.ppc.base = 1 + player.buyables[1].amount; break
            case 2:
                player.autoclicker.strength++
                player.defaultcooldowns.current = player.defaultcooldowns[player.autoclicker.strength]
                player.autoclicker.cooldown = player.defaultcooldowns.current; break
            case 3: player.ppc.mult.C5 = 1.2 ** player.buyables[3].amount; break
        }
        devlog(`Buyable ${buyable} bought succesfully!`)
    } else devlog(`Buyable purchase failure: not enough points, or hit max purchases`)
}

function chargeprestige() {
    if (player.points >= player.charge.req) {
        for (buyable = 1; buyable <= 3; buyable++) { player.buyables[buyable].amount = 0; player.points = 0 }
        player.charge.times++; document.getElementById("gocharge").style.display = "block"
        devlog("Charge prestige successful")
    } else devlog("Charge prestige failure: player didn't hit the requirement.")
    document.getElementById("card11").style.display = "block"
}

function applysaveboosts() {
    cardnos.forEach(cardNo => {
        if (player.cards.regular[cardNo].has) {
            if (cardNo !== 10) document.getElementById(`card${cardNo}`).style.display = 'none';
            cardeffect(cardNo)
        }
    })
}

// Save menu
function save() { localStorage.setItem("player", JSON.stringify(player)) }
function load() {
    if (localStorage.getItem("player") != null) {
        player = JSON.parse(localStorage.getItem("player"))
        if (player.autoclicker.cooldown == "Infinity") player.autoclicker.cooldown = Infinity
        applysaveboosts()
    } else devlog("Save file does not exist")
}
function reset() { 
    if (confirm("Are you sure?")) {resetplayer(); localStorage.removeItem("player"); devlog("Save reset") } 
}

function gamecalculations() {
    player.ppc.mult.pre6total = player.ppc.mult.C3 * player.ppc.mult.C5
    player.ppc.mult.post6constantstotal = (player.ppc.mult.C7 * player.ppc.mult.C8 * player.ppc.mult.C11)
    player.ppc.mult.totalmanual = (player.ppc.mult.pre6total * player.ppc.mult.C6A * player.ppc.mult.post6constantstotal * player.ppc.mult.C9A).toFixed(2)
    player.ppc.mult.totalauto = (player.ppc.mult.pre6total * player.ppc.mult.C6B * player.ppc.mult.post6constantstotal * player.ppc.mult.C9B).toFixed(2)
    // autoclicker
    if (player.autoclicker.strength !== 0) player.autoclicker.cooldown--
    if (player.autoclicker.cooldown <= 0) {autoclick(); player.autoclicker.cooldown = player.defaultcooldowns.current}
    // Scaling
    if (!player.cards.regular[4].has) { player.buyables[1].cost = Math.floor(20 * (1.5 ** player.buyables[1].amount)) }
    else { player.buyables[1].cost = Math.floor(20 * (1.3 ** player.buyables[1].amount)) }
    player.buyables[2].cost = Math.floor(100 * (3 ** player.buyables[2].amount))
    player.buyables[3].cost = Math.floor(1000 * (1.5 ** player.buyables[3].amount))
    if (player.autoclicker.strength === 0) player.defaultcooldowns.current = Infinity
    else player.defaultcooldowns.current = player.defaultcooldowns[Math.min(player.autoclicker.strength,5)]
    if (player.cards.regular[9.1].has) player.ppc.mult.C9A = Math.sqrt(player.autoclicker.cps * player.ppc.mult.C6B*player.ppc.mult.C9B)
    else player.ppc.mult.C9A = 1
    if (player.autoclicker.strength > 5) {
        switch (player.autoclicker.strength) {
            case 6: player.ppc.mult.C9B = 2; break
            case 7: player.ppc.mult.C9B = 4; break
        }
    } else player.ppc.mult.C9B = 1
    if (player.charge.times === 0 || player.charge.unlocked === false) player.charge.persecond = 0 
    else player.charge.persecond = (2 ** (player.charge.times - 1)) 
    player.autoclicker.cps = 20 / player.defaultcooldowns.current
}

function updateHTML() {
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
    document.getElementById("buyable3eff").textContent = player.ppc.mult.C5.toFixed(2)
    document.getElementById("buyable1eff").textContent = player.buyables[1].amount
    document.getElementById("ppcbasetotal").textContent = player.ppc.base
    document.getElementById("ppcmultpost6constantstotal").textContent = player.ppc.mult.post6constantstotal.toFixed(2)
    document.getElementById("ppcmulttotalmanual").textContent = player.ppc.mult.totalmanual
    document.getElementById("ppcmulttotalauto").textContent = player.ppc.mult.totalauto
    document.getElementById("ppcbase").textContent = player.ppc.base
    document.getElementById('ppcautobase').textContent = player.ppc.base
    document.getElementById('ppcmultstat').textContent = player.ppc.mult.totalmanual
    document.getElementById('ppcmultautostat').textContent = player.ppc.mult.totalauto
    document.getElementById('ppcmult').textContent = player.ppc.mult.C3
    document.getElementById('ppcmult3a').textContent = player.ppc.mult.C6A
    document.getElementById('ppcmult3b').textContent = player.ppc.mult.C6B
    document.getElementById('ppcmult4').textContent = player.ppc.mult.C7
    document.getElementById("ppcmult5").textContent = player.ppc.mult.C8
    document.getElementById("ppcmult6a").textContent = player.ppc.mult.C9A
    document.getElementById("ppcmult6b").textContent = player.ppc.mult.C9B
    document.getElementById("ppcmult7").textContent = player.ppc.mult.C11
    document.getElementById('ppcmultpre6total').textContent = player.ppc.mult.pre6total.toFixed(2)
    document.getElementById("ppcstat").textContent = player.ppc.base * player.ppc.mult.totalmanual
    document.getElementById('ppcautostat').textContent = player.ppc.base * player.ppc.mult.totalauto * player.autoclicker.cps
    document.getElementById('ppcautocps').textContent = player.autoclicker.cps
    document.getElementById('ppcautocpsstat').textContent = player.autoclicker.cps
    document.getElementById('charge').textContent = player.charge.amount
    document.getElementById('chargereq').textContent = player.charge.req
}

function update() {
    gamecalculations()
    updateHTML()
    devlog("Update function success")
}
setInterval(update, 50) // A tick is 50 ms
setInterval(() => {if (player.charge.unlocked) player.charge.amount += player.charge.persecond}, 1000) // Get charge