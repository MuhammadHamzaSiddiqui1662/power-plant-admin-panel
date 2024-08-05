import { createTheme, ThemeOptions, Shadows } from "@mui/material";
const defaultTheme = createTheme();
const defaultShadows: ThemeOptions["shadows"] = [...defaultTheme.shadows];

export const primaryMain = "#6BB955";
export const primaryLight = "#2a9ef7";
export const primaryContrastText = "#ffffff";
export const secondaryMain = "#f2f2f2";
export const infoMain = "#2a9ef7";
export const infoContrastText = "#ffffff";
export const borderLight = "#F1F2F3";

export const theme: ThemeOptions = createTheme({
  typography: {
    fontFamily: ["Satoshi", "sans-serif"].join(","),
  },
  shape: {
    borderRadius: 8,
  },
  shadows: defaultShadows.map(() => "none") as Shadows,
  palette: {
    primary: {
      main: primaryMain,
      light: primaryLight,
      contrastText: primaryContrastText,
    },
    secondary: {
      main: secondaryMain,
    },
    info: {
      main: infoMain,
      contrastText: infoContrastText,
    },
  },
  components: {
    /* List Styling */
    MuiListSubheader: {
      styleOverrides: {
        root: {
          color: "inherit",
          backgroundColor: "inherit",
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingTop: 0,
          paddingBottom: 8,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: "inherit",
          paddingTop: 4,
          paddingBottom: 4,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
          minWidth: 40,
        },
      },
    },
  },
});
