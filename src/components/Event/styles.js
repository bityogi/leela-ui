import backgroundShape from 'images/shape.svg';

export default theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.primary['A100'],
      overflow: 'hidden',
      background: `url(${backgroundShape}) no-repeat`,
      backgroundSize: 'cover',
      backgroundPosition: '0 400px',
      marginTop: 10,
      padding: 20,
      paddingBottom: 200
    },
    grid: {
      margin: `0 ${theme.spacing.unit * 2}px`
    },
    smallContainer: {
      width: '60%'
    },
    bigContainer: {
      width: '80%'
    },
    stepContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    stepGrid: {
      width: '80%'
    },
    backButton: {
      marginRight: theme.spacing.unit,
    },
    outlinedButtom: {
      textTransform: 'uppercase',
      margin: theme.spacing.unit
    },
    stepper: {
      backgroundColor: 'transparent'
    },
    paper: {
      padding: theme.spacing.unit * 3,
      textAlign: 'left',
      color: theme.palette.text.secondary
    },
    topInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 42
    },
    formControl: {
      width: '100%'
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    borderColumn: {
      borderBottom: `1px solid ${theme.palette.grey['100']}`,
      paddingBottom: 24,
      marginBottom: 24
    },
    flexBar: {
      marginTop: 32,
      display: 'flex',
      justifyContent: 'center'
    }
  })