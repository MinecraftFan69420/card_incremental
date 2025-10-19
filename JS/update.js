function gamecalculations() {
    player.ppc.mult.totalmanual = (player.ppc.mult.C5 * player.ppc.mult.C6A * player.ppc.mult.constants * player.ppc.mult.C9A).toFixed(2)
    player.ppc.mult.totalauto = (player.ppc.mult.C5 * player.ppc.mult.C6B * player.ppc.mult.constants * player.ppc.mult.C9B).toFixed(2)
    // autoclicker
    if (player.autoclicker.strength !== 0) player.autoclicker.cooldown--
    if (player.autoclicker.cooldown <= 0) {autoclick(); player.autoclicker.cooldown = player.defaultcooldowns.current}
    // Scaling
    if (!player.card_possession[4]) { player.buyables[1].cost = Math.floor(20 * (1.5 ** player.buyables[1].amount)) }
    else { player.buyables[1].cost = Math.floor(20 * (1.3 ** player.buyables[1].amount)) }
    player.buyables[2].cost = Math.floor(100 * (3 ** player.buyables[2].amount))
    player.buyables[3].cost = Math.floor(1000 * (1.5 ** player.buyables[3].amount))
    if (player.autoclicker.strength === 0) player.defaultcooldowns.current = Infinity
    else player.defaultcooldowns.current = player.defaultcooldowns[Math.min(player.autoclicker.strength,5)]
    if (player.card_possession[9.1]) player.ppc.mult.C9A = Math.sqrt(player.autoclicker.cps * player.ppc.mult.C6B*player.ppc.mult.C9B)
    else player.ppc.mult.C9A = 1
    if (player.autoclicker.strength > 5) {
        switch (player.autoclicker.strength) {
            case 6: player.ppc.mult.C9B = 2; break
            case 7: player.ppc.mult.C9B = 4; break
        }
    } else player.ppc.mult.C9B = 1
    if (player.charge.times === 0 || player.charge.unlocked === false) player.charge.persecond = 0
    else if (player.card_possession.charge[2]) player.charge.persecond = (2.1 ** (player.charge.times - 1))
    else player.charge.persecond = (2 ** (player.charge.times - 1))
    player.autoclicker.cps = 20 / player.defaultcooldowns.current
    player.charge.req = 1_000_000 * (10 ** player.charge.times)
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
    document.getElementById("ppcmultconstantstotal").textContent = player.ppc.mult.constants.toFixed(2)
    document.getElementById("ppcmulttotalmanual").textContent = player.ppc.mult.totalmanual
    document.getElementById("ppcmulttotalauto").textContent = player.ppc.mult.totalauto
    document.getElementById("ppcbase").textContent = player.ppc.base
    document.getElementById('ppcautobase').textContent = player.ppc.base
    document.getElementById('ppcmultstat').textContent = player.ppc.mult.totalmanual
    document.getElementById('ppcmultautostat').textContent = player.ppc.mult.totalauto
    document.getElementById('ppcmult').textContent = player.card_possession[3] ? 2 : 1
    document.getElementById('ppcmult3a').textContent = player.ppc.mult.C6A
    document.getElementById('ppcmult3b').textContent = player.ppc.mult.C6B
    document.getElementById('ppcmult4').textContent = player.card_possession[7] ? 3 : 1
    document.getElementById("ppcmult5").textContent = player.card_possession[8] ? (Math.E - 1).toFixed(2) : 1
    document.getElementById("ppcmult6a").textContent = player.ppc.mult.C9A
    document.getElementById("ppcmult6b").textContent = player.ppc.mult.C9B
    document.getElementById("ppcmult7").textContent = player.card_possession[11] ? Math.log10(69).toFixed(2) : 1
    document.getElementById("ppcstat").textContent = player.ppc.base * player.ppc.mult.totalmanual
    document.getElementById('ppcautostat').textContent = player.ppc.base * player.ppc.mult.totalauto * player.autoclicker.cps
    document.getElementById('ppcautocps').textContent = player.autoclicker.cps
    document.getElementById('ppcautocpsstat').textContent = player.autoclicker.cps
    document.getElementById('charge').textContent = player.charge.amount
    document.getElementById('chargereq').textContent = player.charge.req
    document.getElementById('chargetimesstat').textContent = player.charge.times
    document.getElementById('chargemultstat').textContent = player.charge.persecond
    document.getElementById('chargepersecondtotalstat').textContent = player.charge.persecond
}

function update() {
    gamecalculations()
    updateHTML()
    devlog("Update function success")
}