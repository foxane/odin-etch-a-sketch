const container = document.querySelector('.container');
const main = document.querySelector('main');

// Color picker
const colorWheel = document.querySelector('#color-wheel');
const colorRainbow = document.querySelector('#color-rainbow');

// Settings
const modeDropdown = document.querySelector('#mode');

// Sketch buttons
const newBtn = document.querySelector('#new-sketch-btn');
const clearBtn = document.querySelector('#clear-btn');

// Modal
const modalContainer = document.querySelector('aside');
const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalConfirm = document.querySelector('.modal-confirm');
const modalCancel = document.querySelector('.modal-cancel');

// Mouse event control
let isPressed = false;
document.body.addEventListener('mousedown', () => (isPressed = true));
document.body.addEventListener('mouseup', () => (isPressed = false));

// Color control
const color = function () {
  const r = Math.floor(Math.random() * 255 + 1);
  const g = Math.floor(Math.random() * 255 + 1);
  const b = Math.floor(Math.random() * 255 + 1);

  if (colorRainbow.checked) {
    return `rgb(${r},${g},${b})`;
  }
  return colorWheel.value;
};

// Mode control

// create square
const createSquare = function (amount) {
  const CONTAINER_AREA = 800; // in px
  const sqrSize = `${CONTAINER_AREA / amount}px`;
  const sqrAmount = amount * amount;

  console.log(sqrSize);

  for (let i = 0; i < sqrAmount; i++) {
    container.innerHTML += `<div class="square" name="unused"></div>`;
  }

  const squareDiv = document.querySelectorAll('.square');
  squareDiv.forEach((square) =>
    square.addEventListener('mouseover', function (e) {
      draw(e);
      square.removeAttribute('name');
    })
  );
  squareDiv.forEach((square) =>
    square.addEventListener('click', function (e) {
      draw(e);
      square.removeAttribute('name');
    })
  );
  squareDiv.forEach(
    (square) => (square.style.cssText = `width: ${sqrSize}; height: ${sqrSize}`)
  );
};

function draw(e) {
  if (e.target.classList.contains('used')) return;
  switch (modeDropdown.value) {
    case 'hold':
      // Hold
      if (e.type === 'mouseover' && !isPressed) return;
      e.target.style.backgroundColor = `${color()}`;
      break;
    case 'hover':
      // Hover
      if (e.type === 'mouseover') e.target.style.backgroundColor = `${color()}`;
      break;
    case 'click':
      // Click
      if (e.type === 'click') e.target.style.backgroundColor = `${color()}`;
      break;
    case 'erase':
      // Erase
      e.target.style.backgroundColor = 'transparent';
      break;
  }
  e.target.classList.add('used');
}

createSquare(10);
