import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
const useStyles = makeStyles({
    root: {
        maxWidth: 1000
    },
    header: {
        textAlign: 'left'
    }
});

const GameDetails = (props) => {
    const classes = useStyles();
    const displayGenres = () => {
        return props.game.genres.map((genre) => {
            return <Box mx={0.2} component="span"><Chip label={genre.name} /></Box>
        })
    }
    const displayScreenshots = () => {
        return props.game.screenshots.map((image) => {
            return <img src={`https://images.igdb.com/igdb/image/upload/t_cover_small/${image.image_id}.jpg`} alt="game screenshot"/>
        })
    }
    return (
        <div>
            <Grid container className={classes.root}>
                <Grid className={classes.header} item xs={12}>
                    <h2 id="spring-modal-title">{props.game.name}</h2>
                    <p>Rating: {Math.round(props.game.rating)}</p>
                    <Grid item xs={6}>
                        {displayGenres()}
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <p id="spring-modal-description">{props.game.summary}</p>
                </Grid>
            </Grid>
            <Grid container>
                {displayScreenshots()}
            </Grid>
        </div>
    )
}

export default GameDetails;