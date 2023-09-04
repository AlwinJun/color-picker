import './style.css';

const hexColor = document.querySelector('#hexColor') as HTMLInputElement;
const colorInput = document.querySelector('#colorInput') as HTMLDivElement;
const toggleBtn = document.querySelector('#toggleBtn') as HTMLDivElement;
const sliderRange = document.querySelector('#sliderRange') as HTMLLabelElement;
const slider = document.querySelector('#slider') as HTMLInputElement;
const alteredColor = document.querySelector('#alteredColor') as HTMLDivElement;
const alterHexText = document.querySelector('#alterHexText') as HTMLSpanElement;

hexColor.addEventListener('keyup', (e: Event): void => {
  const hexValue: string = (e.target as HTMLInputElement).value;
  if (!isValidHex(hexValue)) return;

  const stripHex: string = hexValue.replace('#', '');
  colorInput.style.backgroundColor = `#${stripHex}`;
  reset();
});

toggleBtn.addEventListener('click', (): void => {
  toggleBtn.classList.toggle('toggled');
  reset();

  const toggleText = document.querySelectorAll('.toggle-text') as NodeListOf<HTMLParagraphElement>;
  toggleText[0].classList.toggle('selected');
  toggleText[1].classList.toggle('selected');
});

slider.addEventListener('input', (e: Event): void => {
  if (!isValidHex(hexColor.value)) return;

  const sliderValue: number = Number((e.target as HTMLInputElement).value);
  sliderRange.textContent = sliderValue + '%';

  const lightOrDarkValue: number = toggleBtn.classList.contains('toggled') ? -sliderValue : sliderValue;

  const alteredHex = alterColor(hexColor.value, lightOrDarkValue);
  if (alteredHex === undefined) return;

  sliderRange.classList.add('active');
  alteredColor.style.backgroundColor = alteredHex;
  alterHexText.innerText = alteredHex;
});

slider.addEventListener('change', (): void => {
  sliderRange.classList.remove('active');
});

function isValidHex(hex: string): boolean {
  if (!hex) return false;

  const stripHex: string = hex.replace('#', '');
  return stripHex.length === 3 || stripHex.length === 6;
}

type RGB = {
  r: number;
  g: number;
  b: number;
};

function hexToRgb(hex: string): RGB | undefined {
  if (!isValidHex(hex)) return;

  let stripHex: string = hex.replace('#', '');
  if (stripHex.length === 3) {
    // expand into 6 characters if there is only 3 input
    stripHex = stripHex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const r: number = parseInt(stripHex.substring(0, 2), 16);
  const g: number = parseInt(stripHex.substring(2, 4), 16);
  const b: number = parseInt(stripHex.substring(4, 6), 16);

  return { r, g, b };
}

function RgbToHex(r: number, g: number, b: number): string {
  const redHex: string = r.toString(16).padStart(2, '0');
  const greenHex: string = g.toString(16).padStart(2, '0');
  const blueHex: string = b.toString(16).padStart(2, '0');

  const hex: string = '#' + redHex + greenHex + blueHex;
  return hex;
}

function alterColor(hex: string, percent: number): string | undefined {
  const rgb = hexToRgb(hex);
  if (rgb === undefined) return;

  const { r, g, b }: RGB = rgb;

  const amount: number = Math.floor((percent / 100) * 255);
  let newR: number = r + amount;
  let newG: number = g + amount;
  let newB: number = b + amount;

  [newR, newG, newB] = isValidRgbRange(newR, newG, newB);

  return RgbToHex(newR, newG, newB);
}

function isValidRgbRange(r: number, g: number, b: number): number[] {
  const arrRgb: number[] = [];
  [r, g, b].map((rgb) => {
    if (rgb > 255) rgb = 255;
    if (rgb < 0) rgb = 0;

    arrRgb.push(rgb);
  });

  return arrRgb;
}

function reset() {
  sliderRange.textContent = '0%';
  slider.value = '0';
  const stripHex: string = hexColor.value.replace('#', '');
  alteredColor.style.backgroundColor = '#' + stripHex;
  alterHexText.innerText = '#' + stripHex;
}

