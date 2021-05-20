import { useState, useEffect } from 'react';
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

const Recommendations = (props) => {
    const [similarGames, setSimilarGames] = useState();
    const [recommendatedGames, setRecommendedGames] = useState([]);
    const classes = useStyles();

    useEffect(() => {    
        const mergeSimilarGamesList = () => {
            let similarGames;
            let mergedList = [];
            const gameIdSet = new Set();
            let gameItr;
            let finalList = [];
            let counter = 0;

            if (props.favourites !== undefined) {
                similarGames = props.favourites.map((game) => {
                    if (game.similar_games !== undefined ) {
                        return game.similar_games;
                    } else {
                        return 111026 //default game id if field is missing
                    }
                })
            } else {
                return [];
            }

        if (similarGames.length !== 0) {
            for (const list of similarGames) {
                mergedList.push(list);
            }
            mergedList.flat().forEach((gameId) => {
                if (!gameIdSet.has(gameId)) {
                    gameIdSet.add(gameId);
                }
            })
            gameItr = gameIdSet.values();
            while (counter < gameIdSet.size) {
                finalList.push(gameItr.next().value);
                counter++;
            }
            setSimilarGames(finalList);
        } else {
            setSimilarGames([]);
        }
    }
        mergeSimilarGamesList();
    }, [props.favourites])

    useEffect(() => {
        if (similarGames !== undefined) {
            async function fetchRecommendedGames () {
                await fetch(`http://localhost:5000/favourites?id=${similarGames}`)
                .then(response => response.json())
                .then(data => setRecommendedGames(data))
                .catch(e => console.log(e))
            }
            fetchRecommendedGames();
        }
    }, [similarGames])

    return (
        <div className={classes.card}>
            {recommendatedGames && props.getGames(recommendatedGames)}
        </div>

    )
}

export default Recommendations;