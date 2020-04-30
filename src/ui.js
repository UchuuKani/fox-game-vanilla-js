export const modFox = function modFox(state) {
  // naming functions for debugging purposes in stack trace
  document.querySelector(".fox").className = `fox fox-${state}`;
};

export const modScene = function modScene(state) {
  document.querySelector(".game").className = `game ${state}`;
};

// if showing poop bag, add hidden class
export const togglePoopBag = function togglePoopBag(show) {
  document.querySelector(".poop-bag").classList.toggle("hidden", !show);
};

export const writeModal = function writeModal(text = "") {
  document.querySelector(
    ".modal"
  ).innerHTML = `<div class="modal-inner">${text}</div>`;
};
