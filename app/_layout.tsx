import { Slot } from "expo-router";
import React from "react";
import TokenContextProvider from "../src/contexts/userContext";

export default function _layout() {
  return (
    <TokenContextProvider>
      <Slot />
    </TokenContextProvider>
  );
}
