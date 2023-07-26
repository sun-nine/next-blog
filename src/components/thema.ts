import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const styles = {
  global: {
    body: {
      color: "gray.900",
    },
  },
};

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  // styles,
  // colors,
  config,
});