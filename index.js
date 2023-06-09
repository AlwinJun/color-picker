const hexColor = document.querySelector('#hexColor');
const colorInput = document.querySelector('#colorInput');
const sliderRange = document.querySelector('#sliderRange');
const slider = document.querySelector('#slider');

hexColor.addEventListener('keyup', (e) => {
  if (!isValidHex(hexValue)) return;

  const hexValue = e.target.value;
  const stripHex = removeHash(hexColor);
  colorInput.style.backgroundColor = `#${stripHex}`;
});

slider.addEventListener('input', (e) => {
  const sliderValue = e.target.value;
  sliderRange.textContent = sliderValue + '%';
});

function removeHash(hex) {
  const stripHex = hex.replace('#', '');
  return stripHex;
}

function isValidHex(hex) {
  if (!hex) return false;

  const stripHex = removeHash(hex);
  return stripHex.length === 3 || stripHex.length === 6;
}

function hexToRgb(hex) {
  if (!isValidHex(hex)) return;

  let stripHex = removeHash(hex);
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
  console.log(amount);
  const newR = r + amount;
  const newG = g + amount;
  const newB = b + amount;

  console.log({ newR, newG, newB });
  return RgbToHex(newR, newG, newB);
}

console.log(alterColor('ac5e10', 70));
