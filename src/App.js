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
  const [isListed, setIsListed] = useState(false);
  const [favourites, setFavourites] = useState();
  const [onFavouritesList, setOnFavouritesList] = useState();
  const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
  };


  const submitGame = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/games/${gameNameData}`)
      .then(response => response.json())
      .then(data => {setGameData(data)})
      .catch(e => console.log(e));
  }
  const handleGameName = (e) => {
    setGameName(e.target.value)
  }

  const getGameData = () => {
    const identifier = window.localStorage.getItem("key");
    fetch(`http://localhost:5000/getList/${identifier}`)
        .then(response => response.json())
        .then( data => {
            fetch(`http://localhost:5000/favourites?gameIds=${data}`)
                .then(response => response.json())
                .then( data => setFavourites(data))
            })
  }
  const getMatchingFavouriteGames = () => {
    let onList = [];
    let gameIds = [];
    favourites.forEach((favourite)=>{
      gameIds.push(favourite.id);
      
    })
    try {
      if (gameData !== undefined) {
        gameData.forEach((game)=>{
          for (const id of gameIds ) {
            if (game.id === id ) {
              onList.push(id);
            }
          }
        })
        console.log(onList)
        setOnFavouritesList(onList)
      }
    } catch (e) {
      console.log(e);
    }
  }

  const handleGameData = () => {
    try{
      return gameData.map((game) => {
        if (onFavouritesList.length !== 0 && onFavouritesList.includes(game.id)) {
          return <GameCard game={game} listed={true}/>          
        }
        return <GameCard game={game} listed={false}/>
      })
    } catch (e) {
        console.log(e)
        return <h1>Make a search...</h1>
    }
  }

  useEffect(()=> {
    getIdentifier();
    getGameData();
  }, [])
  useEffect(()=> {

    if (gameData !== undefined) {
      getMatchingFavouriteGames();
      
    }
  }, [gameData])

  return (
    <Paper elevation={1}>
      <CssBaseline />
      <GameContext.Provider value={{
        submit: submitGame,
        setNameValue: handleGameName,
        handleTabValue: handleTabChange,
        tabValue: tabValue,
        gameName: gameNameData,
        isFavourite: isListed,
        setIsFavourite: setIsListed,
        getGameById: getGameData,
        favourites: favourites,
        setFavourites: setFavourites
        }}>
        <NavBar/>
        <div>
          {tabValue === 0 && <SearchResult getGameData={gameData} getGames={handleGameData} matchedGames={onFavouritesList}/>}
          {tabValue === 1 && <List/>}
        </div>
      </GameContext.Provider>
    </Paper>
  )
}

export default App;
