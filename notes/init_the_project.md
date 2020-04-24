# Init the Project

The idea behind `init.js` is to set up our game, kind of the entry point in the browser

We will have a clock that ticks the game every three seconds. Could try to use a bunch of `setTimeout`s, but will make the project very difficult to coordinate with all the async stuff going on

`requestAnimationFrame` is a browser api (look up docs) - basically saying, hey browser, when you're idle call this callback - in reality, the game will tick a lot as the browser is idle a lot

**Note:** according to MDN, "The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint."

A snapshot of the `init.js` code with some of my own comments is below

```js
const TICK_RATE = 3000;

function tick() {
  console.log("tick", Date.now());
}

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
      tick();
      nextTimeToTick = now + TICK_RATE;
    }
    requestAnimationFrame(nextAnimationFrame); // rather than returning nextAnimationFrame to create a closure, we call requestAnimationFrame
    // with nextAnimationFrame passed in as a callback to be run whenever the browser is available
  }

  nextAnimationFrame();
}

init();
```
