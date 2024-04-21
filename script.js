'use strict';

const container = document.querySelector('.container');
const main = document.querySelector('main');

// Color picker
const colorWheel = document.querySelector('#color-wheel');
const colorRainbow = document.querySelector('#color-rainbow');

// Settings
const modeDropdown = document.querySelector('#mode');
const gridCheckbox = document.querySelector('#square-border');

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

let squares;

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
  const CONTAINER_AREA = 800;
  const sqrSize = `${CONTAINER_AREA / amount}px`;
  const sqrAmount = amount * amount;

  for (let i = 0; i < sqrAmount; i++) {
    const sqrDiv = document.createElement('div');
    sqrDiv.classList.add('square');
    sqrDiv.style.width = sqrSize;
    sqrDiv.style.height = sqrSize;
    container.appendChild(sqrDiv);

    sqrDiv.addEventListener('mouseover', function (e) {
      draw(e);
    });
    sqrDiv.addEventListener('click', function (e) {
      draw(e);
    });
  }

  gridToggle();
};

// Mode control
const draw = function (e) {
  if (e.target.classList.contains('used') && modeDropdown.value !== 'erase')
    return;
  if (e.target.classList.contains('used') && modeDropdown.value === 'erase') {
    e.target.style.backgroundColor = 'transparent';
    e.target.classList.remove('used');
  } else if (e.type === 'mouseover' && modeDropdown.value === 'hover') {
    e.target.style.backgroundColor = `${color()}`;
    e.target.classList.add('used');
  } else if (
    e.type === 'mouseover' &&
    modeDropdown.value === 'hold' &&
    isPressed
  ) {
    e.target.style.backgroundColor = `${color()}`;
    e.target.classList.add('used');
  } else if (
    e.type === 'click' &&
    modeDropdown.value === 'click' &&
    !isPressed
  ) {
    e.target.style.backgroundColor = `${color()}`;
    e.target.classList.add('used');
  }
};

// Grid toggle
const gridToggle = function () {
  if (gridCheckbox.checked) {
    document
      .querySelectorAll('.square')
      .forEach((square) => square.classList.add('enable-border'));
  } else {
    document
      .querySelectorAll('.square')
      .forEach((square) => square.classList.remove('enable-border'));
  }
};
gridCheckbox.addEventListener('change', gridToggle);

// Clear sketch
const clearSketch = function () {
  squares = document.querySelectorAll('.square');
  for (const square of squares) {
    square.style.backgroundColor = 'transparent';
    square.classList.remove('used');
  }
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
