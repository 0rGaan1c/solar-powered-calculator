/* 
BUGS: 
  * Equals sign sometimes blanks out display
  * Not able to perform calculations on the result of another
    calculation (after equals is pressed)
TODO:
  * Make calculator 'power off' after dark mode is on for too long
    * Turning dark mode off should subtract from the power off timer
*/

// Set up the screen
let screenOutput = '0';
let screen = document.getElementById("screen");
screen.textContent = screenOutput;
// let calculationToPerform = '';

// Clear the display after a result is shown
let equalsPressed = false;

let darkModeOn = false;

function button(pressed) {
    // Clear the display after a result is shown
    if (equalsPressed) {
        screenOutput = '';
    }

    // Don't display a leading zero
    if (screenOutput === '0') {
        screenOutput = '';
    }

    // Display numbers pressed on the screen, also storing them in
    // the internal memory to perform calculations on
    if (typeof pressed === 'number') {
        screenOutput += pressed.toString();
    } else {
        switch (pressed) {
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
            
            case 'equals':
                equalsPressed = true;
                screenOutput = eval(screenOutput);
                break;

            default:
                break;
        }
    }
    
    // Don't display nothing
    if (screenOutput === '') {
        screenOutput = '0';
    }
    // Update the display
    screen.textContent = screenOutput;

}

function darkMode() {
    let element = document.body;
    element.classList.toggle("dark-mode");
    darkModeOn = true;

}
