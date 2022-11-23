import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'


const Person = ({ person, onClick }) => <li>{person.name} {person.number} <Button text="delete" onClick={onClick} /></li>
const Persons = ({ persons, onClick }) => persons.map(person => <Person key={person.id} person={person} onClick={() => {onClick(person.id)}} />)
const PersonForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <Input label="name:" onChange={props.onNameChange} value={props.nameValue} />
      <Input label="number:" onChange={props.onNumberChange} value={props.numberValue} />
      <div><button type="submit">add</button></div>
    </form>
  )
}
const Input = ({ label, onChange, value }) => {
  return <div>{label}<input onChange={onChange} value={value} /></div>
}
const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [filtered, setFiltered] = useState([]);

  const getAll = () => {
    phonebookService.getAll()
      .then(data => {
        setPersons(data)
        setFiltered(data)
      })
  }

  const addNew = (person) => {
    phonebookService.addNew(person)
      .then(added => {
        const newPersons = persons.concat(added);
        setPersons(newPersons);
        setFiltered(newPersons); // why not setFiltered(persons)?
        setNewName('');
        setNewNumber('');
      })
      .catch(error => {
        console.log(error.response.data.error)
      })
  }

  const deletePerson = id => {
    phonebookService.deletePerson(id)
      .then((_) => {
        setPersons(persons.filter(person => person.id !== id));
        setFiltered(filtered.filter(person => person.id !== id));
      })
  }

  useEffect(getAll, []);
  
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return
    }
    const newPerson = { name: newName, number: newNumber };
    addNew(newPerson);
  }

  const handleFilter = (event) => {
    const input = (event.target.value).toLowerCase();
    setFiltered(persons.filter(person => person.name.toLowerCase().includes(input)))
  }
  const handleNewName = (event) => setNewName(event.target.value);
  const handleNewNumber = (event) => setNewNumber(event.target.value);
  const handleDeleteClick = (id) => {
    const toBeDeleted = getPersonById(id);
    if (window.confirm(`Delete ${toBeDeleted.name}?`)) deletePerson(id);
  }

  const getPersonById = id => {
    return persons.find(person => person.id === id);
  }

  return (
    <div>
      {/* <div>debug: {persons.length}</div> */}
      <h2>Phonebook</h2>
      <Input label='filter shown with' onChange={handleFilter} />
      <h2>add a new</h2>
      <PersonForm
        onSubmit={handleSubmit}
        onNameChange={handleNewName}
        onNumberChange={handleNewNumber}
        nameValue={newName}
        numberValue={newNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={filtered} onClick={handleDeleteClick} />
    </div>
  )
}

export default App