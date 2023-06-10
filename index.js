const hexColor = document.querySelector('#hexColor');
const colorInput = document.querySelector('#colorInput');
const toggleBtn = document.querySelector('#toggleBtn');
const sliderRange = document.querySelector('#sliderRange');
const slider = document.querySelector('#slider');
const alteredColor = document.querySelector('#alteredColor');
const alterHexText = document.querySelector('#alterHexText');

hexColor.addEventListener('keyup', (e) => {
  const hexValue = e.target.value;
  if (!isValidHex(hexValue)) return;

  const stripHex = hexValue.replace('#', '');
  colorInput.style.backgroundColor = `#${stripHex}`;
});

toggleBtn.addEventListener('click', () => {
  toggleBtn.classList.toggle('toggled');

  const toggleText = document.querySelectorAll('.toggle-text');
  if (toggleBtn.classList.contains('toggled')) {
    toggleText[0].classList.remove('selected');
    toggleText[1].classList.add('selected');
  } else {
    toggleText[0].classList.add('selected');
    toggleText[1].classList.remove('selected');
  }
});

slider.addEventListener('input', (e) => {
  if (!isValidHex(hexColor.value)) return;

  const sliderValue = e.target.value;
  const alteredHex = alterColor(hexColor.value, sliderValue);

  console.log(hexColor.value, sliderValue);
  console.log(alteredHex);
  sliderRange.textContent = sliderValue + '%';

  sliderRange.classList.add('active');
  alteredColor.style.backgroundColor = alteredHex;
  alterHexText.innerText = alteredHex;
});

slider.addEventListener('change', () => {
  sliderRange.classList.remove('active');
});

function isValidHex(hex) {
  if (!hex) return false;

  const stripHex = hex.replace('#', '');
  return stripHex.length === 3 || stripHex.length === 6;
}

function hexToRgb(hex) {
  if (!isValidHex(hex)) return;

  let stripHex = hex.replace('#', '');
  if (stripHex.length === 3) {
    // expand into 6 characters if there is only 3 input
    stripHex = stripHex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const r = parseInt(stripHex.substring(0, 2), 16);
  const g = parseInt(stripHex.substring(2, 4), 16);
  const b = parseInt(stripHex.substring(4, 6), 16);

  return { r, g, b };
}

function RgbToHex(r, g, b) {
  const redHex = r.toString(16).padStart(2, '0');
  const greenHex = g.toString(16).padStart(2, '0');
  const blueHex = b.toString(16).padStart(2, '0');

  const hex = '#' + redHex + greenHex + blueHex;
  return hex;
}

function alterColor(hex, percent) {
  const { r, g, b } = hexToRgb(hex);

  const amount = Math.floor((percent / 100) * 255);
  let newR = r + amount;
  let newG = g + amount;
  let newB = b + amount;

  [newR, newG, newB] = isValidRgbRange(newR, newG, newB);

  return RgbToHex(newR, newG, newB);
}

function isValidRgbRange(r, g, b) {
  const arrRgb = [];
  [r, g, b].map((rgb) => {
    if (rgb > 255) rgb = 255;
    if (rgb < 0) rgb = 0;

    arrRgb.push(rgb);
  });

  return arrRgb;
}
