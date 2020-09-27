export type Color = 'red' | 'blue' | 'white';

export enum enumColor {
  Red = 'red',
  Blue = 'blue',
}

export interface Cell {
  index: number;
  color: Color;
}
