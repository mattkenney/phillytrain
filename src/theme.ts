import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
        },
      },
    },
  },
});
