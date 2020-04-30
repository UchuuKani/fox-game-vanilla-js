export const TICK_RATE = 3000;
export const ICONS = ["fish", "poop", "weather"];
export const RAIN_CHANCE = 0.2;
export const SCENES = ["day", "rain"];
export const DAY_LENGTH = 20; // number of ticks between day and night, set low for testing, set high when we know it's working
export const NIGHT_LENGTH = 5;

export const getNextHungerTime = (clock) =>
  Math.floor(Math.random() * 3) + 5 + clock;

export const getNextDieTime = (clock) =>
  Math.floor(Math.random() * 2) + 3 + clock;

export const getNextPoopTime = (clock) =>
  Math.floor(Math.random() * 3) + 4 + clock;
