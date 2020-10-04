export type Tile = TurnOwner | null | boolean;

export type Board = Tile[][];

export enum TurnOwner {
  A = 'player-a',
  B = 'player-b',
}

export enum BoardStatus {
  CONTINUE,
  DRAW,
  WIN,
}

export interface Player {
  color: string;
  name: string;
  id?: string;
}
