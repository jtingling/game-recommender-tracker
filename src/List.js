import { useContext } from 'react';
import GameCard from './GameCard';
import { GameContext } from './App'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card:  {
      maxWidth: "1fr",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center"
    }
});

const List = (props) => {
    const context = useContext(GameContext);
    const classes = useStyles();

    const handleGameData = () => {
        try{
          return context.favourites.map((game) => {
            return (
              <GameCard key={game.id} game={game} listed={true} />
            )
          })
        } catch (e) {
            return <h1>Please wait...</h1>
        }
      }
    return (
        <div className={classes.card}>
            { context.favourites === undefined ? <h1>Loading...</h1> : handleGameData()}
        </div>

    )
}

export default List;