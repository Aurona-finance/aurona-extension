import { createMuiTheme } from '@material-ui/core/styles'

export const colors = {
  black: {
    background: '#030313',
    light: '#090B1B',
    kinda: '#1A1A1A',
    greyish: '#081323'
  },
  blue: {
    accent: '#072E5A',
    base: '#0B2545',
    light: '#66AFF5',
    neon: '#08F7FE',
    astel: '#48ADF1'
  },
  gray: {
    backgroundOpacity: 'rgba(255, 255, 255, 0.05)',
    '#747474': '#747474',
    base: '#8DA9C4',
    skeletonBackground: '#8E8B8B',
    skeletonField: '#C4C4C4'
  },
  green: {
    main: '#00F9BB',
    hover: 'rgba(0,249,187,0.15)',
    pastel: '#8AF7E4'
  },
  white: {
    main: '#FFFFFF'
  },
  red: {
    main: '#EB5757',
    neon: '#FF2079',
    pinkish: '#FE53BB'
  },
  purple: {
    magenta: '#A1045A',
    orchid: '#AF69EF',
    pastel: '#C6BDEA'
  },
  yellow: {
    neon: '#F5D300'
  }
}
export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
      contrastText: '#FFFFFF'
    },
    // secondary: {
    //   main: '#111111'
    // },
    text: {
      primary: '#FFFFFF'
      // secondary: '#111111'
    },
    error: {
      main: '#E15757'
    }
  },
  typography: {
    fontFamily: 'Inter',
    body1: {
      fontSize: 12,
      lineHeight: '15px'
    },
    body2: {
      fontSize: 14
    },
    h1: {
      fontSize: 26,
      fontWeight: 'bold'
    },

    h3: {
      fontSize: 14,
      fontWeight: 'bold'
    }
  },
  overrides: {
    MuiInputBase: {
      input: {
        MozAppearance: 'textfield',
        '&::-webkit-clear-button, &::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
          display: 'none'
        }
      }
    }
  }
})
