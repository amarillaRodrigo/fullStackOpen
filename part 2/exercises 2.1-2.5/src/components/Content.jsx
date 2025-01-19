import Part from "./Part";

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

export default Content;

//El codigo recibe partes, y renderiza cada una de ellas, teniendo en cuenta el id de cada una de las partes.

