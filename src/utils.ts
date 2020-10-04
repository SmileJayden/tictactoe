import { Board, BoardStatus, TurnOwner } from '@/types';

function getInitBoard(gameSize: number): Board {
  return new Array(gameSize)
    .fill(null)
    .map(() => new Array(gameSize).fill(null));
}

function checkRows(board: Board): boolean {
  return board.some(
    (r) =>
      r.every((c) => c === TurnOwner.A) || r.every((c) => c === TurnOwner.B)
  );
}

function getTranspose(matrix: any[][]) {
  return matrix[0].map((_, i) => matrix.map((x) => x[i]));
}

function checkCols(board: Board): boolean {
  const transposed = getTranspose(board);
  return checkRows(transposed);
}

function checkDiagonals(board: Board): boolean {
  const mockArrayLength = board.length - 1;
  const mock = new Array(mockArrayLength).fill(null);
  return (
    mock.every((_, i) => board[i][i] && board[i][i] === board[i + 1][i + 1]) ||
    mock.every(
      (_, i) =>
        board[mockArrayLength - i][i] &&
        board[mockArrayLength - i][i] === board[mockArrayLength - i - 1][i + 1]
    )
  );
}

function checkFull(board: Board) {
  return board.every((r) => r.every((c) => c));
}

function checkBoardStatus(board: Board): BoardStatus {
  if (checkRows(board) || checkCols(board) || checkDiagonals(board))
    return BoardStatus.WIN;
  else if (checkFull(board)) return BoardStatus.DRAW;
  return BoardStatus.CONTINUE;
}

export { getInitBoard, checkBoardStatus };
