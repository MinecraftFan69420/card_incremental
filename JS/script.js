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
    player.points = player.points.add(player.ppc.base.times(player.ppc.mult.totalmanual)); devlog("Manual click success")
}
function autoclick() {
    player.points = player.points.add(player.ppc.base.times(player.ppc.mult.totalauto)); devlog("Autoclicker click success")
}

function chargecardeffect(card) {
    switch (card) {
        case 1: 
            player.ppc.mult.C3 = player.ppc.mult.C3.pow(2)
            document.getElementById("cardc2").style.display = "block"; break
    }   
}

function buycard(card) {
    const targetcard = cards.regular[card]
    const hascard = player.card_possession.regular[card]
    const exists = targetcard !== undefined
    let hassufficientpoints = player.points.gte(targetcard.cost)
    if (hassufficientpoints && !hascard && exists) {
        player.points = player.points.sub(targetcard.cost); 
        player.card_possession.regular[card] = true 
        document.getElementById(`card${card}`).style.display = "none"; 
        targetcard.effect(); devlog(`Card ${card} bought succesfully!`)
    } else devlog(`Card purchase failure. Either: not enough points, 
already have card, or card doesn't exist.`)
}

function buychargecard(card) {
    const targetcard = cards.charge[card]
    hassufficientresources = player.points.gte(targetcard.cost[0]) && player.charge.amount.gte(targetcard.cost[1])
    if (hassufficientresources && targetcard.has === false) {
        player.points = player.points.sub(targetcard.cost[0]); 
        player.charge.amount = player.points.sub(targetcard.cost[1]); 
        player.card_possession.charge[card] = true 
        document.getElementById(`chargecard${card}`).style.display = "none"; cardeffect(card)
        devlog(`Charge card ${card} bought succesfully!`)
    } else devlog(`Charge card purchase failure: not enough resources (missing points / charge)`)
}

function buybuyable(buyable) {
    const targetbuyable = player.buyables[buyable]
    if (player.points.gte(targetbuyable.cost) && targetbuyable.amount.lte(targetbuyable.maxpurchases)) {
        player.points = player.points.sub(targetbuyable.cost); targetbuyable.amount = targetbuyable.amount.plus(1) 
        switch (buyable) {
            case 1: player.ppc.base = player.buyables[1].amount.plus(1); break
            case 2:
                player.autoclicker.strength = player.autoclicker.strength.plus(1)
                player.defaultcooldowns.current = player.defaultcooldowns[player.autoclicker.strength]
                player.autoclicker.cooldown = player.defaultcooldowns.current; break
            case 3: player.ppc.mult.C5 = (new Decimal(1.2)).pow(player.buyables[3].amount); break
        }
        devlog(`Buyable ${buyable} bought succesfully!`)
    } else devlog(`Buyable purchase failure: not enough points, or hit max purchases`)
}

function chargeprestige() {
    if (player.points.gte(player.charge.req)) {
        for (buyable = 1; buyable <= 3; buyable++) { player.buyables[buyable].amount = new Decimal(0); player.points = new Decimal(0) }
        player.charge.times = player.charge.times.plus(1); document.getElementById("gocharge").style.display = "block"
        devlog("Charge prestige successful")
    } else devlog("Charge prestige failure: player didn't hit the requirement.")
    document.getElementById("card11").style.display = "block"
}

function applysaveboosts() {
    cardnos.forEach(cardNo => {
        if (player.card_possession.regular[cardNo]) {
            if (cardNo.neq(10)) document.getElementById(`card${cardNo}`).style.display = 'none';
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
