# Interacting with the UI

We have two distinct sets of logic that we want to keep separate: UI logic (button clicks, hover events, DOM stuff, etc.) and business logic (the clock, state machine, logic behind the game working)

We will focus on UI logic here in a file called `button.js`, then add a way for the UI to call into the business logic

```js
// button.js
import { ICONS } from "./constants"; // ICONS is a 3 element array -> ["fish", "poop", "weather"];

// show is a boolean
const toggleHighlighted = (icon, show) =>
  document
    .querySelector(`.${ICONS[icon]}-icon`)
    .classList.toggle("highlighted", show); // function to toggle some css on our button icon divs

// this initButtons function is called in our init.js file to add our event listener at the game initiation
export default function initButtons(handleUserAction) {
  let selectedIcon = 0; // default selected icon is the first in constants (fish in this case)

  // defining function to handle highlighting a button icon (fish, poop, weather) based on which button is pressed
  function buttonClick({ target }) {
    // we use modulo operations to wrap our button pushes around, e.g. "If some one clicks left on the first button, it wraps to the last button"
    if (target.classList.contains("left-btn")) {
      toggleHighlighted(selectedIcon, false); // un-highlight the current button (left button)
      selectedIcon = (2 + selectedIcon) % ICONS.length; // set selectedIcon
      toggleHighlighted(selectedIcon, true); // highlight the current selectedIcon
    } else if (target.classList.contains("right-btn")) {
      toggleHighlighted(selectedIcon, false);
      selectedIcon = (1 + selectedIcon) % ICONS.length;
      toggleHighlighted(selectedIcon, true);
    } else {
      handleUserAction(ICONS[selectedIcon]); // hatches our egg or restarts game. The handleUserAction function passed in here is is defined in our stateMachine as the logic to handle game state lives there
    }
  }
  // adds an onClick event listener to our .buttons div that has the button events bubble up as they are children of this div
  document.querySelector(".buttons").addEventListener("click", buttonClick); // by passing our buttonClick function here, we form a closure around selectedIcon
}
```

In a `constants.js` file to keep track of our constants:

```js
// constants.js
export const ICONS = ["fish", "poop", "weather"]; // the types of buttons we have
export const TICK_RATE = 3000; // just putting our tick rate here to group our constants
```

And in `init.js`

```js
// at top
import initButtons from "./buttons"; // import our ui logic into our init file

// replace TICK_RATE
import { TICK_RATE } from "./constants"; // bring in our constants

// first line of init()
initButtons(game.handleUserAction); // call initButtons with our state machine's bound handleUserAction method
```
