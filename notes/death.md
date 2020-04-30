# Death (of the Fox)

In the words of @btholt, "After poop comes death. These are the hard facts we have to deal with." This is the last transition we have to deal with and we'll plumb together the rest of the game at this point. We will implement `die()` now

```js
// at top
import { modFox, modScene, togglePoopBag, writeModal } from "./ui";

// last line of startGame
writeModal(); // show the modal when the game starts? not entierly sure

// replace die
die() { // implement die in the below block
  this.current = "DEAD"; // game is in the DEAD state
  modScene("dead"); // render the dead scene
  modFox("dead"); // render the dead fox
  this.sleepTime = -1; // reset sleepTime - not entirely sure why?
  writeModal("The fox died :( <br/> Press the middle button to start"); // render the modal with text?
},
```

In `ui.js` we define the `writeModal()` function:

```js
export const writeModal = function writeModal(text = "") {
  document.querySelector(
    ".modal"
  ).innerHTML = `<div class="modal-inner">${text}</div>`;
};
```

The `writeModal` function just finds the `div` with the `.modal` class and adds some text in a `div` to it (I guess this is why it's preferable to use `.innerText` rather than `.innerHTML` when trying to update text because `.innerHTML` seems to actually allow you to add HTML to the document (easier for a malicious script to do stuff?))

"This should now allow the fox to actually pass on if our pet parents aren't diligent in caring for their digital friend. Let's go do one more thing: once night hits, we should clear our timers. Let's go make that happen."

```js
// last lines of sleep
clearTimes() {
  this.wakeTime = -1;
  this.sleepTime = -1;
  this.hungryTime = -1;
  this.dieTime = -1;
  this.poopTime = -1;
  this.timeToStartCelebrating = -1;
  this.timeToEndCelebrating = -1;
},

// last lines of sleep, add clearTimes _before_ wakeTime setting
this.clearTimes(); // reset all times BEFORE setting wakeTime
this.wakeTime = this.clock + NIGHT_LENGTH;

// replace sleepTime = -1 line in die()
// might as well, less surface area for bugs
this.clearTimes();
```
