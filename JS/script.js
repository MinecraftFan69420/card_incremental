const cardnos = [1, 2, 3, 4, 5, 6.1, 6.2, 7, 8, 9.1, 9.2, 10, 11, 12]
generatecardHTML()

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
        if (cards.regular[cardNo].has) {
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