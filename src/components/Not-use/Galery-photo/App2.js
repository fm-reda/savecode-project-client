import React from "react";
import { ThemeProvider } from "@chakra-ui/core";
import { AppContainer } from "./AppContainer";

export const App2 = () => {
  return (
    <ThemeProvider>
      <AppContainer />
    </ThemeProvider>
  );
};
