function gamecalculations() {
    player.ppc.mult.totalmanual = new Decimal((player.ppc.mult.C5 * player.ppc.mult.C6A * player.ppc.mult.constants * player.ppc.mult.C9A).toFixed(2))
    player.ppc.mult.totalauto = new Decimal((player.ppc.mult.C5 * player.ppc.mult.C6B * player.ppc.mult.constants * player.ppc.mult.C9B).toFixed(2))
    // autoclicker
    if (player.autoclicker.strength.neq(0)) player.autoclicker.cooldown = player.autoclicker.cooldown.sub(1)
    if (player.autoclicker.cooldown.lte(0)) {autoclick(); player.autoclicker.cooldown = player.defaultcooldowns.current}
    // Scaling
    if (!player.card_possession[4]) { player.buyables[1].cost = new Decimal(20 * (1.5 ** player.buyables[1].amount)).floor() }
    else { player.buyables[1].cost = new Decimal(20 * (1.3 ** player.buyables[1].amount)).floor() }
    player.buyables[2].cost = new Decimal(100 * (3 ** player.buyables[2].amount)).floor())
    player.buyables[3].cost = new Decimal(1000 * (1.5 ** player.buyables[3].amount)).floor())
    if (player.autoclicker.strength === 0) player.defaultcooldowns.current = Infinity
    else player.defaultcooldowns.current = player.defaultcooldowns[Decimal.min(player.autoclicker.strength,new Decimal(5))]
    if (player.card_possession[9.1]) player.ppc.mult.C9A = new Decimal(player.autoclicker.cps * player.ppc.mult.C6B*player.ppc.mult.C9B).sqrt()
    else player.ppc.mult.C9A = new Decimal(1)
    if (player.autoclicker.strength > 5) {
        switch (player.autoclicker.strength) {
            case 6: player.ppc.mult.C9B = new Decimal(2); break
            case 7: player.ppc.mult.C9B = new Decimal(4); break
            // 67 🤷‍♂️🤷‍♂️🤷‍♂️
        }
    } else player.ppc.mult.C9B = new Decimal(1)
    if (player.charge.times === new Decimal(0) || player.charge.unlocked === false) player.charge.persecond = new Decimal(0)
    else if (player.card_possession.charge[2]) player.charge.persecond = new Decimal(2.1).pow(player.charge.times - 1))
    else player.charge.persecond = new Decimal(2).pow(player.charge.times - 1))
    player.autoclicker.cps = 20 / player.defaultcooldowns.current
    player.charge.req = new Decimal(1_000_000).times(new Decimal(10).pow(player.charge.times))
}

function updateHTML() {
    document.getElementById("points").textContent = player.points.toFixed(2)
    document.getElementById("ppc").textContent = (player.ppc.base * player.ppc.mult.totalmanual).toFixed(2)
    document.getElementById("pps").textContent = (player.ppc.base * player.ppc.mult.totalauto * player.autoclicker.cps).toFixed(2)
    document.getElementById("autoclickstr").textContent = player.autoclicker.strength.toString()
    document.getElementById("buyable1cost").textContent = player.buyables[1].cost.toString()
    if (player.autoclicker.strength >= player.buyables[2].maxpurchases) {
        document.getElementById("buyable2cost").textContent = "MAX"
    }
    else document.getElementById("buyable2cost").textContent = player.buyables[2].cost.toString()
    document.getElementById("buyable3cost").textContent = player.buyables[3].cost.toString()
    // Stats
    document.getElementById("buyable3eff").textContent = player.ppc.mult.C5.toFixed(2)
    document.getElementById("buyable1eff").textContent = player.buyables[1].amount.toString()
    document.getElementById("ppcbasetotal").textContent = player.ppc.base.toString()
    document.getElementById("ppcmultconstantstotal").textContent = player.ppc.mult.constants.toFixed(2)
    document.getElementById("ppcmulttotalmanual").textContent = player.ppc.mult.totalmanual.toString()
    document.getElementById("ppcmulttotalauto").textContent = player.ppc.mult.totalauto.toString()
    document.getElementById("ppcbase").textContent = player.ppc.base.toString()
    document.getElementById('ppcautobase').textContent = player.ppc.base.toString()
    document.getElementById('ppcmultstat').textContent = player.ppc.mult.totalmanual.toString()
    document.getElementById('ppcmultautostat').textContent = player.ppc.mult.totalauto.toString()
    document.getElementById('ppcmult').textContent = player.card_possession[3] ? 2 : 1
    document.getElementById('ppcmult3a').textContent = player.ppc.mult.C6A.toString()
    document.getElementById('ppcmult3b').textContent = player.ppc.mult.C6B.toString()
    document.getElementById('ppcmult4').textContent = player.card_possession[7] ? 3 : 1
    document.getElementById("ppcmult5").textContent = player.card_possession[8] ? (Math.E - 1).toFixed(2) : 1
    document.getElementById("ppcmult6a").textContent = player.ppc.mult.C9A.toString()
    document.getElementById("ppcmult6b").textContent = player.ppc.mult.C9B.toString()
    document.getElementById("ppcmult7").textContent = player.card_possession[11] ? Math.log10(69).toFixed(2) : 1
    document.getElementById("ppcstat").textContent = player.ppc.base * player.ppc.mult.totalmanual.toString()
    document.getElementById('ppcautostat').textContent = player.ppc.base * player.ppc.mult.totalauto.times(player.autoclicker.cps).toString()
    document.getElementById('ppcautocps').textContent = player.autoclicker.cps.toString()
    document.getElementById('ppcautocpsstat').textContent = player.autoclicker.cps.toString()
    document.getElementById('charge').textContent = player.charge.amount.toString()
    document.getElementById('chargereq').textContent = player.charge.req.toString()
    document.getElementById('chargetimesstat').textContent = player.charge.times.toString()
    document.getElementById('chargemultstat').textContent = player.charge.persecond.toString()
    document.getElementById('chargepersecondtotalstat').textContent = player.charge.persecond.toString()
}

function update() {
    gamecalculations()
    updateHTML()
    devlog("Update function success")
}
