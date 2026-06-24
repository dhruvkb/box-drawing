export interface Color {
  name: string;
  hex: string;
}

export interface Section {
  title: string;
  items: Color[];
}

export type Dataset = Record<string, Section[]>;
