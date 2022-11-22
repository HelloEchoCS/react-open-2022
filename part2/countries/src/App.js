import axios from 'axios';
import React, { useState, useEffect } from 'react';

// Components
const TextInput = ({ label, onChange, value }) => {
  return <label>{label}<input onChange={onChange} value={value} /></label>
}

const Country = ({ country, onClick, idx }) => <li>{country.name.common}<ShowBtn onClick={onClick} idx={idx} /></li>
const Countries = ({ countries, onClick }) => {
  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />
  } else {
    return countries.map((country, idx) => <Country key={country.cca2} country={country} onClick={onClick} idx={idx} />);
  }
}
const CountryDetails = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages</h3>
      {Object.values(country.languages).map(name => {
        return <ul key={name}>{name}</ul>
      })}
      <img src={country.flags.png} alt=''></img>
    </>
  )
}
const NotifyArea = ({ message }) => <p>{message}</p>
const ShowBtn = ({ onClick, idx }) => <button onClick={onClick} idx={idx}>show</button>

// App
function App() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [newValue, setNewValue] = useState('');
  const [newMsg, setMsg] = useState('');

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }

  useEffect(hook, []);

  const matchCountries = (input) => {
    return countries.filter(country => country.name.common.toLowerCase().includes(input.toLowerCase()));
  }

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const matched = matchCountries(inputValue);
    if (inputValue.length === 0) {
      setFiltered([]);
      setMsg('');
    } else if (matched.length <= 10) {
      setMsg('');
      setFiltered(matched);
    } else {
      setFiltered([]);
      setMsg('Too many matches, specify another filter')
    }
    setNewValue(inputValue);
  }

  const handleClick = (event) => {
    event.preventDefault();
    const index = Number(event.target.getAttribute('idx'))
    setFiltered([filtered[index]]);
  }

  return (
    <div>
      <TextInput label="find countries" onChange={handleChange} value={newValue} />
      <NotifyArea message={newMsg} />
      <Countries countries={filtered} onClick={handleClick} />
    </div>
  )
}

export default App;
