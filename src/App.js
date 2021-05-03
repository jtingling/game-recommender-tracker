import React, { useState} from 'react'

import GameCard from './GameCard';
import NavBar from './NavBar';

import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Route, useLocation } from 'react-router-dom';
import TabPanel from './TabPanel';
export const GameContext = React.createContext();

const useStyles = makeStyles({
  root: {
    backgroundColor: "gray"
  },
  card: {
    maxWidth: "1fr",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start"
  }
});

function App() {
  const [gameNameData, setGameName] = useState();
  const [gameData, setGameData] = useState();
  const [recommendations, setRecommendations] = useState();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
      setTabValue(newValue);
  };
  const classes = useStyles();

  const submitGame = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/games/${gameNameData}`)
      .then(response => response.json())
      .then(data => setGameData(data))
      .catch(e => console.log(e));
  }
  const submitRecommendations = () => {
    fetch(`http://localhost:5000/recommendations`)
      .then(response => response.json())
      .then(data => setRecommendations(data))
      .catch(e => console.log(e))
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
    return <TabPanel value={tabValue} index={0}><h1>Tab Panel {tabValue}</h1></TabPanel>
  }
  /*
  const handleRecommendedData = () => {
    return (
      <ul>{recommendations.Similar.Results.map((games) => {
        let name = games.Name.replaceAll(' ', "%20")
        return (
          <Card>
            <li key={Math.random()}>{games.Name}</li>
            <img src={`https://static-cdn.jtvnw.net/ttv-boxart/${name}-300x300.jpg`} alt='box-art' />
          </Card>
        )
      })}</ul>
    )
  }
  */
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
        <div className={classes.card}>
          {console.log(tabValue)}
          {
            gameData !== undefined ? handleGameData() : getList()
          }
          
        </div>
      </GameContext.Provider>
    </Paper>
  )
}

export default App;
