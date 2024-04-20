const container = document.querySelector('.container');
const main = document.querySelector('main');

// Color picker
const colorWheel = document.querySelector('#color-wheel');
const colorRainbow = document.querySelector('#color-rainbow');

// Settings
const modeDropdown = document.querySelector('#mode');
const toggleGrid = document.querySelector('#square-border');

// Sketch buttons
const newBtn = document.querySelector('#new-sketch-btn');
const clearBtn = document.querySelector('#clear-btn');

// Modal
const modalContainer = document.querySelector('aside');
const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalConfirm = document.querySelector('.modal-confirm');
const modalCancel = document.querySelector('.modal-cancel');
const modalSlider = document.querySelector('#modal-slider');

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
    })
  );
  squareDiv.forEach((square) =>
    square.addEventListener('click', function (e) {
      draw(e);
    })
  );
  squareDiv.forEach(
    (square) => (square.style.cssText = `width: ${sqrSize}; height: ${sqrSize}`)
  );
};

// Mode control
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

// Grid toggle
toggleGrid.addEventListener('change', () => {
  if (toggleGrid.checked) {
    document
      .querySelectorAll('.square')
      .forEach((square) => square.classList.add('enable-border'));
  } else {
    document
      .querySelectorAll('.square')
      .forEach((square) => square.classList.remove('enable-border'));
  }
});

// Clear sketch
const clearSketch = function () {
  document
    .querySelectorAll('.square')
    .forEach((square) => (square.style.backgroundColor = 'transparent'));
  document
    .querySelectorAll('.square')
    .forEach((square) => square.classList.remove('used'));
};

// Modal
const toggleModal = function () {
  modalContainer.classList.toggle('hidden');
  main.classList.toggle('blur');
};

const modalBool = function (isConfirmed) {
  if (isConfirmed) {
    container.innerHTML = '';
    createSquare(modalSlider.value);
    toggleModal();
  } else {
    toggleModal();
  }
};

newBtn.addEventListener('click', function () {
  toggleModal();
});

clearBtn.addEventListener('click', () => clearSketch());

modalConfirm.addEventListener('click', () => modalBool(true));
modalCancel.addEventListener('click', () => modalBool(false));

createSquare(10);
