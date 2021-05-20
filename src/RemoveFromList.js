import React, { useState, useContext } from 'react';
import { GameContext } from './App'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

export default function RemoveGameFromList(props) {
  const [anchorEl, setAnchorEl] = useState(null);
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
      .then( () => context.setFavourites(updatedFavourites))
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

