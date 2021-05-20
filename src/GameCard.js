import { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {GameContext} from './App';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
    const [trailerData, setTrailer] = useState(false);
    const [isListed, setIsListed] = useState(null);

    const getGameTrailer = () => {
        fetch(`http://localhost:5000/video/${props.game.name}`)
            .then(response => response.json())
            .then(videoId => setTrailer(videoId))
            .catch(e => console.log(e))
    }
    const saveToFavourites = () => {
        let data = {};
        data.id = props.game.id;
        data.favouriteId = window.localStorage.getItem("key")
        fetch(`http://localhost:5000/add/favourites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then( (response) => response.json())
            .then((data) => {
                fetch(`http://localhost:5000/favourites?id=${data.id}`)
                    .then(response => response.json())
                    .then( data => context.setFavourites(data)) 
                    .catch(e => console.error(e))
            })
            .catch((err) => console.log("Error: ", err))
    }
    const saveTheGame = () => {
        const data = props.game;
        fetch("http://localhost:5000/add/game", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .catch(e => console.log(e));
    }
    const renderListButton = () => {
        if (props.listed) {
            return <RemoveGameFromList game={props.game}/>
        } else {
            return <AddToList game={props.game} saveGame={saveTheGame} saveFavourites={saveToFavourites} />
        }
    }


    return (
        <Box mx={0.5}>
            <Card className={classes.root} raised >
                <CardActionArea> 
                    {   
                        props.game.cover === undefined ?   
                            <img alt="no game cover" src={"https://static-cdn.jtvnw.net/ttv-static/404_boxart-345x345.jpg"}></img> :
                            <CardMedia      
                                className={classes.media}
                                image={`https://images.igdb.com/igdb/image/upload/t_cover_big/${props.game.cover.image_id}.jpg`}
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
                    <GameModal onClick={() => getGameTrailer()} type={"Watch Trailer"}>
                        {trailerData && <iframe
                            width="853"
                            height="480"
                            src={`https://www.youtube.com/embed/${trailerData}`}
                            frameBorder="0"
                            allowFullScreen
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                            title={props.game.name}
                        />}
                    </GameModal>
                    {renderListButton()}
                </CardActions>
            </Card>
        </Box>
    );
}

export default GameCard;