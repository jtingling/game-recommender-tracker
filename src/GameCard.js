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
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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

    return (
        <Box mx={0.5}>
            <Card className={classes.root} raised >
                
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={`https://static-cdn.jtvnw.net/ttv-boxart/${props.game.name}-${345}x${345}.jpg`}
                        title={props.game.name}
                    >
                    <AddCircleOutlineIcon className={classes.icon}/>
                    </CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.game.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {
                                props.game.game_modes === undefined ? <></> :
                                    props.game.game_modes.map((modes) => {
                                        console.log(modes.name)
                                        return <Chip label={modes.name} />
                                    })
                            }
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        See More
        </Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default GameCard