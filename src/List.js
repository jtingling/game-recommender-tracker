import { useContext, useEffect } from 'react';
import GameCard from './GameCard';
import { GameContext } from './App'
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

const List = (props) => {
    const context = useContext(GameContext);
    const classes = useStyles();

    const handleGameData = () => {
        try{
          return context.favourites.map((game) => {
            return (
              <GameCard game={game} listed={true}/>
            )
          })
        } catch (e) {
            return <h1>Please wait...</h1>
        }
      }

    useEffect(() => {
        context.getGameById();
    }, [])
    return (
        <div className={classes.card}>
            {console.log(context.favourites)}
            { context.favourites === undefined ? <h1>Loading...</h1> : handleGameData()}
        </div>

    )
}

export default List;