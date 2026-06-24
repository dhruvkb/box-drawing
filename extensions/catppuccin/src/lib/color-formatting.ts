interface Rgb {
  r: number;
  g: number;
  b: number;
}

/**
 * Parse a `#rrggbb` hex string into its 0–255 RGB channels.
 * @param hex Hex color string, e.g. `#dc8a78`
 * @returns The red, green and blue channels
 */
const hexToRgb = (hex: string): Rgb => {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
};

/**
 * Format a hex color as a CSS `rgb()` string.
 * @param hex Hex color string, e.g. `#dc8a78`
 * @returns CSS `rgb()` string, e.g. `rgb(220, 138, 120)`
 */
export const hexToRgbString = (hex: string): string => {
  const { r, g, b } = hexToRgb(hex);
  return `rgb(${r}, ${g}, ${b})`;
};

/**
 * Format a hex color as a CSS `hsl()` string.
 * @param hex Hex color string, e.g. `#dc8a78`
 * @returns CSS `hsl()` string, e.g. `hsl(11, 59%, 67%)`
 */
export const hexToHslString = (hex: string): string => {
  const { r, g, b } = hexToRgb(hex);
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rn:
        h = ((gn - bn) / delta) % 6;
        break;
      case gn:
        h = (bn - rn) / delta + 2;
        break;
      default:
        h = (rn - gn) / delta + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
};

/**
 * Convert an sRGB channel (0–1) to linear-light RGB.
 */
const linearize = (c: number): number => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

/**
 * Format a hex color as a CSS `oklch()` string.
 *
 * Uses Björn Ottosson's sRGB → OKLab conversion, then converts the
 * Cartesian OKLab `a`/`b` axes to the polar chroma/hue of OKLCH.
 * @param hex Hex color string, e.g. `#dc8a78`
 * @returns CSS `oklch()` string, e.g. `oklch(72.95% 0.058 25.85)`
 */
export const hexToOklchString = (hex: string): string => {
  const { r, g, b } = hexToRgb(hex);
  const lr = linearize(r / 255);
  const lg = linearize(g / 255);
  const lb = linearize(b / 255);

  const l = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  const okL = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_;
  const okA = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_;
  const okB = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_;

  const chroma = Math.sqrt(okA * okA + okB * okB);
  let hue = (Math.atan2(okB, okA) * 180) / Math.PI;
  if (hue < 0) hue += 360;

  return `oklch(${(okL * 100).toFixed(2)}% ${chroma.toFixed(3)} ${hue.toFixed(2)})`;
};
