import { useState } from "react";

const StatisticLine = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
);

//Hay que pasar los props de esta manera, desestructurandolos, para que se renderice correctamente
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = total ? (good - bad) / total : 0;

  const positive = total ? (good / total) * 100 : 0;

  return (
    <>
      <tr>
        <td>
          <StatisticLine text="good" value={good} />
        </td>
      </tr>
      <tr>
        <td>
          <StatisticLine text="neutral" value={neutral} />
        </td>
      </tr>
      <tr>
        <td>
          <StatisticLine text="bad" value={bad} />
        </td>
      </tr>
      <tr>
        <td>
          <StatisticLine text="total" value={total} />
        </td>
      </tr>
      <tr>
        <td>
          <StatisticLine text="average" value={average.toFixed(2)} />
        </td>
      </tr>
      <tr>
        <td>
          <StatisticLine text="positive" value={`${positive.toFixed(2)}%`} />
        </td>
      </tr>
    </>
  );
};

const FeedbackButtons = ({ onGoodClick, onNeutralClick, onBadClick }) => {
  return (
    <>
      <button onClick={onGoodClick}>good</button>
      <button onClick={onNeutralClick}>neutral</button>
      <button onClick={onBadClick}>bad</button>
    </>
  );
};

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);
  const total = good + neutral + bad;

  return (
    <>
      <h1>give feedback</h1>
      <FeedbackButtons
        onGoodClick={handleGoodClick}
        onNeutralClick={handleNeutralClick}
        onBadClick={handleBadClick}
      />
      <h2>statistics</h2>
      {/*Esto de abajo se puede entender como, si total es estrictamente igual a 0, entonces se retorna lo que sigue al simbolo "?", y los dos puntos es un SINO, o sea se ejecutara ese camino en caso de que la condicion sea falsa. */}
      {total === 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          {/*Aca abajo, se pone el nombre del componente que creamos, y ademas se ponen los valores de los props que se le pasan al mismo, para que este los tenga disponibles. A partir de alli se ejecuta el codigo dentro del componente y se calcula lo indicado*/}
          <Statistics good={good} neutral={neutral} bad={bad} />
        </>
      )}
    </>
  );
};
export default App;
