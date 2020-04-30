# Pooping (the Fox, That Is)

The fox will have to poop after it eats, so we can write:

```js
// with the rest of the state
poopTime: -1, // add a piece of state that determines when the fox should poop, set to -1 by default

// inside tick
else if (this.clock === this.poopTime) { // on a game tick, check if is time for the fox to poop
  this.poop(); // initiate fox pooping
}

// add function to gameState
poop() { // implements pooping
  this.current = "POOPING"; // state is set to POOPING
  this.poopTime = -1; // reset poop time after we get to POOPING state
  this.dieTime = getNextDieTime(this.clock); // determine how long until the fox dies after pooping
  modFox("pooping"); // animate the fox pooping
},
```

We will add to `gameState` to implement the `cleanUpPoop` method and update the `endCelebrate` method

```js
// replace cleanUpPoop
cleanUpPoop() {
  if (this.current === "POOPING") { // when cleanUpPoop is called, only do stuff if the current state is POOPING
    this.dieTime = -1; // reset dieTime since fox will not die after poop is cleaned until next poop() is called
    togglePoopBag(true); // show the poop bag!
    this.startCelebrating(); // have the fox celebrate having its poop cleaned
    this.hungryTime = getNextHungerTime(this.clock); // re-calculate when the fox should get hungry again
  }
},

// add to endCelebrate as last line
togglePoopBag(false); // see explanation below
```

"We can safely toggle off the poop bag in every `endCelebrate` because if it's not there, we can still turn it off."
