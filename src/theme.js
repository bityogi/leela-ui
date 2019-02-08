import { blue, indigo } from '@material-ui/core/colors'

const theme = {
    palette: {
      secondary: {
        main: blue[900]
      },
      primary: {
        main: indigo[700]
      }
    },
    typography: {
      useNextVariants: true,
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        'Lato',
        'sans-serif'
      ].join(',')
    }
  };


export default theme;
