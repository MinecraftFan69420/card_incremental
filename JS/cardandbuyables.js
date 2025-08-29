cards = {
    regular: {
        1: {
            name: "Humble Beginnings", desc: "Unlock buyables!", cost: 20,
            effect: function () {
                document.getElementById("buyable1").style.display = "block"
                document.getElementById("card2").style.display = "block";
            }
        },
        2: {
            name: "Laziness is key", desc: "Unlock the second buyable!", cost: 200,
            effect: function () {
                document.getElementById("buyable2").style.display = 'block' // show buyable 2
                document.getElementById("autoclickers").style.display = 'block'
                document.getElementById("ppsdisp").style.display = 'block'
                document.getElementById("card3").style.display = 'block'
            }
        },
        3: {
            name: "Double up points!", desc: "Double point gain!", cost: 500,
            effect: function () {
                player.ppc.mult.C3 = 2
                document.getElementById("card4").style.display = 'block'
            }
        },
        4: {
            name: "Fast incremental", desc: "Reduce the scaling of buyable 1! <br> (x1.5 -> x1.3)", cost: 2000,
            effect: function () {
                document.getElementById("card5").style.display = 'block'
            }
        },
        5: {
            name: "Can you replican?", desc: "Unlock the third buyable!", cost: 2000,
            effect: function () {
                document.getElementById("card6pairwarning").style.display = 'block'
                document.getElementById("buyable3").style.display = 'block' // Show buyable 3
                document.getElementById("card6.1").style.display = 'block';
                document.getElementById("card6.2").style.display = 'block'
            }
        },
        6.1: {
            name: "Faster typing", desc: "Manual click power <br> is tripled", cost: 5000,
            effect: function() {
                player.ppc.mult.C6A = 3 // Triple manual click multiplier
                document.getElementById("card6pairwarning").style.display = 'none'
                document.getElementById("card6.2").style.display = 'none'
                document.getElementById("card7").style.display = 'block';
            }
        },
        6.2: {
            name: "Faster autoclicker", desc: "Double the autoclicker's power", cost: 5000,
            effect: function () {
                player.ppc.mult.C6B = 2 // Double autoclicker click multiplier
                document.getElementById("card6pairwarning").style.display = 'none'
                document.getElementById("card6.1").style.display = 'none'
                document.getElementById("card7").style.display = 'block';
            }
        },
        7: {
            name: "Cool, replican again!", desc: "Triple point gain", cost: 10_000,
            effect: function () {
                player.ppc.mult.C7 = 3
                document.getElementById("card8").style.display = "block";
            }
        },
        8: {
            name: "🇪", desc: "Multiply point gain by e-1", cost: 31_415,
            effect: function() {
                player.ppc.mult.C8 = Math.E - 1
                document.getElementById("card9pairwarning").style.display = 'block'
                document.getElementById("card9.1").style.display = "block"
                document.getElementById("card9.2").style.display = "block";
            }
        }, 
        9.1: {
            name: "Powerful clicking", desc: "Clicking is more powerful based off of autoclick rate", 
            cost: 100_000,
            effect: function() {
                document.getElementById("card9pairwarning").style.display = 'none'
                document.getElementById("card9.2").style.display = "none"; 
                document.getElementById("card10").style.display = "block";
            }
        },
        9.2: {
            name: "Faster autoclick", desc: "Adds two more max purchases of buyable 2 doubling autoclicker power.", cost: 100_000,
            effect: function() {
                player.buyables[2].maxpurchases = 7;
                document.getElementById("card9pairwarning").style.display = 'none'
                document.getElementById("card9.1").style.display = "none"
                document.getElementById("card10").style.display = "block";
            }
        }, 
        10: {
            name: "MAXIMUM POWER!!", desc: "Unlock a new prestige layer...", cost: 500_000,
            effect: function() {
                player.charge.unlocked = true
                document.getElementById("chargedisp").style.display = 'block'// Shows the charge resource
                document.getElementById("chargereset").style.display = 'block'
            }
        },
        11: {
            name: "Funny number", desc: "Multiply point gain by log(69)", cost: 694_200,
            effect: function () {
                player.ppc.mult.C11 = Math.log10(69)
                document.getElementById("card12").style.display = 'block';
            }
        },
        12: {
            name: "NOT ENOUGH POWER!!", desc: "Unlock a few charge cards", cost: 1_500_000,
            effect: function () {
                document.getElementById("gochargecards").style.display = "block";
            }
        }
    },
    charge: {
        1: {
            name: "TPOT", desc: "Square card 3", cost: [500_000, 200], // about cost: first element is points, second one is charge
            effect: function () {
                player.ppc.mult.C3 = player.ppc.mult.C3 ** 2 // "**=" doesn't exist as far as i'm concerned
            }
        }
    }
}

function formatcardID(id) {
    switch (id % 1) {
        case 0: return String(id); 
        case 0.1: return `${Math.floor(id)}A`;
        case 0.2: return `${Math.floor(id)}B`;
        default: devlog("Can't format card ID");
    }
}

function buycard(card) {
    targetcard = cards.regular[card]
    hassufficientpoints = player.points >= targetcard.cost
    if (hassufficientpoints && targetcard.has === false) {
        player.points -= targetcard.cost; targetcard.has = true 
        document.getElementById(`card${card}`).style.display = "none"; targetcard.effect()
        devlog(`Card ${card} bought succesfully!`)
    } else devlog(`Card purchase failure: not enough points!`)
}

function buychargecard(card) {
    targetcard = cards.charge[card]
    hassufficientresources = player.points >= targetcard.cost[0] && player.charge.amount >= targetcard.cost[1]
    if (hassufficientresources && targetcard.has === false) {
        player.points -= targetcard.cost[0]; player.charge.amount -= targetcard.cost[1]; targetcard.has = true 
        document.getElementById(`chargecard${card}`).style.display = "none"; targetcard.effect()
        devlog(`Charge card ${card} bought succesfully!`)
    } else devlog(`Charge card purchase failure: not enough resources (missing points / charge)`)
}

function generatecardHTML() {
    for (card in cards.regular) {
        cardElement = document.createElement("div");
        cardElement.id = `card${card}`;
        cardElement.className = "card";
        cardElement.style.display = card === 1 ? "block" : "none"
        cardElement.onclick = buycard(card);
        cardElement.innerHTML =
        `
            <h2>${card.name}</h2> <p>#${formatcardID(card.id)}</p>
            <h3>Effect: </h3> <p> ${card.desc} </p>
            <p>Cost: ${card.cost} points</p>
        `;
        document.getElementById("cardsubtab-regular").appendChild(cardElement);
    }
    for (chargecard in cards.charge) {
        chargecardElement = document.createElement("div")
        chargecardElement.id = `cardc${chargecard.id}`
        cardElement.className = "card-charge";
        cardElement.style.display = "none"
        cardElement.onclick = buychargecard(chargecard);
        cardElement.innerHTML =
        `
            <h2>${chargecard.name}</h2> <p>#C${formatcardID(chargecard.id)}</p>
            <h3>Effect: </h3> <p> ${chargecard.desc} </p>
            <p>Cost: ${chargecard.cost} points</p>
        `;
        document.getElementById("cardsubtab-charge").appendChild(cardElement)
    }
}