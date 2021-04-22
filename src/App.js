import { useState } from 'react'
import { FormControl, InputLabel, Input, Button, Card, CardContent } from '@material-ui/core';

function App() {
  const [gameName, setGameName] = useState();
  const [gameData, setGameData] = useState();
  const [recommendations, setRecommendations] = useState();
  const handleChange = (e) => {
    setGameName(e.target.value)
  }
  const submitGame = (e) => {
    console.log(gameName)
    e.preventDefault();
    fetch(`http://localhost:5000/games/${gameName}`)
      .then(response => response.json())
      .then(data => setGameData(data))
  }
  const submitRecommendations = () => {
    fetch(`http://localhost:5000/recommendations`)
      .then(response => response.json())
      .then(data => setRecommendations(data))
  }

  const handleGameData = () => {
    return (
      <ul>{gameData.map((game) => {
        return (
          <Card>
            <CardContent>
              <li key={gameData.id}>{game.name}</li>
              {console.log(game.name)}
              <img src={`https://static-cdn.jtvnw.net/ttv-boxart/${game.name}-300x300.jpg`} alt='box-art' />
            </CardContent>
          </Card>
        )
      })}</ul>
    )
  }
  const handleRecommendedData = () => {
    return (
      <ul>{recommendations.Similar.Results.map((games) => {
        let name = games.Name.replaceAll(' ', "%20")
        console.log(name);
        return (
          <Card>
            <li>{games.Name}</li>
            <img src={`https://static-cdn.jtvnw.net/ttv-boxart/${name}-300x300.jpg`} alt='box-art' />
          </Card>
        )
      })}</ul>
    )
  }
  return (
    <>
      <form onSubmit={submitGame}>
        <FormControl >
          <InputLabel htmlFor="my-input">Game Name</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" value={gameName} onChange={handleChange} />
        </FormControl>
      </form>
      <h1>Search Results:</h1>
      {
        gameData !== undefined ? handleGameData() : <></>
      }
      <h1>Recommendations:</h1>
      <Button onClick={() => submitRecommendations()}>Get Recommendations</Button>
      {
        recommendations !== undefined ? handleRecommendedData() : <></>
      }
    </>
  )
}

export default App;
