import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#6366f1",
      light: "#818cf8",
      dark: "#4f46e5",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#38bdf8",
      light: "#7dd3fc",
      dark: "#0284c7",
      contrastText: "#0b0f19",
    },
    background: {
      default: "#0b0f19",
      paper: "#111827",
    },
    text: {
      primary: "#f8fafc",
      secondary: "#94a3b8",
    },
  },
  typography: {
    fontFamily: [
      '"JetBrains Mono"',
      '"Inter"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      "monospace",
    ].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#0b0f19",
          color: "#f8fafc",
        },
      },
    },
  },
});
