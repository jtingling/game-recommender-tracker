import React, { useEffect, useState} from 'react'

import GameCard from './GameCard';
import NavBar from './NavBar';
import List from './List';
import SearchResult from './SearchResult';
import Recommendations from './Recommendations';

import { CssBaseline } from '@material-ui/core'
import getIdentifier from './identifier';


export const GameContext = React.createContext();

function App() {
  const [gameNameData, setGameName] = useState("");
  const [gameData, setGameData] = useState();
  const [tabValue, setTabValue] = React.useState(0);
  const [favourites, setFavourites] = useState([]);
  
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

  const getGameDataFromFavourites = () => {
    const identifier = window.localStorage.getItem("key");
    try {
      fetch(`http://localhost:5000/getList/${identifier}`)
      .then(response => response.json())
      .then( data => {
          fetch(`http://localhost:5000/favourites?id=${data}`)
              .then(response => response.json())
              .then( data => {setFavourites(data)})
              .catch(e => console.error(e))
          })
    } catch (e) {
        console.error(e);
    }

  }
  const getMatchingFavouriteGames = () => {
    let gameIds = [];
    favourites.forEach((favourite)=>{
      gameIds.push(favourite.id);
    })
    return gameIds
  }

  const handleGameData = (data) => {
    const favouriteGamesIds = getMatchingFavouriteGames()
    try{
      return data.map((game) => {
        if (favouriteGamesIds.length !== 0 && favouriteGamesIds.includes(game.id)) {
          return <GameCard key={game.id} game={game} listed={true}/>          
        }
        return <GameCard key={game.id} game={game} listed={false}/>
      })
    } catch (e) {
        console.log(e)
        return <h1>Make a search...</h1>
    }
  }

  useEffect(()=> {
    getIdentifier();
    getGameDataFromFavourites();
  }, [])
  
  return (
    <div>
      <CssBaseline />
      <GameContext.Provider value={{
        submit: submitGame,
        setNameValue: handleGameName,
        handleTabValue: handleTabChange,
        tabValue: tabValue,
        gameName: gameNameData,
        getGameById: getGameDataFromFavourites,
        favourites: favourites,
        setFavourites: setFavourites
        }}>
        <NavBar/>
        <div>
          {tabValue === 0 && <SearchResult getGameData={gameData} getGames={handleGameData} />}
          {tabValue === 1 && <List/>}
          {tabValue === 2 && <Recommendations favourites={favourites} getGames={handleGameData}/>}
        </div>
      </GameContext.Provider>
    </div>
  )
}

export default App;
