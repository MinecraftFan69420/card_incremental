const buyables = {
    1: {
        cost: new Decimal(20),
        name: "This is what incrementing looks like", 
        effect_str: "Add 1 to the base points per click.",
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
        name: "Click for me!",
        effect_str: "Buy an autoclicker that clicks for you. Subsequent purchases increase speed.",
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
        name: "I replican!",
        effect_str: "Multiply point gain by x1.2!",
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

function generatebuyableHTML() {
    for (buyable in buyables) {
        buyable_obj = buyables[buyable]
        let buyable_div = document.createElement("button")
        buyable_div.id = `buyable${buyable}`
        buyable_div.className = "buyable"
        buyable_div.setAttribute("onclick", `buybuyable(${buyable})`)
        buyable_div.innerHTML = `
            #${buyable}: ${buyable_obj.name}: ${buyable_obj.effect_str}
            Cost: <span id=\"buyable${buyable}cost\"></span> points
        `
        document.getElementById("pointsnstuff").appendChild(buyable_div)
    }
}