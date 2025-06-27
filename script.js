const default_player = {
    points: 0,
    ppc: {
        base: 1,
        mult: { // A list of multipliers to the point gain.
            C3: 1,
            C5: 1,
            pre6total: 1, // The total of all multiplies before card 6
            C6A: 1, C6B: 1,
            C7: 1,
            C8: 1,
            post6constantstotal: 1, //this is the total of all constant multipliers after card 6
            C9A: 1, C9B: 1,
            C11: 1, // Card 11 multiplier, not implemented yet
            totalmanual: 1, // Total of manual bonuses
            totalauto: 1, // Total of autoclicker multipliers
        }
    },
    cards: { // Costs of cards & if the player has them.
        regular: {
            1: { cost: 20, has: false },
            2: { cost: 200, has: false },
            3: { cost: 500, has: false },
            4: { cost: 2000, has: false },
            5: { cost: 2000, has: false },
            6.1: { cost: 5000, has: false }, 6.2: { cost: 5000, has: false }, 
            7: {cost: 10_000, has: false},
            8: {cost: 31_415, has: false},
            9.1: { cost: 100_000, has: false }, 9.2: { cost: 100_000, has: false },
            10: {cost: 500_000, has: false},
            11: {cost: 694_200, has: false},
            12: {cost: 1_500_000, has: false,}
        },
        charge: {
            1: { cost: [500_000, 200], has: false } // about cost: first element is points, second one is charge
        }
    },
    buyables: { // Cost of buyables & how many the player has, and maximum purchases. e308 means no limit.
        1: { amount: 0, cost: 20, maxpurchases: 1e308 },
        2: { amount: 0, cost: 100, maxpurchases: 5 },
        3: { amount: 0, cost: 1000, maxpurchases: 1e308 }
    },
    autoclicker: { strength: 0, cooldown:  Infinity, cps: 0 }, // Stats, cooldown in ticks. 
    defaultcooldowns: { 0: Infinity, 1: 20, 2: 10, 3: 5, 4: 2, 5: 1, 6: 1, 7: 1, current: Infinity }, // Default autoclicker cooldowns in ticks
    charge: {amount: 0, req: 1_000_000, unlocked: false, times: 0, persecond: 0}, // Charge resource, requirement to prestige, and how many times the player has prestiged
    consoleunlocked: false
}
const cardnos = [1, 2, 3, 4, 5, 6.1, 6.2, 7, 8, 9.1, 9.2, 10, 11, 12]
player = default_player
function resetplayer() {player = default_player}

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

function cardeffect(card) { // Apply a card's effect
    switch (card) { // Which card is it?
        case 1: 
            document.getElementById("buyable1").style.display = "block"
            document.getElementById("card2").style.display = "block"; break // Show buyable 1
        case 2:
            document.getElementById("buyable2").style.display = 'block' // show buyable 2
            document.getElementById("autoclickers").style.display = 'block'
            document.getElementById("ppsdisp").style.display = 'block'
            document.getElementById("card3").style.display = 'block'; break
        case 3: 
            player.ppc.mult.C3 = 2
            document.getElementById("card4").style.display = 'block'; break // Double ppc
        case 4: document.getElementById("card5").style.display = 'block'; break
        case 5:
            document.getElementById("card6pairwarning").style.display = 'block'
            document.getElementById("buyable3").style.display = 'block' // Show buyable 3
            document.getElementById("card6.1").style.display = 'block';
            document.getElementById("card6.2").style.display = 'block';break
        case 6.1:
            player.ppc.mult.C6A = 3 // Triple manual click multiplier
            document.getElementById("card6pairwarning").style.display = 'none'
            document.getElementById("card6.2").style.display = 'none'
            document.getElementById("card7").style.display = 'block'; break
        case 6.2:
            player.ppc.mult.C6B = 2 // Double autoclicker click multiplier
            document.getElementById("card6pairwarning").style.display = 'none'
            document.getElementById("card6.1").style.display = 'none'
            document.getElementById("card7").style.display = 'block'; break
        case 7: 
            player.ppc.mult.C7 = 3
            document.getElementById("card8").style.display = "block"; break // Triple the point gain
        case 8: 
            player.ppc.mult.C8 = Math.E - 1
            document.getElementById("card9pairwarning").style.display = 'block'
            document.getElementById("card9.1").style.display = "block"
            document.getElementById("card9.2").style.display = "block"; break
        case 9.1: 
            document.getElementById("card9pairwarning").style.display = 'none'
            document.getElementById("card9.2").style.display = "none"; 
            document.getElementById("card10").style.display = "block"; break
        case 9.2:
            player.buyables[2].maxpurchases = 7;
            document.getElementById("card9pairwarning").style.display = 'none'
            document.getElementById("card9.1").style.display = "none"
            document.getElementById("card10").style.display = "block"; break
        case 10:
            player.charge.unlocked = true
            document.getElementById("chargedisp").style.display = 'block'// Shows the charge resource
            document.getElementById("chargereset").style.display = 'block' // Shows the charge reset
            break
        case 11: player.ppc.mult.C11 = Math.log10(69) // Card 11 multiplier, not implemented yet
        default: devlog("Card effect failure: such card doesn't exist!")
    }
}

function chargecardeffect(card) {
    switch (card) {
        case 1: player.ppc.mult.C3 = player.ppc.mult.C3 ** 2 // "**=" doesn't exist as far as i'm concerned
    }   
}

function buycard(card) {
    const targetcard = player.cards.regular[card]
    let hassufficientpoints = player.points >= targetcard.cost
    if (hassufficientpoints && targetcard.has === false) {
        player.points -= targetcard.cost; targetcard.has = true 
        document.getElementById(`card${card}`).style.display = "none"; cardeffect(card)
        devlog(`Card ${card} bought succesfully!`)
    } else devlog(`Card purchase failure: not enough points!`)
}

function buychargecard(card) {
    const targetcard = player.cards.charge[card]
    hassufficientresources = player.points >= targetcard.cost[0] && player.charge.amount >= targetcard.cost[1]
    if (hassufficientresources && targetcard.has === false) {
        player.points -= targetcard.cost[0]; player.charge.amount -= targetcard.cost[1]; targetcard.has = true 
        document.getElementById(`chargecard${card}`).style.display = "none"; cardeffect(card)
        devlog(`Charge card ${card} bought succesfully!`)
    } else devlog(`Charge card purchase failure: not enough resources (missing points / charge)`)
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
        if (player.cards.regular[cardNo].has) {
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

function update() {
    player.ppc.mult.pre6total = player.ppc.mult.C3 * player.ppc.mult.C5
    player.ppc.mult.post6constantstotal = (player.ppc.mult.C7 * player.ppc.mult.C8)
    player.ppc.mult.totalmanual = (player.ppc.mult.pre6total * player.ppc.mult.C6A * player.ppc.mult.post6constantstotal * player.ppc.mult.C9A).toFixed(2)
    player.ppc.mult.totalauto = (player.ppc.mult.pre6total * player.ppc.mult.C6B * player.ppc.mult.post6constantstotal * player.ppc.mult.C9B).toFixed(2)
    if (player.autoclicker.strength === 0) player.defaultcooldowns.current = Infinity
    else player.defaultcooldowns.current = player.defaultcooldowns[Math.min(player.autoclicker.strength,5)]
    if (player.cards.regular[9.1].has) player.ppc.mult.C9A = Math.sqrt(player.autoclicker.cps * player.ppc.mult.C6B*player.ppc.mult.C9B)
    else player.ppc.mult.C9A = 1
    if (player.autoclicker.strength > 5) {
        switch (player.autoclicker.strength) {
            case 6: player.ppc.mult.C9B = 2; break
            case 7: player.ppc.mult.C9B = 4; break
        }
    } else player.ppc.mult.C9B = 1
    if (player.charge.times === 0 || player.charge.unlocked === false) player.charge.persecond = 0 
    else player.charge.persecond = (2 ** (player.charge.times - 1)) 
    player.autoclicker.cps = 20 / player.defaultcooldowns.current
    // Visual updates
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
    document.getElementById("ppcmultpost6constantstotal").textContent = player.ppc.mult.post6constantstotal.toFixed(2)
    document.getElementById("ppcmulttotalmanual").textContent = player.ppc.mult.totalmanual
    document.getElementById("ppcmulttotalauto").textContent = player.ppc.mult.totalauto
    document.getElementById("ppcbase").textContent = player.ppc.base
    document.getElementById('ppcautobase').textContent = player.ppc.base
    document.getElementById('ppcmultstat').textContent = player.ppc.mult.totalmanual
    document.getElementById('ppcmultautostat').textContent = player.ppc.mult.totalauto
    document.getElementById('ppcmult').textContent = player.ppc.mult.C3
    document.getElementById('ppcmult3a').textContent = player.ppc.mult.C6A
    document.getElementById('ppcmult3b').textContent = player.ppc.mult.C6B
    document.getElementById('ppcmult4').textContent = player.ppc.mult.C7
    document.getElementById("ppcmult5").textContent = player.ppc.mult.C8
    document.getElementById("ppcmult6a").textContent = player.ppc.mult.C9A
    document.getElementById("ppcmult6b").textContent = player.ppc.mult.C9B
    document.getElementById("ppcmult7").textContent = player.ppc.mult.C11
    document.getElementById('ppcmultpre6total').textContent = player.ppc.mult.pre6total.toFixed(2)
    document.getElementById("ppcstat").textContent = player.ppc.base * player.ppc.mult.totalmanual
    document.getElementById('ppcautostat').textContent = player.ppc.base * player.ppc.mult.totalauto * player.autoclicker.cps
    document.getElementById('ppcautocps').textContent = player.autoclicker.cps
    document.getElementById('ppcautocpsstat').textContent = player.autoclicker.cps
    document.getElementById('charge').textContent = player.charge.amount
    document.getElementById('chargereq').textContent = player.charge.req
    // autoclicker
    if (player.autoclicker.strength !== 0) player.autoclicker.cooldown--
    if (player.autoclicker.cooldown <= 0) {autoclick(); player.autoclicker.cooldown = player.defaultcooldowns.current}
    // Scaling
    if (!player.cards.regular[4].has) { player.buyables[1].cost = Math.floor(20 * (1.5 ** player.buyables[1].amount)) }
    else { player.buyables[1].cost = Math.floor(20 * (1.3 ** player.buyables[1].amount)) }
    player.buyables[2].cost = Math.floor(100 * (3 ** player.buyables[2].amount))
    player.buyables[3].cost = Math.floor(1000 * (1.5 ** player.buyables[3].amount))
    devlog("Update function success")
}
setInterval(update, 50) // A tick is 50 ms
setInterval(() => {if (player.charge.unlocked) player.charge.amount += player.charge.persecond}, 1000) // Get charge

// Dev Authentication
function devauthenticate() {
    const correct_password = "*#&*[Qgh5]7$y"
    if (!player.consoleunlocked) {
        password_input = prompt("Enter Dev Console password:")
        if (password_input === correct_password) { alert("Correct!"); swaptab(6); player.consoleunlocked = true }
        else alert("INCORRECT! Only a developer would know the password!")
    } else swaptab(6)
}

let lastLog = { message: "", count: 0 }; // Track the last log message and its count

function devlog(entry) {
    const devlog = document.getElementById("devlog"); // The developer log container
    // Check if the new entry is the same as the last one
    if (lastLog.message === entry) {
        lastLog.count++; // Increment the count
        const lastLogElement = devlog.lastElementChild; // Get the last log element
        if (lastLogElement) lastLogElement.textContent = `${entry} (x${lastLog.count})`
        // Update the text with the count
    } else {
        // New log entry
        lastLog = { message: entry, count: 1 }; // Reset the last log tracker
        const newEntry = document.createElement("p"); // Create a new <p> element
        newEntry.textContent = entry; // Set the text content
        devlog.appendChild(newEntry); // Append the new element to the log
    }
}

function entercommand() {
    command = prompt("Enter a command")
    const words = command.split(" ")
    if (command.startsWith("card steal")) {
        const cardtosteal = words[2]; // The number after "card steal"
        if (cardtosteal === "all") {
            let chosencards = cardnos
            let card6choice = prompt("Which card from the card  pair will you buy? (6A/6B) You can't take both!")
            if (card6choice === "6A") { delete chosencards[6] } // Note: traces of "undefined" will be left 
            else if (card6choice === "6B") { delete chosencards[5] } // in the deleted things' remains.
            let card9choice = prompt("Which card from the card 9 pair will you buy? (9A/9B) You can't take both!")
            if (card9choice === "9A") {delete chosencards[10]} 
            else if (card9choice === "9B") { delete chosencards[9] }
            chosencards = chosencards.filter(card => card !== undefined) // Remove the undefined.
            chosencards.forEach(card => entercommand(`card steal ${card}`))
        } else {
            // Convert to number and validate
            const cardNumber = Number(cardtosteal);
            if (!isNaN(cardNumber)) {
                const targetcard = player.cards.regular[cardNumber];
                if (targetcard) {
                    const cardelement = document.getElementById(`card${cardNumber}`);
                    if (cardelement) {
                        if (!targetcard.has) {
                            player.points += targetcard.cost; buycard(cardNumber)
                            devlog(`Card ${cardNumber} stolen and used!`);
                        } else devlog(`Steal unsuccessful: Card ${cardNumber} is already owned!`);
                    } else devlog(`Steal unsuccessful: No HTML for card ${cardNumber}`);
                } else devlog("Steal unsuccessful: That card was not put in Javascript!");
            } else devlog("Steal unsuccessful: Invalid card number!");
        }
    }
    else if (command.startsWith("point gain")) {
        const pointstogain = Number(words[2]) // The number after point gain
        player.points += pointstogain; devlog(`${pointstogain} point(s) gained`)
    } else alert("Nonexistent command!")
}