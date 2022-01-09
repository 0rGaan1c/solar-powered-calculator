/* 
THESE NEED TO BE ISSUES ON THE ISSUE TRACKER:

BUGS: 
  4. Nonsense input (multiple operators between two numbers) is allowed

BUGS which appear to be fixed:
  1. Equals sign sometimes blanks out display
  3. Not able to perform calculations on the result of another
     calculation (after equals is pressed)

TODO:
  2. Make calculator 'power off' after dark mode is on for too long
    * Turning dark mode off should subtract from the power off timer
*/

// Initial setting up of the screen
let screenOutput = '0';
let screen = document.querySelector("#screen");
screen.textContent = screenOutput;

// Clear the display after a result is shown
let equalsPressed = false;
// To disallow nonsense input (operators without numbers in-between)
let numberPressed = false;


// Called when buttons are pressed; the meat & bones of the calculator
function button(pressed) {

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
            console.log('equalsPressed is true; resetting display...')
            equalsPressed = false;
            screenOutput = '';
        }
        screenOutput += pressed.toString();

    } else {
        if (equalsPressed) {
            equalsPressed = false;
        }
        
        switch (pressed) {
            // Functionality for buttons other than numbers
            case 'clear':
                screenOutput = '0';
                break;
            case 'delete':
                screenOutput = screenOutput.substring(0, screenOutput.length - 1);
                break;

            case 'decimal':
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

// Turn the page dark; needs some CSS to work
function darkMode() {
    let element = document.body;
    element.classList.toggle("dark-mode");
}
