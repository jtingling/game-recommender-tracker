import React, { useEffect, useState} from 'react'

import GameCard from './GameCard';
import NavBar from './NavBar';
import List from './List';
import SearchResult from './SearchResult';

import Paper from '@material-ui/core/Paper'
import { CssBaseline } from '@material-ui/core'
import getIdentifier from './identifier';


export const GameContext = React.createContext();



function App() {
  const [gameNameData, setGameName] = useState();
  const [gameData, setGameData] = useState();
  const [tabValue, setTabValue] = React.useState(0);
  const [favouriteGames, setFavouriteGames] = useState();
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

  const handleGameData = (dataType) => {
    try{
      return dataType.map((game) => {
        return (
          <GameCard game={game}/>
        )
      })
    } catch (e) {
        return <h1>Make a search...</h1>
    }
  }

  useEffect(()=> {
    getIdentifier();
  }, [])

  return (
    <Paper elevation={1}>
      <CssBaseline />
      <GameContext.Provider value={{
        submit: submitGame,
        setNameValue: handleGameName,
        handleTabValue: handleTabChange,
        tabValue: tabValue,
        gameName: gameNameData,
        favouriteGamesList: favouriteGames,
        setFavourites: setFavouriteGames
        }}>
        <NavBar/>
        <div>
          {tabValue === 0 && <SearchResult getGameData={gameData} getGames={handleGameData(gameData)} />}
          {tabValue === 1 && <List getGames={handleGameData(favouriteGames)}/>}
        </div>
      </GameContext.Provider>
    </Paper>
  )
}

export default App;
