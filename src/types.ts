export type Tile = Player | null | boolean;

export type Board = Tile[][];

export enum Player {
  A = 'player-a',
  B = 'player-b',
}

export enum BoardStatus {
  CONTINUE,
  DRAW,
  WIN,
}

export interface PlayerProp {
  color: string;
  name: string;
}
