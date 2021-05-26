import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    screenshotsDesktop: {
        width: "1280px",
        height: "auto"
    },
    screenshotsMobile: {
        width: "420px",
        height: "auto"
    }
}));

const ScreenShots = (props) => {
    const classes = useStyles();

    const displayScreenshots = () => {
        if (props.deviceWidth > 600) {
            return (
                <div className={classes.screenshotsDesktop}>
                    <Carousel autoPlay={true} interval={2000} showThumbs={false} infiniteLoop={true}>
                    {
                            props.game.screenshots.map((image) => {
                                return (
                                    <img src={`https://images.igdb.com/igdb/image/upload/t_screenshot_huge/${image.image_id}.jpg`} alt='game' />
                                )
                            })
                        }
                    </Carousel>
                </div>
            )
        } else if (props.deviceWidth < 600) {
            return (
                <div className={classes.screenshotsMobile}>
                    <Carousel autoPlay={true} interval={2000} showThumbs={false} infiniteLoop={true}>
                    {
                            props.game.screenshots.map((image) => {
                                return (
                                    <img src={`https://images.igdb.com/igdb/image/upload/t_logo_med/${image.image_id}.jpg`} alt='game' />
                                )
                            })
                        }
                    </Carousel>
                </div>
            )   
        }
    }
    return (
        <>
            {displayScreenshots()}
        </>
    )
}

export default ScreenShots;