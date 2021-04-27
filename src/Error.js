import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

const Error = (props) => {
    <Alert >This is an error message!</Alert>
    return <MuiAlert elevation={6} variant="filled" severity="error" />;
}

export default Error;