import React, { useState} from 'react'

import GameCard from './GameCard';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const  GameContext = React.createContext()

const useStyles = makeStyles({
  root: {
    backgroundColor: "gray"
  },
  card: {
    maxWidth: "1fr",
    display: "flex",
    rowGap: "5px",
    flexWrap: "wrap",
    justifyContent: "flex-start"
  }
});

function App() {
  const [gameName, setGameName] = useState();
  const [gameData, setGameData] = useState();
  const [recommendations, setRecommendations] = useState();
  const classes = useStyles();
  const handleChange = (e) => {
    setGameName(e.target.value)
  }
  const submitGame = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/games/${gameName}`)
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

  const handleGameData = () => {
      return gameData.map((game) => {
        return (
          <GameCard game={game}/>
        )
      })
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
    <GameContext.Provider value={{gameData: gameData}}>
      <form onSubmit={submitGame}>
        <FormControl >
          <InputLabel htmlFor="my-input">Game Name</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" value={gameName} onChange={handleChange} />
        </FormControl>
      </form>
      <h1>Search Results:</h1>
      <div className={classes.card}>
        {
          gameData !== undefined ? handleGameData() : <></>
        }
      </div>
    </GameContext.Provider>
    </Paper>
  )
}

export default App;
