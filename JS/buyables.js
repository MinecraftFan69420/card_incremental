const buyables = {
    1: {
        cost: new Decimal(20),
        maxpurchases: Decimal.dInf,
        effect: function() {
            player.ppc.base = player.ppc.base.plus(1); 
            buyables[1].cost = player.card_possession[4]
            ? new Decimal(20).times(new Decimal(1.3).pow(player.buyable_amounts[1])).floor()
            : new Decimal(20).times(new Decimal(1.5).pow(player.buyable_amounts[1])).floor()
        }
    },
    2: {
        cost: new Decimal(100),
        maxpurchases: new Decimal(5),
        effect: function() {
            player.autoclicker.strength = player.autoclicker.strength.plus(1)
            player.defaultcooldowns.current = player.defaultcooldowns[player.autoclicker.strength]
            player.autoclicker.cooldown = player.defaultcooldowns.current
            buyables[2].cost = 
            new Decimal(100).times(new Decimal(3).pow(player.buyable_amounts[2])).floor()
        }
    },
    3: {
        cost: new Decimal(1000),
        maxpurchases: Decimal.dInf,
        effect: function() {
            player.ppc.mult.C5 = new Decimal(1.2).pow(player.buyable_amounts[3])
            buyables[3].cost = 
            new Decimal(1000).times(new Decimal(1.5).pow(player.buyable_amounts[3])).floor()
        }
    }
}

function buybuyable(buyable) {
    const targetbuyable = buyables[buyable]
    const buyable_amt = player.buyable_amounts[buyable]
    if (player.points.gte(targetbuyable.cost) && 
    buyable_amt.lte(targetbuyable.maxpurchases)) {
        player.points = player.points.sub(targetbuyable.cost); 
        player.buyable_amounts[buyable] = player.buyable_amounts[buyable].plus(1)
        buyables[buyable].effect()
        devlog(`Buyable ${buyable} bought succesfully!`)
    } else devlog(`Buyable purchase failure: not enough points, or hit max purchases`)
}