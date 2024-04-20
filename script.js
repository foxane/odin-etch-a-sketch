const container = document.querySelector('.container');
const main = document.querySelector('main');

// Color picker
const colorWheel = document.querySelector('#color-wheel');
const colorRainbow = document.querySelector('#color-rainbow');
const pickColorBtn = document.querySelector('#pick-color-btn');

// Settings
const mode = document.querySelector('#mode');

// Sketch buttons
const newBtn = document.querySelector('#new-sketch-btn');
const clearBtn = document.querySelector('#clear-btn');

// Modal
const modalContainer = document.querySelector('aside');
const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalConfirm = document.querySelector('.modal-confirm');
const modalCancel = document.querySelector('.modal-cancel');

// Draw mode
mode.addEventListener('change', function () {
  console.log(mode.value);
});

// Draw
const draw = function (e) {
  if (e.type === 'mouseover' && !isPressed) return;
  e.target.style.backgroundColor = 'red';
};

// Create squre
const createSqr = function (sqrAmount) {
  const sqrTotal = sqrAmount * sqrAmount;
  for (let i = 0; i < sqrTotal; i++) {
    container.innerHTML += `<div name="unused" class="square" id="sqr-${i}"></div>`;
    const sqr = document.getElementById(`sqr-${i}`);
    sqr.style.cssText = `
    width: ${800 / sqrAmount}px;
    height: ${800 / sqrAmount}px;
    `;
  }
};

createSqr(16);
// Color can't be changed after hover

let isPressed = false;
document.body.addEventListener('mousedown', () => {
  isPressed = true;
});
document.body.addEventListener('mouseup', () => {
  isPressed = false;
});

document.querySelectorAll('.square').forEach((sqr) =>
  sqr.addEventListener('mouseover', function (e) {
    draw(e);
  })
);
document.querySelectorAll('.square').forEach((sqr) =>
  sqr.addEventListener('mousedown', function (e) {
    draw(e);
  })
);
