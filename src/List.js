import { useContext, useState, useEffect } from 'react';
import { Switch, Route  } from 'react-router-dom';
import { GameContext } from './App'

const List = () => {
    const context = useContext(GameContext);
    return (
        <h1>A list of games</h1>
    )
}

export default List;