import { useState } from "react";
import { Link } from "react-router-dom";

export default function NewPlayerForm ({addPlayer}) {

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [breed, setBreed] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    let newPlayer = {
      name:name,
      imageUrl:imageUrl,
      breed:breed
    };

  

  try{
    const request = await fetch ("https://fsa-puppy-bowl.herokuapp.com/api/2404-FTB-MT-WEB-PT/players",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlayer)
      }
    );
    const response = await request.json();
    if(response) {
      console.log("respons.data is here",response.data.newPlayer)
      addPlayer(response.data.newPlayer);
      setName("");
      setImageUrl("");
      setBreed("")
    } else {
      console.error("Error creating player", response.message)
    }
  } catch(error) {console.error("Error creating a player", error)};

};

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => {setName(e.target.value)}} required/>
      </div>
      <div>
        <label>Image URL:</label>
        <input type="text" value={imageUrl} onChange={(e)=>{setImageUrl(e.target.value)}}/>
      </div>
      <div>
        <label>Breed:</label>
        <input type="text" value={breed} onChange={(e)=>{setBreed(e.target.value)}}/>
      </div>
      <button type="Submit">Create Player</button>

      <Link to={`/`}>
        <button>Home</button></Link>


    </form>
    
  )

}