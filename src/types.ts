export type Tile = Player | null | boolean;

export type Board = Tile[][];

export enum Player {
  A = 'player-a',
  B = 'player-b',
}

export enum GameRes {
  CONTINUE,
  DRAW,
  WIN,
}
