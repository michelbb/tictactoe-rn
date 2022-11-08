import * as React from "react";

export enum PlayerSymbol {
  X = "X",
  O = "O",
}
export type Winner = PlayerSymbol | "draw" | null;
export type WinningLineStartPosition =
  | "h1"
  | "h2"
  | "h3"
  | "v1"
  | "v2"
  | "v3"
  | "d1"
  | "d2";

type BoardState = (PlayerSymbol | null)[][];

interface BoardWinningStatus {
  winner: Winner;
  winningLineStartPosition?: WinningLineStartPosition;
}

export const initialBoardState: BoardState = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const initialWinner: Winner = null;
const playerX: PlayerSymbol = PlayerSymbol.X;
const playerO: PlayerSymbol = PlayerSymbol.O;

export const checkBoardForWinningCondition = (
  boardState: BoardState
): BoardWinningStatus => {
  const winningLines = [
    // Horizontal
    [boardState[0][0], boardState[0][1], boardState[0][2]],
    [boardState[1][0], boardState[1][1], boardState[1][2]],
    [boardState[2][0], boardState[2][1], boardState[2][2]],
    // Vertical
    [boardState[0][0], boardState[1][0], boardState[2][0]],
    [boardState[0][1], boardState[1][1], boardState[2][1]],
    [boardState[0][2], boardState[1][2], boardState[2][2]],
    // Diagonal
    [boardState[0][0], boardState[1][1], boardState[2][2]],
    [boardState[2][0], boardState[1][1], boardState[0][2]],
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];

    if (a !== null && a === b && a === c) {
      let winningLineStartPosition: WinningLineStartPosition;

      if (i < 3) {
        winningLineStartPosition = `h${i + 1}` as WinningLineStartPosition;
      } else if (i < 6) {
        winningLineStartPosition = `v${i - 2}` as WinningLineStartPosition;
      } else {
        winningLineStartPosition = `d${i - 5}` as WinningLineStartPosition;
      }

      return { winner: a, winningLineStartPosition };
    }
  }

  const isDraw =
    boardState.flat().some((playerSymbol) => playerSymbol === null) === false;

  if (isDraw) {
    return {
      winner: "draw",
    };
  }

  return {
    winner: null,
  };
};

export const getNewBoardState = (
  boardState: BoardState,
  currentPlayerSymbol: PlayerSymbol,
  rowIndex: number,
  columnIndex: number
) => {
  const newBoardState = boardState.map((currentRow, currentRowIndex) => {
    if (currentRowIndex === rowIndex) {
      return currentRow.map((currentColumn, currentColumnIndex) => {
        if (currentColumnIndex === columnIndex) {
          return currentPlayerSymbol;
        }

        return currentColumn;
      });
    }

    return currentRow;
  });

  return newBoardState;
};

export const useTicTacToe = () => {
  const [boardState, setBoardState] =
    React.useState<BoardState>(initialBoardState);
  const [winner, setWinner] = React.useState<Winner>(initialWinner);
  const [winningLineStartPosition, setWinningLineStartPosition] =
    React.useState<WinningLineStartPosition>();
  const [currentPlayer, setCurrentPlayer] =
    React.useState<PlayerSymbol>(playerX);

  const reset = React.useCallback(() => {
    setBoardState(initialBoardState);
    setWinner(initialWinner);
    setCurrentPlayer(playerX);
    setWinningLineStartPosition(undefined);
  }, []);

  const takeTurn = React.useCallback(
    (rowIndex: number, columnIndex: number) => {
      if (
        rowIndex > boardState.length - 1 ||
        columnIndex > boardState[rowIndex].length - 1
      ) {
        return;
      }

      if (boardState[rowIndex][columnIndex] !== null || winner !== null) {
        return;
      }

      const newBoardState = getNewBoardState(
        boardState,
        currentPlayer,
        rowIndex,
        columnIndex
      );

      setBoardState(newBoardState);

      const boardWinningStatus = checkBoardForWinningCondition(newBoardState);

      if (boardWinningStatus.winner !== null) {
        setWinner(boardWinningStatus.winner);
        setWinningLineStartPosition(
          boardWinningStatus.winningLineStartPosition
        );
      } else {
        setCurrentPlayer(currentPlayer === playerX ? playerO : playerX);
      }
    },
    [boardState, currentPlayer, winner]
  );

  return {
    boardState,
    winner,
    winningLineStartPosition,
    currentPlayer,
    reset,
    takeTurn,
  };
};
