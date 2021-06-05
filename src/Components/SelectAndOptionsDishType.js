import './SelectAndOptionsDishType.css';
import React, { useState } from 'react';

function SelectAndOptionsDishType() {

  const [showPizzaInput, setShowPizzaInput] = useState(false);
  const [showSoupInput, setShowSoupInput] = useState(false);
  const [showSandwishInput, setShowSandwishInput] = useState(false);
  const [nameDish, setNameDish] = useState("");
  const [timePreparation, setTimePreparation] = useState('00:00:00');
  const [choosenDish, setChoosenDish] = useState("");
  const [choosenSlices, setChoosenSlices] = useState("");
  const [choosenDiameter, setChoosenDiameter] = useState("");
  const [choosenSpiciness, setChoosenSpiciness] = useState("");
  const [choosenSlicesOfBread, setChoosenSlicesOfBread] = useState("");
  

  const resetData = () => {
    setChoosenSlices(null)
    setChoosenDiameter(null)
    setChoosenSpiciness(null)
    setChoosenSlicesOfBread(null)
  }

  const submitData = (e) => {
    e.preventDefault();
    resetData();
    fetch("https://frosty-wood-6558.getsandbox.com:443/dishes", {
      method: 'POST',
      body: JSON.stringify({
      name: nameDish,
      preparation_time: timePreparation,
      type: choosenDish,
      no_of_slices: Number(choosenSlices),
      diameter: Number(choosenDiameter),
      spiciness_scale: Number(choosenSpiciness),
      slices_of_bread: Number(choosenSlicesOfBread),
    }),
      headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(data => data.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))

  }

  const chooseDish = (e) => {
    setShowPizzaInput(e.target.value === "pizza");
    setShowSoupInput(e.target.value === "soup");
    setShowSandwishInput(e.target.value === "sandwich")
    setChoosenDish(e.target.value)
  }

  return(
    <form onSubmit={submitData}>
      <input className="input-name" onInput={e => setNameDish(e.target.value)} type='text' placeholder={"name"}></input>
      <p>Time preparation</p>
      <input className="input-time" onInput={e => setTimePreparation(e.target.value)} type='text' step="1" required pattern="\d\d:\d\d:\d\d" placeholder="00:00:00"></input>
      <select onChange={chooseDish} placeholder={"select dish type"} value={choosenDish}>
          <option style={{display: 'none'}} value="">Please Choose Dish Type</option>
          <option value="pizza">Pizza</option>
          <option value="soup">Soup</option>
          <option value="sandwich">Sandwich</option>
      </select>
      {showPizzaInput && <input onInput={e => setChoosenSlices(e.target.value)} type="number" placeholder="Numbers of slices" />}
      {showPizzaInput && <input onInput={e => setChoosenDiameter(e.target.value)}type="number" step="0.01" placeholder="diameter" />}
      {showSoupInput && 
        <div className="spiciness-scale">
          <input className="inputSpiciness" onChange={e => setChoosenSpiciness(e.target.value)}type="range" min="0" max="9" name="spiciness" />
          <label htmlFor="spiciness">spiciness scale</label>
        </div> 
      }
      {showSandwishInput && <input onInput={e => setChoosenSlicesOfBread(e.target.value)} type="number" placeholder="slices of bread" />}
      <button className="btnSubmitData" type="submit">submit</button>
    </form>
  )
  } 
  
  export default SelectAndOptionsDishType;