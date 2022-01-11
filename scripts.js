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
let screenOutput = "0";
let screen = document.querySelector("#screen");
screen.textContent = screenOutput;
let errorThrown = false;

// Clear the display after a result is shown
let equalsPressed = false;
// To disallow nonsense input (operators without numbers in-between)
let numberPressed = false;
// Keep track of current state of lights (dark/light mode)
let lightsOn = true;
// Battery capacity, in seconds, is random between 5 and 10 seconds, inclusive
// Will be changed to be between 10 and 15 seconds, or something like that
const batteryCapacity = 5000 + Math.floor(Math.random() * 6) * 1000;
console.log(`Battery capacity is ${batteryCapacity}`);
let batteryCharge = batteryCapacity;
let chargeTimer = undefined;

// Set up lightbulb
// document.querySelector(".img-dark").style.display = "none";
// document.querySelector(".img-light").style.display = "block";

///// Core calculator functionality

// Called when buttons are pressed; the meat & bones of the calculator
function button(pressed) {
  // For calculator power down due to lack of 'light'
  if (batteryCharge < 1000) {
    return;
  }

  // Don't display a leading zero
  if (screenOutput === "0") {
    screenOutput = "";
  }
  // Functionality for number buttons (zero through nine)
  if (typeof pressed === "number") {
    // To disallow nonsense input (operators without numbers in-between)
    numberPressed = true;

    // Clear the display after a result is shown
    if (equalsPressed) {
      console.log("equalsPressed is true; resetting display...");
      equalsPressed = false;

      // Needed to prevent unnecessary resetting of display:
      // see a few lines below
      errorThrown = false;

      screenOutput = "";
    }
    screenOutput += pressed.toString();
  } else {
    // Don't reset the display if it's already been reset, thanks to
    // "errorThrown = false;" line above (see above)
    if (equalsPressed) {
      equalsPressed = false;
    }

    if (errorThrown) {
      errorThrown = false;
      screenOutput = "";
    }

    // Functionality for buttons other than numbers
    // This whole next section could use some reactoring!
    switch (pressed) {
      case "clear":
        screenOutput = "0";
        break;
      case "delete":
        screenOutput = screenOutput.substring(0, screenOutput.length - 1);
        break;

      case "decimal":
        // numberPressed is to disallow nonsense input (operators without numbers in-between)
        if (screenOutput === "" || screenOutput === "0") {
          screenOutput += "0.";
        }

        if (numberPressed) {
          screenOutput += ".";
        }
        break;

      // Math operations

      case "add":
        if (numberPressed) {
          screenOutput += "+";
        }
        break;

      case "subtract":
        if (numberPressed) {
          screenOutput += "-";
        }
        break;

      case "multiply":
        if (numberPressed) {
          screenOutput += "*";
        }
        break;

      case "divide":
        if (numberPressed) {
          screenOutput += "/";
        }
        break;

      case "modulo":
        if (numberPressed) {
          screenOutput += "%";
        }
        break;

      case "openparen":
        if (numberPressed) {
          screenOutput += "(";
        }
        break;

      case "closeparen":
        if (numberPressed) {
          screenOutput += ")";
        }
        break;

      // Perform the calculation
      case "equals":
        equalsPressed = true;

        // Catch syntax errors
        try {
          screenOutput = String(eval(screenOutput));
        } catch (error) {
          errorThrown = true;
          screenOutput = "ERROR";
        }

        break;

      default:
        break;
    }
    if (!equalsPressed) {
      numberPressed = false;
    }
  }

  // Don't display nothing
  if (
    screenOutput === "" ||
    typeof screenOutput === "undefined" ||
    screenOutput === "undefined"
  ) {
    screenOutput = "0";
  }
  // Update the display
  screen.textContent = screenOutput;
}

///// Solar power functionality and Dark Mode

// Charge and discharge the battery. If discharge is true, discharge (drain);
// otherwise, charge (fill up) the battery.
function chargeBattery(discharge, amount = 1000) {
  // Discharging
  if (discharge) {
    if (!lightsOn) {
      if (batteryCharge > 0) {
        batteryCharge -= 1000;
      } else {
        clearInterval(chargeTimer);
        return;
      }
      console.log(`Battery charge at ${batteryCharge}`);
    }

    // Charging
  } else {
    if (lightsOn) {
      if (batteryCharge < batteryCapacity) {
        batteryCharge += 1000;
      } else {
        clearInterval(chargeTimer);
        return;
      }
      console.log(`Battery charge at ${batteryCharge}`);
    }
  }
}

// Turn the page dark; needs some CSS to work
function darkMode() {
  // Keep track of current state of the lights
  lightsOn = !lightsOn;

  let element = document.body;
  element.classList.toggle("body-light-mode");
  element.classList.toggle("body-dark-mode");

  const borderElements = document.querySelectorAll(".border-light-mode");
  borderElements.forEach((e) => {
    if (e.classList.contains("border-light-mode")) {
      e.classList.toggle("border-dark-mode");
    } else {
      e.classList.toggle("border-light-mode");
    }
  });

  const backgroundElements = document.querySelectorAll(
    ".background-light-mode"
  );
  backgroundElements.forEach((e) => {
    if (e.classList.contains("background-light-mode")) {
      e.classList.toggle("background-dark-mode");
    } else {
      e.classList.toggle("background-light-mode");
    }
  });

  const imgs = document.querySelectorAll("img");
  for (let i = 0; i < imgs.length; i++) {
    if (imgs[i].classList.contains("img-show")) {
      imgs[i].classList.remove("img-show");
      imgs[i].classList.add("img-hide");
    } else {
      imgs[i].classList.add("img-show");
      imgs[i].classList.remove("img-hide");
    }
  }

  // Charge/discharge the battery, according to the current state
  // of the lights
  if (lightsOn) {
    clearInterval(chargeTimer);
    // So that the calculator immediately works when light is on
    chargeBattery(false, 1);
    chargeTimer = setInterval(chargeBattery, 1000, false);
    console.log("Began charging the battery");
  } else {
    clearInterval(chargeTimer);
    chargeTimer = setInterval(chargeBattery, 1000, true);
    console.log("Began discharging the battery");
  }
}
