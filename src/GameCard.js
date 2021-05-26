import { useState, useContext, useEffect } from 'react';
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
import ScreenShots from './ScreenShots';
import AddToList from './AddToList';
import GameDetails from './GameDetails';
import GameModal from './GameModal'
import RemoveGameFromList from './RemoveFromList';

const useStyles = makeStyles({
    root: {
        width: 380,
        height: "auto",
        margin: "7px"

    },
    media: {
        height: 345,
        backgroundSize: "100% 100%"
    }
});

const GameCard = (props) => {
    const classes = useStyles();
    const context = useContext(GameContext);
    const [trailerData, setTrailer] = useState(false);
    const [open, setOpen] = useState(false);
    const [openVideo, setOpenVideo] = useState(false);
    const [openScreenShots, setOpenScreenShots] = useState(false);
    const [viewPortWidth, setViewPortWidth] = useState(null)

    const getGameTrailer = () => {
        fetch(`https://game-recommender-be.herokuapp.com/video/${props.game.name}`)
            .then(response => response.json())
            .then(videoId => setTrailer(videoId))
            .catch(e => {console.log(e); setOpenVideo(false)})
    }
    const saveToFavourites = () => {
        let data = {};
        data.id = props.game.id;
        data.favouriteId = window.localStorage.getItem("key")
        fetch(`https://game-recommender-be.herokuapp.com/add/favourites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then( (response) => response.json())
            .then((data) => {
                fetch(`https://game-recommender-be.herokuapp.com/favourites?id=${data.id}`)
                    .then(response => response.json())
                    .then( data => context.setFavourites(data)) 
                    .catch(e => console.error(e))
            })
            .catch((err) => console.log("Error: ", err))
    }
    const saveTheGame = () => {
        const data = props.game;
        fetch("https://game-recommender-be.herokuapp.com/add/game", {
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
            return <RemoveGameFromList key={props.game.id} game={props.game}/>
        } else {
            return <AddToList key={props.game.id} game={props.game} saveGame={saveTheGame} saveFavourites={saveToFavourites} />
        }
    }
    const handleModal = () => {
        if (!open) {
            setOpen(true);
        } else {
            setOpen(false)
        }
    }
    const handleVideoModal = () => {
        if (!openVideo) {
            setOpenVideo(true);
        } else {
            setOpenVideo(false)
        }
    }
    const handleScreenShots = () => {
        if (!openScreenShots) {
            setOpenScreenShots(true);
        } else {
            setOpenScreenShots(false)
        }
    }
    useEffect(()=>{
        (function () {
            const ele = document.getElementById('root')
            const rect = ele.getBoundingClientRect();
            setViewPortWidth(rect.width)
          })()
    },[])
    return (
            <Card className={classes.root} raised > 
                <CardActionArea> 
                    {   
                    props.game.cover === undefined ?
                        <img alt="no game cover" src={"https://static-cdn.jtvnw.net/ttv-static/404_boxart-345x345.jpg"}></img> :
                        <div onClick={() => handleModal()}>
                            <CardMedia
                                className={classes.media}
                                image={`https://images.igdb.com/igdb/image/upload/t_cover_big/${props.game.cover.image_id}.jpg`}
                                title={props.game.name}>
                            </CardMedia>
                            <GameModal isOpen={open}>
                                <GameDetails game={props.game} />
                            </GameModal>
                        </div>
                    }
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.game.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="h6">
                            {
                                props.game.game_modes === undefined ? <></> :
                                    props.game.game_modes.map((modes) => {
                                        return <Box key={modes.name} mx={0.2} component="span"><Chip label={modes.name} /></Box>
                                    })
                            }
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                <div onClick={() => {getGameTrailer(); handleVideoModal()}}>
                    <GameModal isVideoOpen={openVideo} type={"Watch Trailer"} >
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
                </div>
                <div onClick={() => {handleScreenShots(); handleScreenShots()}}>
                    <GameModal isScreenShotsOpen={openScreenShots} type={"View Screenshots"}>
                        {console.log(props.game)}
                        <ScreenShots game={props.game} deviceWidth={viewPortWidth} />
                    </GameModal>
                </div>
                    {renderListButton()}
                </CardActions>
            </Card>
    );
}

export default GameCard;