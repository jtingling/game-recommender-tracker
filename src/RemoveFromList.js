import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GameContext } from './App'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';


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

export default function RemoveGameFromList(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const context = useContext(GameContext)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const removeGame = () => {
    let data = {}
    data.id = props.game.id;
    data.favouriteListKey = window.localStorage.getItem("key");
    data.newFavourites = [];

    const updatedFavourites = context.favourites.filter((game)=>{
      return game.id !== props.game.id
    })
    data.newFavourites = updatedFavourites.map((game)=> {
      return game.id;
    })

    fetch(`http://localhost:5000/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then( response => response.json())
      .then( data => context.setFavourites(data))
      .catch((err) => console.log("Error: ", err))
  }

  return (
    <div>
      <Button variant="contained" size="small" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Remove from Favourites
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { handleClose(); removeGame() }}>Favourite Games</MenuItem>
      </Menu>
    </div>
  );
}

