export type Color = 'red' | 'blue' | 'white';

export enum enumColor {
  Red= 3,
  Green,
  Blue = 9,
}

export interface Cell {
  index: number;
  color: Color;
}
