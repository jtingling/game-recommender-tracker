import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useContext } from 'react';
import { GameContext } from './App'
import { Link } from 'react-router-dom';

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    tab: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    }
}));

export default function ScrollableTabsButtonAuto() {
    const classes = useStyles();
    const context = useContext(GameContext);

    return (
        <div className={classes.root}>
            <Tabs
                value={context.tabValue}
                onChange={context.handleTabValue}
                indicatorColor="primary"
                textColorInherit
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                <Tab label="Search" {...a11yProps(0)} />
                <Tab label="Favourite Games" {...a11yProps(0)} />
                <Tab label="Recommendations" {...a11yProps(0)} />
            </Tabs>
        </div>
    );
}
