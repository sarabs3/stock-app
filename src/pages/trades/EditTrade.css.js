import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
            minWidth: 275,
            width: '100%',
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
          bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
          },
          title: {
            fontSize: 14,
          },
          pos: {
            marginBottom: 12,
          },
        },
        cardContent: {
            width: '100%'
        },
        input: {
            width: '100%'
        },
        button: {
            marginTop: '2rem'
        },
        dataToBeEntered: {
            background: '#eee',
            padding: '1rem',
        },
        title: {
            fontSize: '1rem',
            fontWeight: 700
        },
        previewTitle: {
            fontSize: '1.1rem',
            fontWeight: 700,
            borderBottom: '3px solid #ccc'
        }
}));
export default useStyles;
