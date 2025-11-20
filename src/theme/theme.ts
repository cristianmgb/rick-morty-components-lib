import { createTheme } from '@mui/material/styles';

const primary = {
  100: '#E7F3D8',
  300: '#B6DA8B',
  500: '#8BC547',
  700: '#588028',
  900: '#354E18',
};

const neutrals = {
  50: '#E3E4E7',
  100: '#E6E7E3',
  300: '#C7CBC2',
  400: '#808C73',
  600: '#575B52',
  800: '#333630',
};

const theme = createTheme({
  palette: {
    primary: {
      light: primary[300],
      main: primary[100],
      dark: primary[700],
      contrastText: '#fff',
      ...primary,
    },
    secondary: {
      light: neutrals[300],
      main: neutrals[100],
      dark: neutrals[800],
      contrastText: '#000',
      ...neutrals,
    },
    background: {
      paper: '#FAFAFA',
    },
    text: {
      primary: neutrals[800],
      secondary: neutrals[600],
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', sans-serif",
    h6: {
      fontWeight: 700,
    },
    body2: {
      fontSize: '0.9rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
