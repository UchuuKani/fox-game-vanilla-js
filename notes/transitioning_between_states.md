# Transitioning Between States

First, we will focus on transitioning between day and night.

```js
// add at top of gameState
import { SCENES, RAIN_CHANCE, DAY_LENGTH, NIGHT_LENGTH } from "./constants";

// add in state
sleepTime: -1, // state to represent how long night/sleep will last, defaulted to -1

// add else if to tick() - represents if the game should transition to a sleeping fox/night
else if (this.clock === this.sleepTime) {
  this.sleep();
}

// add last line to wake() - determines the time when the next sleepTime should be after waking
this.sleepTime = this.clock + DAY_LENGTH;

// add function to gameState
sleep() {
  this.state = "SLEEP"; // prettty sure this should be `this.current` not `this.state`
  modFox("sleep"); // put the fox to sleep
  modScene("night"); // change the scene to night
  this.wakeTime = this.clock + NIGHT_LENGTH; // determine when the fox should wake up
},
```

We now have a cycle for transitioning to day and night. We will now add logic to make the fox get hungry:

```js
// at top
import {
  SCENES,
  RAIN_CHANCE,
  DAY_LENGTH,
  NIGHT_LENGTH,
  getNextHungerTime, // function to calculate when the the fox should get hungry based on current `clock`
  getNextDieTime, // function to calculate when the fox should die based on current `clock`
} from "./constants";

// add to state
hungryTime: -1, // determines when the fox should get hungry
dieTime: -1, // determines when the fox should die

// add to tick if statements
else if (this.clock === this.hungryTime) {
  this.getHungry();
} else if (this.clock === this.dieTime) {
  this.die();
}

// last line of wake
this.sleepTime = this.clock + DAY_LENGTH; // I believe this was added in the previous section
this.hungryTime = getNextHungerTime(this.clock); // determines when the fox should get hungry based on the clock

// last functions of gameSTate
getHungry() { // function to set the game/fox to the HUNGRY state
  this.current = "HUNGRY"; // make it hongry
  this.dieTime = getNextDieTime(this.clock); // calculate the dieTime based on clock
  this.hungryTime = -1; // reset the hungryTime to default value
  modFox("hungry"); // set the fox scene to the hungry animation
},
die() { // will eventually write this out to make the fox die, but for now just logging out "die"
  console.log("die");
},
```

In `constants.js` we define functions to calculate next hunger time and next die time

```js
export const getNextHungerTime = (clock) =>
  Math.floor(Math.random() * 3) + 5 + clock;
export const getNextDieTime = (clock) =>
  Math.floor(Math.random() * 2) + 3 + clock;
```

The fox can now die! Though we just log out "die" currently when they do.

"Now we're starting to rely on the clock a bit more to track our game. We're also adding a touch of randomness. We want the game to play different each time so we're adding a bit of variance to how long it takes for the fox to get hungry as well as how long the fox has before it dies of hunger.

From here, let's make it possible for our fox to eat. In gameState.js"

```js
//change feed()
feed() { // gives us the ability to feed the fox
  // can only feed when hungry
  if (this.current !== "HUNGRY") {
    return;
  }

  this.current = "FEEDING"; // set the state to "FEEDING"
  this.dieTime = -1; // reset die time as the fox only dies if it goes unfed
  this.poopTime = getNextPoopTime(this.clock); // set the next time for the fox to poop
  modFox("eating"); // render the fox eating animation
  this.timeToStartCelebrating = this.clock + 2; // set the time for the fox to begin its little celebration jig
},
```

And in `constants.js` we define the following:

```js
export const getNextPoopTime = (clock) =>
  Math.floor(Math.random() * 3) + 4 + clock;
```

We can now feed the fox before it dies, and added timers to get the fox to celebrate as well as poop. We want the fox to celebrate after it eats, so lets add code to do that

```js
// two variables to track
timeToStartCelebrating: -1, // when the fox should start celebrating
timeToEndCelebrating: -1, // when the fox should stop celebrating

// add two new ifs to tick
else if (this.clock === this.timeToStartCelebrating) { // if it's time to celebrate, we celebrate
  this.startCelebrating();
} else if (this.clock === this.timeToEndCelebrating) { // if it's time to stop celebrating, we stop
  this.endCelebrating();
}

// two new functions in game state
startCelebrating() { // called when this.clock === this.timeToStartCelebrating
    this.current = "CELEBRATING"; // state set to CELEBRATING
    modFox("celebrate"); // render the celebrating fox animation
    this.timeToStartCelebrating = -1; // reset time to start celebrating
    this.timeToEndCelebrating = this.clock + 2; // set the time to stop celebrating to two clock ticks from now
  },
endCelebrating() { // called when this.clock === this.timeToEndCelebrating
  this.timeToEndCelebrating = -1; // reset timeToEndCelebrating
  this.current = "IDLING"; // set the state to IDLING
  this.determineFoxState(); // determine if it should be raining or not - if it's raining, the fox should be facing away
  // we will also use determineFoxState in the `wake()` function as well
},
determineFoxState() {
  if (this.current === 'IDLING') {
    if (SCENES[this.scene] === "rain") {
      modFox("rain");
    } else {
      modFox("idling");
    }
  }
},
```

We will update the `wake` function and `changeWeather` functions

```js
// add to wake, right after modScene
this.determineFoxState();

// replace changeWeather
changeWeather() {
  this.scene = (1 + this.scene) % SCENES.length; // change the scene property to be the opposite?
  modScene(SCENES[this.scene]); // render the nex scene
  this.determineFoxState(); // determine if the fox should be facing away (it is raining) or if it is day and the fox is facing us
},
```

Now we will actually implement the `cleanUpPoop` method

```js
// replace cleanUpPoop
cleanUpPoop() {
  if (this.current === "POOPING") {
    this.dieTime = -1;
    togglePoopBag(true);
    this.startCelebrating();
    this.hungryTime = getNextHungerTime(this.clock);
  }
},

// add to endCelebrate as last line
togglePoopBag(false);
```
