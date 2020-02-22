import { Color } from '~/models/Tictactoe';

export interface Player {
  name: string;
  imgURL: string;
  score: number;
  color: Color;
}
