export interface Color {
  token: string;
  name: string;
  hex: string;
  rgb: string;
  hsl: string;
  oklch: string;
}

export interface Section {
  title: string;
  items: Color[];
}

export type Dataset = Section[];
