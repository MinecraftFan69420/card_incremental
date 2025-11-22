const buyables = {
    1: {
        cost_start: new Decimal(20),
        maxpurchases: Decimal.dInf,
        effect: function() {
            player.ppc.base = player.buyables[1].amount.plus(1)
        }
    },
    2: {
        cost_start: new Decimal(100),
        maxpurchases: new Decimal(5),
        effect: function() {
            player.autoclicker.strength = player.autoclicker.strength.plus(1)
            player.defaultcooldowns.current = player.defaultcooldowns[player.autoclicker.strength]
            player.autoclicker.cooldown = player.defaultcooldowns.current
        }
    },
    3: {
        cost_start: new Decimal(1000),
        maxpurchases: Decimal.dInf,
        effect: function() {
            player.ppc.mult.C5 = new Decimal(1.2).pow(player.buyables[3].amount)
        }
    }
}

function buybuyable(buyable) {
    const targetbuyable = player.buyables[buyable]
    if (player.points.gte(targetbuyable.cost) && 
    targetbuyable.amount.lte(targetbuyable.maxpurchases)) {
        player.points = player.points.sub(targetbuyable.cost); 
        targetbuyable.amount = targetbuyable.amount.plus(1) 
        buyables[buyable].effect()
        devlog(`Buyable ${buyable} bought succesfully!`)
    } else devlog(`Buyable purchase failure: not enough points, or hit max purchases`)
}