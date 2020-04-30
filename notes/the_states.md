# The States

We will now define the actions and transformations of the game, to do stuff like transition from a `HUNGRY` state to a `FEEDING` state

To begin, our game starts in the `INIT` state which signals that the game is waiting, to a starting state `HATCHING` indicating our game has started and the fox hatches (??) - we will call this action `startGame` on our `gameState` object

```js
const gameState = {
  current: "INIT", // our initial state
  clock: 1, // clock starts at 1
  wakeTime: -1, // we are using -1 as the default value for values used to calculate state
  tick() {
    this.clock++;

    if (this.clock === this.wakeTime) {
      this.wake();
    }

    return this.clock;
  },
  startGame() {
    // our method to transition to the HATCHING state
    console.log("hatching");
    this.current = "HATCHING"; // changes our current state
    this.wakeTime = this.clock + 3; // adding 3 to wakeTime - wakeTime represents how long the fox has been awake
  },
  wake() {
    console.log("hatched");
    this.current = "IDLING";
    this.wakeTime = -1;
  },
  handleUserAction(icon) {
    console.log(icon);
  },
};

export default gameState;
```

Start game will transition our game to the starting phase, but we need a way to actually cause this transition. We will fill out the `handleUserAction` method to handle user actions

```js
handleUserAction(icon) { // take action based on the icon that is clicked
  // can't do actions while in these states
  if (
    ["SLEEP", "FEEDING", "CELEBRATING", "HATCHING"].includes(
      this.current
    )
  ) {
    // do nothing
    return;
  }

  if (this.current === "INIT" || this.current === "DEAD") { // we can only start out game if we are in `INIT` or `DEAD` states
    this.startGame();
    return; // want to stop our state transition here - other code below should not be run
  }

  // execute the currently selected action as read from the `icon` argument to this handleUserAction function
  switch (icon) {
    case "weather": // if weather icon is clicked attempt to change the weather
      this.changeWeather();
      break;
    case "poop":
      this.cleanUpPoop(); // if poop icon is clicked attempt to clean up poop
      break;
    case "fish":
      this.feed(); // if fish icon is clicked attempt to feed the fox fish
      break;
  }
},
changeWeather() {
  console.log('changeWeather')
},
cleanUpPoop() {
  console.log('cleanUpPoop')
},
feed() {
  console.log('feed')
},
```

Currently, in `init` we are utilizing our `gameState`'s `handleUserAction` method by passing it as the callback for our `initButtons` function coming from `button.js` to handle user action, so the `handleUserAction` loses the `this` context pointing to our `gameState` object as it is passed around and called in our `initButtons` function. We bind the method and export it to solve this issue

```js
// at bottom of gameState.js
export const handleUserAction = gameState.handleUserAction.bind(gameState);
```

Currently we will only see `console.log` statements when clicking buttons (which call `handleUserAction`). To actually havee the fox, scene, and poop bag render and do things, we will define a file `ui.js` that will update the class names on `div`s in our `index.hmtl` to render different fox animations.

```js
export const modFox = function modFox(state) {
  // changes the fox rendering by changing `fox-state` based on possible fox states (pooping, celebrate, rain, hungry, eating, egg, sleep, dead) as seen in style.css;
  document.querySelector(".fox").className = `fox fox-${state}`;
};
export const modScene = function modScene(state) {
  // changes the scene based on possible scenes ["day", "rain"]
  document.querySelector(".game").className = `game ${state}`;
};
export const togglePoopBag = function togglePoopBag(show) {
  document.querySelector(".poop-bag").classList.toggle("hidden", !show);
};
```

Now back in `gameState` we will update it to use these mod functions, initially just for the fox waking up

```js
import { SCENES, RAIN_CHANCE } from "./constants";

startGame() {
  this.current = "HATCHING";
  this.wakeTime = this.clock + 3;
  modFox("egg");
  modScene("day");
},
wake() {
  this.current = "IDLING";
  this.wakeTime = -1;
  modFox("idling");
  this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
  modScene(SCENES[this.scene]);
},
```
