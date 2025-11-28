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
    player.points = player.points.add(player.ppc.base.times(player.ppc.mult.totalmanual)); 
    devlog("Manual click success")
}
function autoclick() {
    player.points = player.points.add(player.ppc.base.times(player.ppc.mult.totalauto)); 
    devlog("Autoclicker click success")
}
function getcharge() {
    player.charge.amount = player.charge.amount.add(player.charge.persecond);
    devlog("Charge gain success")
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

// HTML setup
generatecardHTML()

setInterval(update, 50) // A tick is 50 ms
setInterval(() => {if (player.charge.unlocked) getcharge()}, 1000)