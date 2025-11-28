const cards = {
    regular: {
        1: {
            cost: new Decimal(20),
            name: "Humble Beginnings", effect_str: "Unlock a buyable!",
            effect: function() {
                document.getElementById("buyable1").style.display = "block"
                document.getElementById("card2").style.display = "block";
            }
        },
        2: {
            cost: new Decimal(200),
            name: "Laziness is key", effect_str: "Unlock the autoclicker and the second buyable!",
            effect: function () {
                document.getElementById("buyable2").style.display = 'block' // show buyable 2
                document.getElementById("autoclickers").style.display = 'block'
                document.getElementById("ppsdisp").style.display = 'block'
                document.getElementById("card3").style.display = 'block'; 
            }
        },
        3: {
            cost: new Decimal(500),
            name: "Point doubling!", effect_str: "Double point gain",
            effect: function() {
                player.ppc.mult.constants = player.ppc.mult.constants.times(2)
                document.getElementById("card4").style.display = 'block' // Double ppc
            }
        },
        4: {
            cost: new Decimal(2000),
            name: "Faster incremental", effect_str: "Reduce buyable 1's scaling! (x1.5 to x1.3)!",
            effect: function() {
                document.getElementById("card5").style.display = 'block';
            }
        },
        5: {
            cost: new Decimal(2000),
            name: "Can you replican?", effect_str: "Unlock the third buyable!",
            effect: function() {
                document.getElementById("card6pairwarning").style.display = 'block'
                document.getElementById("buyable3").style.display = 'block' // Show buyable 3
                document.getElementById("card6.1").style.display = 'block';
                document.getElementById("card6.2").style.display = 'block';
            }
        },
        6.1: {
            cost: new Decimal(5000),
            name: "Faster typing", effect_str: "Manual click power <br> is tripled!",
            effect: function() {
                player.ppc.mult.C6A = new Decimal(3) // Triple manual click multiplier
                document.getElementById("card6pairwarning").style.display = 'none'
                document.getElementById("card6.2").style.display = 'none'
                document.getElementById("card7").style.display = 'block'
            }
        }, 
        6.2: {
            cost: new Decimal(5000),
            name: "Faster autoclicker", effect_str: "Autoclicker click power <br> is tripled!",
            effect: function() {
                player.ppc.mult.C6B = new Decimal(3) // Double autoclicker click multiplier
                document.getElementById("card6pairwarning").style.display = 'none'
                document.getElementById("card6.1").style.display = 'none'
                document.getElementById("card7").style.display = 'block'
            }
        },
        7: {
            cost: new Decimal(10_000),
            name: "Cool, replican again!", effect_str: "Triple point gain!",
            effect: function() {
                player.ppc.mult.constants = player.ppc.mult.constants.times(3)
                document.getElementById("card8").style.display = "block";
            }
        },
        8: {
            cost: new Decimal(31_415),
            name: "Rush E", effect_str: "Multiply point gain by e-1!",
            effect: function() {
                player.ppc.mult.constants = player.ppc.mult.constants.times(Math.E - 1)
                document.getElementById("card9pairwarning").style.display = 'block'
                document.getElementById("card9.1").style.display = "block"
                document.getElementById("card9.2").style.display = "block"
            }
        },
        9.1: {
            cost: new Decimal(100_000),
            name: "Synergy", effect_str: "Clicking is more powerful based on the autoclicker's click rate!",
            effect: function() {
                document.getElementById("card9pairwarning").style.display = 'none'
                document.getElementById("card9.2").style.display = "none"; 
                document.getElementById("card10").style.display = "block";
            }
        }, 
        9.2: {
            cost: new Decimal(100_000),
            name: "Extra levels", effect_str: "Add 2 more purchases of buyable 2, doubling autoclicker effect!",
            effect: function() {
                player.buyables[2].maxpurchases = new Decimal(7);
                document.getElementById("card9pairwarning").style.display = 'none'
                document.getElementById("card9.1").style.display = "none"
                document.getElementById("card10").style.display = "block"
            }
        },
        10: {
            cost: new Decimal(500_000),
            name: "<b>MAX POWER!<b>", effect_str: "Unlock a new prestige layer...",
            effect: function() {
                player.charge.unlocked = true
                document.getElementById("chargedisp").style.display = 'block'
                document.getElementById("chargereset").style.display = 'block'
            }
        },
        11: {
            cost: new Decimal(694_200),
            name: "Dead meme, or is it?", effect_str: "Multiply point gain by log<sub>10</sub>(69)!",
            effect: function() {
                player.ppc.mult.constants = player.ppc.mult.constants.times(Math.log10(69))
                document.getElementById("card12").style.display = "block"; 
            }
        },
        12: {
            cost: new Decimal(1_500_000),
            name: "<b>NOT ENOUGH POWER!!</b>", effect_str: "Unlock charge cards!",
            effect: function() {
                document.getElementById("gochargecards").style.display = "block";
            }
        }
    },
    charge: {
        1: {
            cost: {pts: new Decimal(500_000), charge: new Decimal(200)},
            name: "The Power of Two", effect_str: "Square card 3's effect!",
            effect: function() {
                player.ppc.mult.C3 = player.ppc.mult.C3.pow(2)
                document.getElementById("cardc2").style.display = "block"
            }
        }, // about cost: first element is points, second one is charge
        2: {
            cost: {pts: new Decimal(1_000_000), charge: new Decimal(500)},
            name: "Compound<i>er</i> interest",
            effect_str: "Increase the formula of charge gain! (2^resets to 2.1^resets)",
            effect: function() {energy_gain_base = new Decimal(2.1)}
        }
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
    hassufficientresources = player.points.gte(targetcard.cost.points) 
    && player.charge.amount.gte(targetcard.cost.charge)
    if (hassufficientresources && targetcard.has === false) {
        player.points = player.points.sub(targetcard.cost.pts); 
        player.charge.amount = player.charge.amount.sub(targetcard.cost.charge); 
        player.card_possession.charge[card] = true 
        document.getElementById(`chargecard${card}`).style.display = "none"; cardeffect(card)
        devlog(`Charge card ${card} bought succesfully!`)
    } else devlog(`Charge card purchase failure: not enough resources (missing points / charge)`)
}

function stringify_card_no(card) {
    if (cards.regular[card] !== undefined) {
        if (card % 1 === 0.1) return `${Math.floor(card)}A`
        else if (card % 1 === 0.2) return `${Math.floor(card)}B`
        else return card
    }
}

function generatecardHTML() {
    for (card in cards.regular) {
        card_obj = cards.regular[card]
        let carddiv = document.createElement("div")
        carddiv.id = `card${card}`
        carddiv.className = "card"
        carddiv.setAttribute("onclick", `buycard(${card})`)
        carddiv.innerHTML = 
        `
            <h2>${card_obj.name}</h2> <p>#${stringify_card_no(card)}</p>
            <h3>Effect:</h3> <p>${card_obj.effect_str}</p>
            <h3>Cost:</h3> <p>${card_obj.cost.toString()} points</p>
        `
        document.getElementById("cardsubtab-regular").appendChild(carddiv)
    }
    for (card in cards.charge) {
        card_obj = cards.charge[card]
        effect_str = card_obj.effect_str
        cost = card_obj.cost
        let carddiv = document.createElement("div")
        carddiv.id = `cardc${card}`
        carddiv.className = "card"
        carddiv.setAttribute("onclick", `buycard(${card})`)
        carddiv.innerHTML = 
        `
            <h2>${card_obj.name}</h2> <p>#C${stringify_card_no(card)}</p>
            <h3>Effect:</h3> <p>${effect_str}</p>
            <h3>Cost:</h3> <p>${cost.pts.toString()} points, ${cost.charge.toString()} charge</p>
        `
        document.getElementById("cardsubtab-charge").appendChild(carddiv)
    }
}