import { createTheme } from '@mui/material/styles';

export const Theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5731a2',
    },
    secondary: {
      main: '#f77132',
      contrastText: '#ffffff',
      light: '#ffb694',
      dark: '#f5875b',
    },
    success: {
      main: '#2e7d32',
      dark: '#48ca93',
      light: '#48ca93',
    },
    info: {
      main: '#0288d1',
      light: '#0075ff',
      dark: '#0075ff',
    },
    warning: {
      main: '#ed6c02',
      light: '#ffbc00',
      dark: '#ffbc00',
    },
    error: {
      main: '#ff4343',
    },
    divider: 'rgba(255,255,255,0.12)',
  },
  typography: {
    fontFamily: 'Rubik',
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 46,
          height: 27,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + $track': {
              opacity: 1,
              border: 'none',
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          border: '1px solid #bdbdbd',
          backgroundColor: '#fafafa',
          opacity: 1,
          transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(270deg, rgba(95,39,255,1) 0%, rgba(205,28,255,1) 100%)',
          border: 0,
          borderRadius: 3,
          color: 'white',
          height: 48,
          padding: '0 30px',
          boxShadow: 'none',
          '&.MuiButton-secondary': {
            background: 'linear-gradient(270deg, rgba(247,113,50,1) 0%, rgba(245,135,91,1) 100%)', // New color for secondary button
          },
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  props: {
    MuiList: {
      dense: true,
    },
    MuiMenuItem: {
      dense: true,
    },
    MuiTable: {
      size: 'small',
    },
    MuiButton: {
      size: 'small',
    },
    MuiButtonGroup: {
      size: 'small',
    },
    MuiCheckbox: {
      size: 'small',
    },
    MuiFab: {
      size: 'small',
    },
    MuiFormControl: {
      margin: 'dense',
      size: 'small',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiRadio: {
      size: 'small',
    },
    MuiSwitch: {
      size: 'small',
    },
    MuiTextField: {
      margin: 'dense',
      size: 'small',
    },
    MuiTooltip: {
      arrow: true,
    },
  },
});
