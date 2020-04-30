import {
  SCENES,
  RAIN_CHANCE,
  DAY_LENGTH,
  NIGHT_LENGTH,
  getNextHungerTime,
  getNextDieTime,
  getNextPoopTime,
} from "./constants";
import { modFox, modScene, togglePoopBag, writeModal } from "./ui";

const gameState = {
  current: "INIT",
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  hungryTime: -1,
  dieTime: -1,
  timeToStartCelebrating: -1,
  timeToEndCelebrating: -1,
  poopTime: -1,
  tick() {
    this.clock++;

    if (this.clock === this.wakeTime) {
      this.wake();
    } else if (this.clock === this.sleepTime) {
      this.sleep();
    } else if (this.clock === this.hungryTime) {
      this.getHungry();
    } else if (this.clock === this.dieTime) {
      this.die();
    } else if (this.clock === this.timeToStartCelebrating) {
      this.startCelebrating();
    } else if (this.clock === this.timeToEndCelebrating) {
      this.endCelebrating();
    } else if (this.clock === this.poopTime) {
      this.poop();
    }

    return this.clock;
  },
  startGame() {
    this.current = "HATCHING"; // when the game starts, the game will be in the "hatching" state
    this.wakeTime = this.clock + 3; // wake time += 3 because (I'm not really sure tbh)
    modFox("egg"); // in the "hatching" state, the fox will be rendered as a hatching egg
    modScene("day"); // at the start of the game, the scene will be "day" (not night "rain")
    writeModal();
  },
  wake() {
    this.current = "IDLING"; // when the fox wakes it will transition to the "idling" state
    this.wakeTime = -1; // decrement from wake time
    modFox("idling"); // render the idle fox animations
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1; // determines if is raining or not by using one of 2 elements in the SCENES array
    modScene(SCENES[this.scene]); // modifies scene to be "day" or "rain" based on the `scene` determined above
    this.determineFoxState();
    this.sleepTime = this.clock + DAY_LENGTH; // assign sleepTime to currentClock tick + DAY_LENGTH constant to indicate when the fox
    // should sleep/how long the fox should be awake for
    this.hungryTime = getNextHungerTime(this.clock); // determines what time the fox should get hungry at
  },
  // function to handle the transition to the fox going to sleep
  sleep() {
    this.current = "SLEEP"; // written as this.state = "SLEEP" in the project document, but pretty sure it should be `this.current`
    modFox("sleep"); // change fox css to sleep
    modScene("night"); // change scene css to night
    this.wakeTime = this.clock + NIGHT_LENGTH; // calculates when the next wake time should be after the fox goes to sleep
    this.clearTimes(); // resets all times
    this.wakeTime = this.clock + NIGHT_LENGTH; // determines when the fox should wake up
  },
  clearTimes() {
    this.wakeTime = -1;
    this.sleepTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.poopTime = -1;
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = -1;
  },
  handleUserAction(icon) {
    // can't do actions while in these states
    if (
      ["SLEEP", "FEEDING", "CELEBRATING", "HATCHING"].includes(this.current)
    ) {
      // do nothing
      return;
    }

    if (this.current === "INIT" || this.current === "DEAD") {
      this.startGame();
      return;
    }

    // execute the currently selected action
    switch (icon) {
      case "weather":
        this.changeWeather();
        break;
      case "poop":
        this.cleanUpPoop();
        break;
      case "fish":
        this.feed();
        break;
    }
  },
  changeWeather() {
    this.scene = (1 + this.scene) % SCENES.length;
    modScene(SCENES[this.scene]);
    this.determineFoxState();
  },
  cleanUpPoop() {
    if (this.current === "POOPING") {
      this.dieTime = -1;
      togglePoopBag(true);
      this.startCelebrating();
      this.hungryTime = getNextHungerTime(this.clock);
    }
  },
  feed() {
    // can only feed when hungry
    if (this.current !== "HUNGRY") {
      return;
    }

    this.current = "FEEDING";
    this.dieTime = -1;
    this.poopTime = getNextPoopTime(this.clock);
    modFox("eating");
    this.timeToStartCelebrating = this.clock + 2;
  },
  getHungry() {
    this.current = "HUNGRY";
    this.dieTime = getNextDieTime(this.clock);
    this.hungryTime = -1;
    modFox("hungry");
  },
  die() {
    this.current = "DEAD";
    modScene("dead");
    modFox("dead");
    this.clearTimes();
    writeModal("The fox died :( <br/> Press the middle button to start");
  },
  startCelebrating() {
    this.current = "CELEBRATING";
    modFox("celebrate");
    this.timeToStartCelebrating = -1;
    this.timeToEndCelebrating = this.clock + 2;
  },
  endCelebrating() {
    this.timeToEndCelebrating = -1;
    this.current = "IDLING";
    this.determineFoxState();
    togglePoopBag(false);
  },
  determineFoxState() {
    if (this.current === "IDLING") {
      if (SCENES[this.scene] === "rain") {
        modFox("rain");
      } else {
        modFox("idling");
      }
    }
  },
  poop() {
    this.current = "POOPING";
    this.poopTime = -1;
    this.dieTime = getNextDieTime(this.clock);
    modFox("pooping");
  },
};

export const handleUserAction = gameState.handleUserAction.bind(gameState);
export default gameState;
