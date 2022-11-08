import React from "react";
import { render } from "@testing-library/react-native";

import { PlayerText } from "./PlayerText";
import { PlayerSymbol } from "../hooks";

describe("<PlayerText />", () => {
  it.each([PlayerSymbol.O, PlayerSymbol.X])(
    "renders the message correctly",
    (player) => {
      const { getByText } = render(<PlayerText player={player} />);
      expect(getByText(`Player ${player}`)).toBeVisible();
    }
  );
});
