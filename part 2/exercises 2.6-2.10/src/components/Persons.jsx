import Person from "./Person";

const Persons = ({ persons }) => (
  <ul>
    {persons.map((person, index) => (
      <Person key={index} person={person} />
    ))}
  </ul>
);

export default Persons;
