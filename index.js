const hexColor = document.querySelector('#hexColor');
const colorInput = document.querySelector('#colorInput');

hexColor.addEventListener('keyup', (e) => {
  const hexValue = e.currentTarget.value;
  if (!isValidHex(hexValue)) return;

  let stripHex = hexValue.replace('#', '');
  // expand into 6 characters if there is only 3 input
  if (stripHex.length === 3) {
    stripHex = stripHex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  colorInput.style.backgroundColor = `#${stripHex}`;
});

const validHexChar = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
];
function isValidHex(hex) {
  if (!hex) return false;

  const stripHex = hex.replace('#', '');
  return stripHex.length === 3 || stripHex.length === 6;

  // if (stripHex.length === 3 || stripHex.length === 6) {
  //   const validHex = Array.from(stripHex).every((char) => {
  //     return validHexChar.includes(char);
  //   });

  //   return validHex;
  // } else {
  //   return false;
  // }
}

function hexToRgb(hex) {
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `(${r},${g},${b})`;
}
