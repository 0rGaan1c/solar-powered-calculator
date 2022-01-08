let internalInput = '';
let displayOutput = '0';
let screen = document.getElementById("screen");

// Setup the screen
screen.textContent = displayOutput;

function button(pressed) {
    // Don't display a leading zero
    if (displayOutput === '0') {
        displayOutput = '';
    }

    // Display numbers pressed on the screen, also storing them in
    // the internal memory to perform calculations on
    if (typeof pressed === 'number') {
        internalInput += pressed.toString();
        displayOutput += pressed.toString();
    } else {
        switch (pressed) {
            case 'clear':
                internalInput = '';
                displayOutput = '0';
                break;

            default:
                break;
        }
    }

    // Update the display
    screen.textContent = displayOutput;

}

function darkMode() {
    let element = document.body;
    element.classList.toggle("dark-mode");
}