import { theme } from "@chakra-ui/core";

const breakpoints = ["360px", "768px", "1024px", "1440px"];
breakpoints.sm = breakpoints[0];
breakpoints.md = breakpoints[1];
breakpoints.lg = breakpoints[2];
breakpoints.xl = breakpoints[3];
// Let's say you want to add custom colors
const customTheme = {
  ...theme,
  fonts: {
    body: "system-ui, sans-serif",
    heading: "sans-serif",
    mono: "Staatliches",
    
  },
  colors: {
    ...theme.colors,
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
    teal: {
      500: "#319795",
    },
    dandelion: {
      100: "#FFE066",
      200: "#FFDA49",
    },
  },
  breakpoints,
};

export default customTheme;
