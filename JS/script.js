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
            player.ppc.mult.constants *= 2
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
            player.ppc.mult.constants *= 3
            document.getElementById("card8").style.display = "block"; break // Triple the point gain
        case 8: 
            player.ppc.mult.constants *= Math.E - 1
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
            player.ppc.mult.constants *= Math.log10(69)
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
    const targetcard = cards.regular[card]
    let hassufficientpoints = player.points >= targetcard.cost
    if (hassufficientpoints && targetcard.has === false) {
        player.points -= targetcard.cost; player.card_posession.regular[card] = true 
        document.getElementById(`card${card}`).style.display = "none"; cardeffect(card)
        devlog(`Card ${card} bought succesfully!`)
    } else devlog(`Card purchase failure: not enough points!`)
}

function buychargecard(card) {
    const targetcard = cards.charge[card]
    hassufficientresources = player.points >= targetcard.cost[0] && player.charge.amount >= targetcard.cost[1]
    if (hassufficientresources && targetcard.has === false) {
        player.points -= targetcard.cost[0]; 
        player.charge.amount -= targetcard.cost[1]; 
        player.card_possession.charge[card] = true 
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

setInterval(update, 50) // A tick is 50 ms
setInterval(() => {if (player.charge.unlocked) player.charge.amount += player.charge.persecond}, 1000) // Get charge