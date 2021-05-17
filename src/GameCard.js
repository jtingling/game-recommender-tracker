import { useContext, useState, useEffect } from 'react';
import { GameContext } from './App'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';

import AddToList from './AddToList';
import GameDetails from './GameDetails';
import GameModal from './GameModal'
import RemoveGameFromList from './RemoveFromList';

const useStyles = makeStyles({
    root: {
        width: 345,
        height: "auto"

    },
    media: {
        height: 345
    },
    icon: {
        position: "absolute",
        zIndex: 2,
        right: 0,
        backgroundColor: "white"
    }
});

const GameCard = (props) => {
    const classes = useStyles();
    const context = useContext(GameContext);
    const [trailerData, setTrailer] = useState();
    const [coverURI, setCoverURI] = useState();


    const getBoxArt = () => {
        fetch(`http://localhost:5000/boxart/${props.game.cover}`)
            .then(response => response.json())
            .then(data => setCoverURI(data));
    }
    const getGameTrailer = () => {
        fetch(`http://localhost:5000/video/${props.game.name}`)
            .then(response => response.json())
            .then(videoId => setTrailer(videoId))
            .catch(e => console.log(e))
    }
    const saveToFavourites = () => {
        let data = {};
        data.gameId = props.game.id;
        data.favouriteId = window.localStorage.getItem("key")
        fetch(`http://localhost:5000/add/favourites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .catch((err) => console.log("Error: ", err))
    }
    const saveTheGame = () => {
        console.log(props.game)
        const data = props.game;
        fetch("http://localhost:5000/add/game", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(e => console.log(e));
    }

    
    useEffect(() => {
        getBoxArt();
        //getGameTrailer();
    }, [props.game.name])

    return (
        <Box mx={0.5}>
            {console.log(trailerData)}
            <Card className={classes.root} raised >
                <CardActionArea>
                    {
                        coverURI === undefined ?
                            <img src={"https://static-cdn.jtvnw.net/ttv-static/404_boxart-345x345.jpg"}></img> :
                            <CardMedia
                                className={classes.media}
                                image={`https://images.igdb.com/igdb/image/upload/t_cover_big/${coverURI[0].image_id}.jpg`}
                                title={props.game.name}>
                            </CardMedia>
                    }
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.game.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {
                                props.game.game_modes === undefined ? <></> :
                                    props.game.game_modes.map((modes) => {
                                        return <Box mx={0.2} component="span"><Chip label={modes.name} /></Box>
                                    })
                            }
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <GameModal type={"See More..."}>
                        <GameDetails game={props.game} />
                    </GameModal>
                    {
                        trailerData === undefined ?
                            <GameModal type={"Trailer Unavailable"}>
                                <p>Video not available</p>
                            </GameModal> :
                            <GameModal game={props.game} type={"Watch Trailer"}>
                                <iframe
                                    width="853"
                                    height="480"
                                    src={`https://www.youtube.com/embed/${trailerData}`}
                                    frameBorder="0"
                                    allowFullScreen
                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                                    title={props.game.name}
                                />
                            </GameModal>
                    }
                    {props.listed && <RemoveGameFromList/>} 
                    {props.listed === false && <AddToList game={props.game} saveGame={saveTheGame} saveFavourites={saveToFavourites}/>}
                </CardActions>
            </Card>
        </Box>
    );
}

export default GameCard;