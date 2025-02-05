import { useState, useEffect } from "react";
import noteService from "./services/note";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({ message: null, type: '' });

  useEffect(() => {
    noteService.getAll().then(initialPersons => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handlePhoneChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personExists = persons.find((person) => person.name === newName);
    if (personExists) {
      const updatedPerson = { ...personExists, number: newNumber };
      noteService.update(personExists.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== personExists.id ? person : returnedPerson));
          setNewName("");
          setNewNumber("");
          setNotification({ message: `Updated ${returnedPerson.name}`, type: 'success' });
          setTimeout(() => {
            setNotification({ message: null, type: '' });
          }, 5000);
        })
        .catch(error => {
          setNotification({ message: `Error: ${personExists.name} was already removed from server`, type: 'error' });
          setTimeout(() => {
            setNotification({ message: null, type: '' });
          }, 5000);
          setPersons(persons.filter(p => p.id !== personExists.id));
        });
    } else {
      const newPerson = { name: newName, number: newNumber };
      noteService.create(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
        setNotification({ message: `Added ${returnedPerson.name}`, type: 'success' });
        setTimeout(() => {
          setNotification({ message: null, type: '' });
        }, 5000);
      });
    }
  };

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      noteService.remove(id).then(() => {
        setPersons(persons.filter(p => p.id !== id));
      });
    }
  };

  const personsToShow = filter
    ? persons?.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <Filter value={filter} onChange={handleFilterChange} />
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      {persons ? (
        <Persons persons={personsToShow} onDelete={deletePerson} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
