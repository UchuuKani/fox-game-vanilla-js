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
