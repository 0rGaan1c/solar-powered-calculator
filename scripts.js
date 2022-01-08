// let calculationToPerform = '';
let screenOutput = '0';
let screen = document.getElementById("screen");

// Setup the screen
screen.textContent = screenOutput;

function button(pressed) {
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
}
