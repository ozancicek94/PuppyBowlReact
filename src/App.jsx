import { useState, useEffect } from 'react';
import './App.css';
import AllPlayers from './components/AllPlayers';
import {Routes, Route} from "react-router-dom";
import SinglePlayer from './components/SinglePlayer';
import NewPlayerForm from './components/NewPlayerForm';
import { Link } from 'react-router-dom';

function App() {

  const [allPlayers, setAllPlayers] = useState([]);

  useEffect (()=> {
    const fetchAllPlayers = async () => {

      try{
        const request = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2404-FTB-MT-WEB-PT/players");
        const response  = await request.json();
        setAllPlayers(response.data.players);
        

      } catch(error) {console.error("fetchAllPlayers didn't work!", error)}

    };
    fetchAllPlayers()
  }, []);
  console.log(allPlayers);
  const addPlayer = (newPlayer) => {

    setAllPlayers([...allPlayers, newPlayer])

  };

  const deletePuppy = (deletedPuppy) => {

    const filterdPlayersAfterDelete = allPlayers.filter(player => player.id !== deletedPuppy.id);
    setAllPlayers(filterdPlayersAfterDelete);


  }
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<div><Link to={`/newPlayerForm`}>
        <button>Create New Player Form</button></Link><AllPlayers allPlayers={allPlayers} deletePuppy={deletePuppy}/></div>}/>
        <Route path="/details/:id" element={<SinglePlayer />}/>
        <Route path="/newPlayerForm" element={<NewPlayerForm addPlayer={addPlayer} />}/>
      </Routes>
      
     
    </div>
  )
}

export default App
