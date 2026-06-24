import { useMemo } from "react";
import type { Color } from "@/types";
import { hexToHslString, hexToOklchString, hexToRgbString } from "@/lib/color-formatting";

/**
 * Hook for color formatting with memoization
 * @param color Color to format
 * @returns The color expressed in various CSS formats
 */
export const useColorFormatting = (color: Color) => {
  return useMemo(
    () => ({
      rgb: hexToRgbString(color.hex),
      hsl: hexToHslString(color.hex),
      oklch: hexToOklchString(color.hex),
    }),
    [color.hex],
  );
};
