import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { GameContext } from './App'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  icon: {
    position: "absolute",
    zIndex: 2,
    left: 321,
    right: 0,
    backgroundColor: "white"
  }
}));

export default function AddToList(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const context = useContext(GameContext)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button variant="contained" size="small" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Add to List
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { handleClose(); props.saveFavourites(); props.saveGame(); }}>Favourite Games</MenuItem>
      </Menu>
    </div>
  );
}

