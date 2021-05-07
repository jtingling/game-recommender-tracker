import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const saveGameToList = (listNumber) => {
    const data = props.game;
    console.log("game saved:" + listNumber)
    fetch(`http://localhost:5000/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .catch((err) => console.log("Error: ", err))
  }

  return (
    <div>
      <Button size="small" color="primary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Add to List
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { handleClose(); saveGameToList(1) }}>List One</MenuItem>
      </Menu>
    </div>
  );
}

