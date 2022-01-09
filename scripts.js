/* 
THESE NEED TO BE ISSUES ON THE ISSUE TRACKER:

BUGS: 
  3. Not able to perform calculations on the result of another
    calculation (after equals is pressed)
    * Only partially fixed. To reproduce bug:
        * Enter in any number or expression
        * Hit '='
        * Enter another operation, followed by a number
            * When entering the number, the display resets to zero
  4. Nonsense input (multiple operators between two numbers) is allowed

BUGS which appear to be fixed:
  1. Equals sign sometimes blanks out display

TODO:
  2. Make calculator 'power off' after dark mode is on for too long
    * Turning dark mode off should subtract from the power off timer
*/

// Initial setting up of the screen
let screenOutput = '0';
let screen = document.getElementById("screen");
screen.textContent = screenOutput;

// Clear the display after a result is shown
let equalsPressed = false;

// Not currently used, may be used later:
// let calculationToPerform = '';
// let darkModeOn = false;

// Called when buttons are pressed; the meat & bones of the calculator
function button(pressed) {

    // Don't display a leading zero
    if (screenOutput === '0') {
        screenOutput = '';
    }
    // Functionality for number buttons (zero through nine)
    if (typeof pressed === 'number') {
        screenOutput += pressed.toString();

        // Clear the display after a result is shown and 
        if (equalsPressed) {
            screenOutput = '';
            equalsPressed = false;
    }
    
    } else {
        switch (pressed) {
            // Functionality for buttons other than numbers
            case 'clear':
                screenOutput = '0';
                break;
            case 'delete':
                screenOutput = screenOutput.substring(0, screenOutput.length - 1);
                break;
            case 'decimal':
                screenOutput += '.';
                break;
            
            // Math operations
            case 'add':
                screenOutput += '+';
                break;
            case 'subtract':
                screenOutput += '-';
                break;
            case 'multiply':
                screenOutput += '*';
                break;
            case 'divide':
                screenOutput += '/';
                break;
            case 'modulo':
                screenOutput += '%';
                break;
            case 'openparen':
                screenOutput += '(';
                break;
            case 'closeparen':
                screenOutput += ')';
                break;
            
            // Perform the calculation
            case 'equals':
                equalsPressed = true;
                screenOutput = eval(screenOutput);
                break;

            default:
                break;
        }
    }
    // For debugging blank display:
    console.log(screenOutput);
    
    // Don't display nothing
    if (screenOutput === '' || typeof screenOutput === 'undefined') {
        screenOutput = '0';
    }
    // Update the display
    screen.textContent = screenOutput;

}

// Turn the page dark; needs some CSS to work
function darkMode() {
    let element = document.body;
    element.classList.toggle("dark-mode");
    // darkModeOn = true;
}
