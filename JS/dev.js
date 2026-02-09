// Dev Authentication
function devauthenticate() {
    const correct_password = "\x2a\x23\x26\x2a\x5b\x51\x67\x68\x35\x5d\x37\x24\x79"
    if (!player.consoleunlocked) {
        password_input = prompt("Enter Dev Console password:")
        if (password_input === correct_password) { alert("Correct!"); swaptab(6); player.consoleunlocked = true }
        else alert("INCORRECT! Only a developer would know the password!")
    } else swaptab(5)
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
            let card6choice = prompt("Which card from the card  pair will you steal? (6A/6B) You can't take both!")
            if (card6choice === "6A") { delete chosencards[6] } // Note: traces of "undefined" will be left 
            else if (card6choice === "6B") { delete chosencards[5] } // in the deleted things' remains.
            let card9choice = prompt("Which card from the card 9 pair will you steal? (9A/9B) You can't take both!")
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
        const pointstogain = new Decimal(words[2]) // The number after point gain
        player.points = player.points.plus(pointstogain); devlog(`${pointstogain.toString()} point(s) gained`)
    } else alert("Nonexistent command!")
}
