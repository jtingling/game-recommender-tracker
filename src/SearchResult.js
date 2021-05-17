
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      backgroundColor: "gray"
    },
    card: {
      maxWidth: "1fr",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-start"
    }
  });

const SearchResult = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.card}>
          {
            props.getGameData !== undefined && props.matchedGames !== undefined ? props.getGames() : <></>
          }
        </div>
    )
}

export default SearchResult;