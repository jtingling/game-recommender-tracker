
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      backgroundColor: "gray"
    },
    card: {
      maxWidth: "1fr",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center"
    }
  });

const SearchResult = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.card}>
          {
            props.getGameData !== undefined ? props.getGames(props.getGameData) : <></>
          }
        </div>
    )
}

export default SearchResult;