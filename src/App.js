import React, { useState} from 'react'

import GameCard from './GameCard';
import NavBar from './NavBar';

import Paper from '@material-ui/core/Paper'

import { Switch, Route  } from 'react-router-dom';
import List from './List';
import SearchResult from './SearchResult';

export const GameContext = React.createContext();



function App() {
  const [gameNameData, setGameName] = useState();
  const [gameData, setGameData] = useState();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
  };


  const submitGame = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/games/${gameNameData}`)
      .then(response => response.json())
      .then(data => setGameData(data))
      .catch(e => console.log(e));
  }
  const handleGameName = (e) => {
    setGameName(e.target.value)
  }

  const handleGameData = () => {
      return gameData.map((game) => {
        return (
          <GameCard game={game}/>
        )
      })
  }
  const getList = () => {
    //TODO: read data from DB, render <GameCard> with game data
  }

  return (
    <Paper elevation={1}>
      <GameContext.Provider value={{
        submit: submitGame,
        setNameValue: handleGameName,
        handleTabValue: handleTabChange,
        tabValue: tabValue,
        gameName: gameNameData
        }}>
        <NavBar/>
        <div>
          <Switch>
            <Route path="/list/:id">
              <List></List>
            </Route>
            <Route path="/">
              <SearchResult getGameData={gameData} getGames={handleGameData} />
            </Route>
          </Switch>       
        </div>
      </GameContext.Provider>
    </Paper>
  )
}

export default App;
