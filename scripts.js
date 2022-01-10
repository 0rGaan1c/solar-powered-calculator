/* 
THESE NEED TO BE ISSUES ON THE ISSUE TRACKER:

BUGS: 
  ...none!? Please test this and find some!

BUGS which appear to be fixed:
  1. Equals sign sometimes blanks out display
  3. Not able to perform calculations on the result of another
     calculation (after equals is pressed)
  4. Nonsense input (multiple operators between two numbers) is allowed

FEATURES TO ADD (TODO):
  * Add more and better comments
  * Refactor entire switch/case section for buttons

FEATURES ADDED (DONE):
  2. Make calculator 'power off' after dark mode is on for too long
    * Turning dark mode off should subtract from the power off timer
*/


///// Setup

// Initial setting up of the screen
let screenOutput = '0';
let screen = document.querySelector("#screen");
screen.textContent = screenOutput;

// Clear the display after a result is shown
let equalsPressed = false;
// To disallow nonsense input (operators without numbers in-between)
let numberPressed = false;
// For calculator power down due to lack of 'light'
let batteryDead = false;
let lightsOn = true;
// Battery capacity, in seconds, is random between 5 and 10 seconds, inclusive
// Will be changed to be between 10 and 15 seconds, or something like that
const batteryCapacity = 5000 + Math.floor(Math.random() * 6) * 1000;
console.log(`Battery capacity is ${batteryCapacity}`);
let batteryCharge = batteryCapacity;
let chargeTimer = undefined;


///// Core calculator functionality

// Called when buttons are pressed; the meat & bones of the calculator
function button(pressed) {

    // For calculator power down due to lack of 'light'
    if (batteryCharge < 1000) {
        return;
    }

    // Don't display a leading zero
    if (screenOutput === '0') {
        screenOutput = '';
    }
    // Functionality for number buttons (zero through nine)
    if (typeof pressed === 'number') {
        // To disallow nonsense input (operators without numbers in-between)
        numberPressed = true;

        // Clear the display after a result is shown
        if (equalsPressed) {
            console.log('equalsPressed is true; resetting display...');
            equalsPressed = false;
            screenOutput = '';
        }
        screenOutput += pressed.toString();

    } else {
        if (equalsPressed) {
            equalsPressed = false;
        }
        
        // Functionality for buttons other than numbers
        // This whole next section could use some reactoring!
        switch (pressed) {
            case 'clear':
                screenOutput = '0';
                break;
            case 'delete':
                screenOutput = screenOutput.substring(0, screenOutput.length - 1);
                break;

            case 'decimal':
                // numberPressed is to disallow nonsense input (operators without numbers in-between)
                if (numberPressed) {
                    screenOutput += '.';
                }
                break;

            // Math operations

            case 'add':
                if (numberPressed) {
                    screenOutput += '+';
                }
                break;

            case 'subtract':
                if (numberPressed) {
                    screenOutput += '-';
                }
                break;

            case 'multiply':
                if (numberPressed) {
                    screenOutput += '*';
                }
                break;

            case 'divide':
                if (numberPressed) {
                    screenOutput += '/';
                }
                break;

            case 'modulo':
                if (numberPressed) {
                    screenOutput += '%';
                }
                break;

            case 'openparen':
                if (numberPressed) {
                    screenOutput += '(';
                }
                break;

            case 'closeparen':
                if (numberPressed) {
                    screenOutput += ')';
                }
                break;
            
            // Perform the calculation
            case 'equals':
                equalsPressed = true;
                screenOutput = String(eval(screenOutput));
                break;

            default:
                break;
        }
        if (!equalsPressed) {
            numberPressed = false;
        }
    }
    // For debugging blank display:
    // console.log(screenOutput);
    
    // Don't display nothing
    if (screenOutput === '' || typeof screenOutput === 'undefined' || screenOutput === 'undefined') {
        screenOutput = '0';
    }
    // Update the display
    screen.textContent = screenOutput;

}


///// Solar power functionality and Dark Mode

// Charge and discharge the battery. If discharge is true, discharge (drain);
// otherwise, charge (fill up) the battery.
function chargeBattery(discharge) {
    // Discharging
    if (discharge) {
        if (!lightsOn) {
            if (batteryCharge > 0) {
                batteryCharge -= 1000;
            }
            console.log(`Battery charge at ${batteryCharge}`)
        } 

    // Charging
    } else {
        if (lightsOn) {
            if (batteryCharge < batteryCapacity) {
                batteryCharge += 1000;
            }
            console.log(`Battery charge at ${batteryCharge}`)
        }
    }
}

// Turn the page dark; needs some CSS to work
function darkMode() {
    // Keep track of current state of the lights
    lightsOn = !lightsOn;

    // Visual effect of turning the lights off
    let element = document.body;
    element.classList.toggle("dark-mode");

    // Charge/discharge the battery, according to the current state
    // of the lights
    if (lightsOn) {
        clearInterval(chargeTimer);
        chargeTimer = setInterval(chargeBattery, 1000, false);
        console.log('Began charging the battery')
    } else {
        clearInterval(chargeTimer);
        chargeTimer = setInterval(chargeBattery, 1000, true);
        console.log('Began discharging the battery')
    }
}