export type RGB = { r: number; g: number; b: number };
export type LegoColor = { id: string; name: string; hex: string; rgb: RGB };

const hexToRgb = (hex: string): RGB => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

export const LEGO_COLORS: LegoColor[] = [
  { id: '1', name: 'White', hex: '#FFFFFF', rgb: hexToRgb('#FFFFFF') },
  { id: '5', name: 'Brick Yellow', hex: '#D9D9D9', rgb: hexToRgb('#D9D9D9') },
  { id: '18', name: 'Nougat', hex: '#D09168', rgb: hexToRgb('#D09168') },
  { id: '21', name: 'Bright Red', hex: '#C4281B', rgb: hexToRgb('#C4281B') },
  { id: '23', name: 'Bright Blue', hex: '#0D69AB', rgb: hexToRgb('#0D69AB') },
  { id: '24', name: 'Bright Yellow', hex: '#F5CD2F', rgb: hexToRgb('#F5CD2F') },
  { id: '26', name: 'Black', hex: '#1B2A34', rgb: hexToRgb('#1B2A34') },
  { id: '28', name: 'Dark Green', hex: '#287F46', rgb: hexToRgb('#287F46') },
  { id: '37', name: 'Bright Green', hex: '#4B9F4A', rgb: hexToRgb('#4B9F4A') },
  { id: '38', name: 'Dark Orange', hex: '#A95500', rgb: hexToRgb('#A95500') },
  { id: '102', name: 'Medium Blue', hex: '#5A93DB', rgb: hexToRgb('#5A93DB') },
  { id: '106', name: 'Bright Orange', hex: '#DA8540', rgb: hexToRgb('#DA8540') },
  { id: '119', name: 'Bright Yellowish Green', hex: '#A4BD46', rgb: hexToRgb('#A4BD46') },
  { id: '124', name: 'Bright Reddish Violet', hex: '#923978', rgb: hexToRgb('#923978') },
  { id: '135', name: 'Sand Blue', hex: '#6074A1', rgb: hexToRgb('#6074A1') },
  { id: '138', name: 'Sand Yellow', hex: '#958A73', rgb: hexToRgb('#958A73') },
  { id: '140', name: 'Earth Blue', hex: '#002056', rgb: hexToRgb('#002056') },
  { id: '141', name: 'Earth Green', hex: '#00451A', rgb: hexToRgb('#00451A') },
  { id: '151', name: 'Sand Green', hex: '#A0BCAC', rgb: hexToRgb('#A0BCAC') },
  { id: '154', name: 'Dark Red', hex: '#720E0F', rgb: hexToRgb('#720E0F') },
  { id: '191', name: 'Flame Yellowish Orange', hex: '#FF800D', rgb: hexToRgb('#FF800D') },
  { id: '192', name: 'Reddish Brown', hex: '#582A12', rgb: hexToRgb('#582A12') },
  { id: '194', name: 'Medium Stone Grey', hex: '#9C9291', rgb: hexToRgb('#9C9291') },
  { id: '199', name: 'Dark Stone Grey', hex: '#4C5156', rgb: hexToRgb('#4C5156') },
  { id: '212', name: 'Light Royal Blue', hex: '#87C0EA', rgb: hexToRgb('#87C0EA') },
  { id: '221', name: 'Bright Purple', hex: '#CD6298', rgb: hexToRgb('#CD6298') },
  { id: '222', name: 'Light Purple', hex: '#E4ADC8', rgb: hexToRgb('#E4ADC8') },
  { id: '226', name: 'Cool Yellow', hex: '#FDF38C', rgb: hexToRgb('#FDF38C') },
  { id: '268', name: 'Medium Lilac', hex: '#342B75', rgb: hexToRgb('#342B75') },
  { id: '312', name: 'Medium Nougat', hex: '#AA7D55', rgb: hexToRgb('#AA7D55') },
  { id: '321', name: 'Dark Azur', hex: '#078BC9', rgb: hexToRgb('#078BC9') },
  { id: '322', name: 'Medium Azur', hex: '#36AEBF', rgb: hexToRgb('#36AEBF') },
  { id: '323', name: 'Aqua', hex: '#D3F2EA', rgb: hexToRgb('#D3F2EA') },
  { id: '326', name: 'Spring Yellowish Green', hex: '#E2F99A', rgb: hexToRgb('#E2F99A') },
  { id: '330', name: 'Olive Green', hex: '#9B9A5A', rgb: hexToRgb('#9B9A5A') },
];

export const getNearestLegoColor = (r: number, g: number, b: number): LegoColor => {
  let minDistance = Infinity;
  let nearestColor = LEGO_COLORS[0];

  for (const color of LEGO_COLORS) {
    // Simple Euclidean distance in RGB space
    const dR = r - color.rgb.r;
    const dG = g - color.rgb.g;
    const dB = b - color.rgb.b;
    const distanceSq = dR * dR + dG * dG + dB * dB;

    if (distanceSq < minDistance) {
      minDistance = distanceSq;
      nearestColor = color;
    }
  }

  return nearestColor;
};
