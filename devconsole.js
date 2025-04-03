import { player } from "script.js"
import { swaptab } from "script.js"

// Dev Authentication
function devauthenticate() {
    const correct_password = "*#&*[Qgh5]7$y"
    password_input = prompt("Enter Dev Console password:")
    if (password_input === correct_password) { alert("Correct!"); swaptab(6) }
    else alert("INCORRECT! Only a developer would know the password!")
}