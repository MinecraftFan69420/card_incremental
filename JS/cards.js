const cards = {
    regular: {
        1: {
            cost: new Decimal(20),
            effect: function() {
                document.getElementById("buyable1").style.display = "block"
                document.getElementById("card2").style.display = "block";
            }
        },
        2: {
            cost: new Decimal(200),
            effect: function () {
                document.getElementById("buyable2").style.display = 'block' // show buyable 2
                document.getElementById("autoclickers").style.display = 'block'
                document.getElementById("ppsdisp").style.display = 'block'
                document.getElementById("card3").style.display = 'block'; 
            }
        },
        3: {
            cost: new Decimal(500),
            effect: function() {
                player.ppc.mult.constants = player.ppc.mult.constants.times(2)
                document.getElementById("card4").style.display = 'block' // Double ppc
            }
        },
        4: {
            cost: new Decimal(2000),
            effect: function() {
                document.getElementById("card5").style.display = 'block';
            }
        },
        5: {
            cost: new Decimal(2000),
            effect: function() {
                document.getElementById("card6pairwarning").style.display = 'block'
                document.getElementById("buyable3").style.display = 'block' // Show buyable 3
                document.getElementById("card6.1").style.display = 'block';
                document.getElementById("card6.2").style.display = 'block';
            }
        },
        6.1: {
            cost: new Decimal(5000),
            effect: function() {
                player.ppc.mult.C6A = new Decimal(3) // Triple manual click multiplier
                document.getElementById("card6pairwarning").style.display = 'none'
                document.getElementById("card6.2").style.display = 'none'
                document.getElementById("card7").style.display = 'block'
            }
        }, 
        6.2: {
            cost: new Decimal(5000),
            effect: function() {
                player.ppc.mult.C6B = new Decimal(3) // Double autoclicker click multiplier
                document.getElementById("card6pairwarning").style.display = 'none'
                document.getElementById("card6.1").style.display = 'none'
                document.getElementById("card7").style.display = 'block'
            }
        },
        7: {
            cost: new Decimal(10_000),
            effect: function() {
                player.ppc.mult.constants = player.ppc.mult.constants.times(3)
                document.getElementById("card8").style.display = "block";
            }
        },
        8: {
            cost: new Decimal(31_415),
            effect: function() {
                player.ppc.mult.constants = player.ppc.mult.constants.times(Math.E - 1)
                document.getElementById("card9pairwarning").style.display = 'block'
                document.getElementById("card9.1").style.display = "block"
                document.getElementById("card9.2").style.display = "block"
            }
        },
        9.1: {
            cost: new Decimal(100_000),
            effect: function() {
                document.getElementById("card9pairwarning").style.display = 'none'
                document.getElementById("card9.2").style.display = "none"; 
                document.getElementById("card10").style.display = "block";
            }
        }, 
        9.2: {
            cost: new Decimal(100_000),
            effect: function() {
                player.buyables[2].maxpurchases = new Decimal(7);
                document.getElementById("card9pairwarning").style.display = 'none'
                document.getElementById("card9.1").style.display = "none"
                document.getElementById("card10").style.display = "block"
            }
        },
        10: {
            cost: new Decimal(500_000),
            effect: function() {
                player.charge.unlocked = true
                document.getElementById("chargedisp").style.display = 'block'
                document.getElementById("chargereset").style.display = 'block'
            }
        },
        11: {
            cost: new Decimal(694_200),
            effect: function() {
                player.ppc.mult.constants = player.ppc.mult.constants(Math.log10(69))
                document.getElementById("card12").style.display = "block"; 
            }
        },
        12: {
            cost: new Decimal(1_500_000),
            effect: function() {
                document.getElementById("gochargecards").style.display = "block";
            }
        }
    },
    charge: {
        1: {
            cost: [new Decimal(500_000), new Decimal(200)],
            effect: function() {
                player.ppc.mult.C3 = player.ppc.mult.C3.pow(2)
                document.getElementById("cardc2").style.display = "block"
            }
        }, // about cost: first element is points, second one is charge
        2: {
            cost: [new Decimal(1_000_000), new Decimal(500)],
            effect: function() {energy_gain_base = new Decimal(2.1)}
        }
    }
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