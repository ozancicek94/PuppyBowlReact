import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SinglePlayer () {
  const {id} = useParams();
  const [singlePlayer, setSinglePlayer] = useState({});


useEffect(()=> {
  const fetchPlayerDetails = async() => {

    try {
      const request = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2404-FTB-MT-WEB-PT/players/${id}`);
      const response = await request.json();
      console.log(response.data);
      setSinglePlayer(response.data.player);
    } catch(error) {console.error("fetchPlayerDetails did not work!", error)}

  };
  fetchPlayerDetails(id)
}, [id]);

// if (!singlePlayer) return <div>Loading...</div>;

return (
  <div>
    <h1>{singlePlayer.name}</h1>
    <img src={singlePlayer.imageUrl} alt={singlePlayer.name}/>
    
    <p>{singlePlayer.breed}</p>
    <Link to={`/`}>
        <button>Home</button></Link>

  </div>
)}