import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function AllPlayers ({allPlayers, deletePuppy}) {
console.log("Here is allplayers",allPlayers);

const [searchedPuppy, setSearchedPuppy] = useState("");
const [displayPlayers, setDisplayPlayer] = useState(allPlayers);
const [buttonText, setButtonText] = useState("Search");

useEffect(()=> {
  setDisplayPlayer(allPlayers);

}, [allPlayers])

useEffect(()=> {
  // buttonText === "Search" ?

  

}, [displayPlayers])



const handleSubmit = (e) => {

  e.preventDefault();

  const filteredPuppies = allPlayers.filter (player => player.name.toUpperCase().includes(searchedPuppy.toUpperCase()));

  console.log("filtered puppies are here", filteredPuppies);

  setDisplayPlayer(filteredPuppies);

  setSearchedPuppy("");

  setButtonText("Back to All Players");

  if (buttonText === "Back to All Players") {setButtonText("Search")};
  
}

const deletePlayer = async (player) => {

  
  try {
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/2404-FTB-MT-WEB-PT/players/${player.id}`,
      {
        method: 'DELETE',
      }
    );
    const result = await response.json();
    console.log(result);
    deletePuppy(player);
    if (buttonText === "Back to All Players") {setButtonText("Search")};
  } catch (err) {
    console.error(err);
  }

}
  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchedPuppy} onChange={(e)=>{setSearchedPuppy(e.target.value)}}/>
      <button type="submit">{buttonText}</button>
      
    </form>
    <ul className="PuppyGrid">
      {displayPlayers.length>0 && displayPlayers.map(player => (
        <li key={player.id}>{player.name}
        <img src={player.imageUrl} alt={player.name}/>
        <Link to={`/details/${player.id}`}>
        <button>See Details</button></Link>
        <button onClick={() => {deletePlayer(player)}}>Delete Player</button>
        </li>
      ))}
    </ul>
    </div>
  )
}