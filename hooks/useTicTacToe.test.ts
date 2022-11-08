import { act, renderHook } from "@testing-library/react-native";

import {
  checkBoardForWinningCondition,
  getNewBoardState,
  initialBoardState,
  PlayerSymbol,
  useTicTacToe,
} from ".";

describe("useTicTacToe", () => {
  it.each([
    [
      initialBoardState,
      PlayerSymbol.X,
      0,
      0,
      [
        [PlayerSymbol.X, null, null],
        [null, null, null],
        [null, null, null],
      ],
    ],
    [
      initialBoardState,
      PlayerSymbol.O,
      0,
      0,
      [
        [PlayerSymbol.O, null, null],
        [null, null, null],
        [null, null, null],
      ],
    ],
    [
      [
        [PlayerSymbol.O, null, null],
        [null, PlayerSymbol.X, null],
        [null, PlayerSymbol.X, PlayerSymbol.O],
      ],
      PlayerSymbol.O,
      0,
      1,
      [
        [PlayerSymbol.O, PlayerSymbol.O, null],
        [null, PlayerSymbol.X, null],
        [null, PlayerSymbol.X, PlayerSymbol.O],
      ],
    ],
  ])(
    "should return a correct new board state when calling getNewBoardState",
    (boardState, playerSymbol, rowIndex, columnIndex, expectedBoardState) => {
      const newBoardState = getNewBoardState(
        boardState,
        playerSymbol,
        rowIndex,
        columnIndex
      );

      expect(newBoardState).toEqual(expectedBoardState);
    }
  );
  it.each([
    [
      [
        [PlayerSymbol.O, null, null],
        [null, PlayerSymbol.X, null],
        [null, PlayerSymbol.X, PlayerSymbol.O],
      ],
      {
        winner: null,
        winningLineStartPosition: undefined,
      },
    ],
    [
      [
        [PlayerSymbol.O, PlayerSymbol.X, null],
        [null, PlayerSymbol.X, null],
        [null, PlayerSymbol.X, PlayerSymbol.O],
      ],
      {
        winner: PlayerSymbol.X,
        winningLineStartPosition: "v2",
      },
    ],
    [
      [
        [PlayerSymbol.O, null, null],
        [null, PlayerSymbol.O, null],
        [PlayerSymbol.X, PlayerSymbol.X, PlayerSymbol.X],
      ],
      {
        winner: PlayerSymbol.X,
        winningLineStartPosition: "h3",
      },
    ],
    [
      [
        [PlayerSymbol.X, PlayerSymbol.X, PlayerSymbol.O],
        [PlayerSymbol.O, PlayerSymbol.O, PlayerSymbol.X],
        [PlayerSymbol.X, PlayerSymbol.O, PlayerSymbol.X],
      ],
      {
        winner: "draw",
        winningLineStartPosition: undefined,
      },
    ],
    [
      [
        [PlayerSymbol.O, PlayerSymbol.X, PlayerSymbol.X],
        [PlayerSymbol.X, PlayerSymbol.O, PlayerSymbol.X],
        [PlayerSymbol.X, PlayerSymbol.O, PlayerSymbol.O],
      ],
      {
        winner: PlayerSymbol.O,
        winningLineStartPosition: "d1",
      },
    ],
  ])(
    "should check correctly if the game ended in checkBoardForWinningCondition",
    (boardState, expectedBoardWinningStatus) => {
      const result = checkBoardForWinningCondition(boardState);

      expect(result).toEqual(expectedBoardWinningStatus);
    }
  );
  it("should correctly play the game", () => {
    const { result, rerender } = renderHook(useTicTacToe);

    expect(result.current.boardState).toEqual(initialBoardState);
    expect(result.current.winner).toBeNull();
    expect(result.current.winningLineStartPosition).toBeUndefined();
    expect(result.current.currentPlayer).toEqual(PlayerSymbol.X);

    act(() => {
      result.current.takeTurn(0, 0);
    });

    rerender({});

    expect(result.current.boardState).toEqual([
      [PlayerSymbol.X, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    expect(result.current.winner).toBeNull();
    expect(result.current.winningLineStartPosition).toBeUndefined();
    expect(result.current.currentPlayer).toEqual(PlayerSymbol.O);

    act(() => {
      result.current.takeTurn(0, 1);
    });

    rerender({});

    expect(result.current.boardState).toEqual([
      [PlayerSymbol.X, PlayerSymbol.O, null],
      [null, null, null],
      [null, null, null],
    ]);
    expect(result.current.winner).toBeNull();
    expect(result.current.winningLineStartPosition).toBeUndefined();
    expect(result.current.currentPlayer).toEqual(PlayerSymbol.X);

    act(() => {
      result.current.takeTurn(1, 0);
    });

    rerender({});

    expect(result.current.boardState).toEqual([
      [PlayerSymbol.X, PlayerSymbol.O, null],
      [PlayerSymbol.X, null, null],
      [null, null, null],
    ]);
    expect(result.current.winner).toBeNull();
    expect(result.current.winningLineStartPosition).toBeUndefined();
    expect(result.current.currentPlayer).toEqual(PlayerSymbol.O);

    act(() => {
      result.current.takeTurn(1, 1);
    });

    rerender({});

    expect(result.current.boardState).toEqual([
      [PlayerSymbol.X, PlayerSymbol.O, null],
      [PlayerSymbol.X, PlayerSymbol.O, null],
      [null, null, null],
    ]);
    expect(result.current.winner).toBeNull();
    expect(result.current.winningLineStartPosition).toBeUndefined();
    expect(result.current.currentPlayer).toEqual(PlayerSymbol.X);

    act(() => {
      result.current.takeTurn(2, 0);
    });

    rerender({});

    expect(result.current.boardState).toEqual([
      [PlayerSymbol.X, PlayerSymbol.O, null],
      [PlayerSymbol.X, PlayerSymbol.O, null],
      [PlayerSymbol.X, null, null],
    ]);
    expect(result.current.winner).toEqual(PlayerSymbol.X);
    expect(result.current.winningLineStartPosition).toEqual("v1");
    expect(result.current.currentPlayer).toEqual(PlayerSymbol.X);

    act(() => {
      result.current.takeTurn(2, 1);
    });

    rerender({});

    // Can't take a turn after the game is over
    expect(result.current.boardState).toEqual([
      [PlayerSymbol.X, PlayerSymbol.O, null],
      [PlayerSymbol.X, PlayerSymbol.O, null],
      [PlayerSymbol.X, null, null],
    ]);

    expect(result.current.winner).toEqual(PlayerSymbol.X);
    expect(result.current.winningLineStartPosition).toEqual("v1");
    expect(result.current.currentPlayer).toEqual(PlayerSymbol.X);

    act(() => {
      result.current.reset();
    });

    rerender({});

    expect(result.current.boardState).toEqual(initialBoardState);
    expect(result.current.winner).toBeNull();
    expect(result.current.winningLineStartPosition).toBeUndefined();
    expect(result.current.currentPlayer).toEqual(PlayerSymbol.X);
  });

  it("resetting the game works as expected", () => {
    const { result, rerender } = renderHook(useTicTacToe);

    expect(result.current.boardState).toEqual(initialBoardState);
    expect(result.current.winner).toBeNull();
    expect(result.current.winningLineStartPosition).toBeUndefined();
    expect(result.current.currentPlayer).toEqual(PlayerSymbol.X);

    act(() => {
      result.current.takeTurn(0, 0);
    });

    rerender({});

    expect(result.current.boardState).toEqual([
      [PlayerSymbol.X, null, null],
      [null, null, null],
      [null, null, null],
    ]);
    expect(result.current.winner).toBeNull();
    expect(result.current.winningLineStartPosition).toBeUndefined();
    expect(result.current.currentPlayer).toEqual(PlayerSymbol.O);

    act(() => {
      result.current.reset();
    });

    rerender({});

    expect(result.current.boardState).toEqual(initialBoardState);
    expect(result.current.winner).toBeNull();
    expect(result.current.winningLineStartPosition).toBeUndefined();
    expect(result.current.currentPlayer).toEqual(PlayerSymbol.X);
  });

  it("taking a turn on a taken cell does nothing", () => {
    const expectedBoardState = [
      [null, null, null],
      [null, null, null],
      [null, null, PlayerSymbol.X],
    ];

    const rowAndColumnIndex = [2, 2];

    const { result, rerender } = renderHook(useTicTacToe);

    act(() => {
      result.current.takeTurn(rowAndColumnIndex[0], rowAndColumnIndex[1]);
    });

    rerender({});

    expect(result.current.boardState).toEqual(expectedBoardState);
    expect(result.current.winner).toBeNull();
    expect(result.current.winningLineStartPosition).toBeUndefined();
    expect(result.current.currentPlayer).toEqual(PlayerSymbol.O);

    act(() => {
      result.current.takeTurn(rowAndColumnIndex[0], rowAndColumnIndex[1]);
    });

    rerender({});

    expect(result.current.boardState).toEqual(expectedBoardState);
    expect(result.current.winner).toBeNull();
    expect(result.current.winningLineStartPosition).toBeUndefined();
    expect(result.current.currentPlayer).toEqual(PlayerSymbol.O);
  });

  it("taking a turn on a cell outside the board does nothing", () => {
    const { result, rerender } = renderHook(useTicTacToe);

    act(() => {
      result.current.takeTurn(3, 0);
    });

    rerender({});

    expect(result.current.boardState).toEqual(initialBoardState);
    expect(result.current.winner).toBeNull();
    expect(result.current.winningLineStartPosition).toBeUndefined();
    expect(result.current.currentPlayer).toEqual(PlayerSymbol.X);
  });
});
