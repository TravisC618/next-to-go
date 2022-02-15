import grey from "@material-ui/core/colors/grey";
import createTheme from "@material-ui/core/styles/createTheme";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: {
      main: grey[50],
    },
  },
});

export default theme;
