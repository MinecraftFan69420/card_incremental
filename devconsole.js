import { player } from "./script.js"
import { swaptab } from "./script.js"
import { cardeffect } from "./script.js"

// Dev Authentication
function devauthenticate() {
    const correct_password = "*#&*[Qgh5]7$y"
    password_input = prompt("Enter Dev Console password:")
    if (password_input === correct_password) { alert("Correct!"); swaptab(6) }
    else alert("INCORRECT! Only a developer would know the password!")
}

function devlog(entry) {
    const newentry = document.createElement("p") // Add something new to the log
    newentry.textContent = entry
    const devlog = document.getElementById("devlog")
    devlog.appendChild(newentry)
}

function entercommand() {
    command = prompt("Enter a command")
    const words = command.split(" ")
    if (command.startsWith("card steal")) {
        const cardtosteal = words[2] // The number after card steal
        if (player.cards[cardtosteal]) {
            const cardElement = document.getElementById(`card${cardtosteal}`)
            if (cardElement) {
                cardElement.style.display = "none"; cardeffect(cardtosteal)
                devlog(`Card ${cardtosteal} has been stolen and used!`)
            } else devlog("Steal unsuccesful: that card does not exist!")
        } else devlog("Steal unsuccesful: that card does not exist!")
    } else alert("Nonexistent command!")
}