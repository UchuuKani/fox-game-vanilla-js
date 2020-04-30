# State Machine

We will essentially use finite state machines to model the game state in this project.

"This is what a finite state machine is: it let's you define various states of what you expect your app to look like and then all "derivative" state is … derived from that chief state. For example, if you were in a asleep state, you might have a derived state that is areEyesClosed that would always be true in asleep. This is instead of the problematic way of having a million is<Something> booleans in your code which always fall out of sync."

"So that's what we're going to do is model a basic finite state machine that represents our game. Based on the requirements, I can see the following overarching states of the game:"

```js
[
  "INIT",
  "HATCHING",
  "IDLING",
  "SLEEPING",
  "EATING",
  "POOPING",
  "HUNGRY",
  "CELEBRATING",
  "DEAD",
];
```

We can write out our FSM like so:

```js
const gameState = {
  current: "INIT",
  clock: 1,
  tick() {
    this.clock++;
    console.log(this.clock);
    return this.clock;
  },
};

module.exports = gameState;
```

Snapshot of `init.js` after writing the `gameState.js` file:

```js
import game from "./gameState"; // importing game state

const TICK_RATE = 3000;

async function init() {
  // async function not required just here for later use potentially
  console.log("starting game");

  let nextTimeToTick = Date.now();
  // create this closure around nextTimeToTick using nextAnimationFrame so that nextTimeToTick is constantly updated
  function nextAnimationFrame() {
    const now = Date.now();
    if (nextTimeToTick <= now) {
      // if we move the tick() call and nextTimeToTick reassignment outside the if block
      // then it seems tick() constantly gets called and nextTimeToTick is constantly updated
      game.tick(); // using game state's tick method
      nextTimeToTick = now + TICK_RATE;
    }
    requestAnimationFrame(nextAnimationFrame); // rather than returning nextAnimationFrame to create a closure, we call requestAnimationFrame
    // with nextAnimationFrame passed in as a callback to be run whenever the browser is available
  }

  nextAnimationFrame();
}

init();
```
