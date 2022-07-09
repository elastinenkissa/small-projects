import { useState } from "react";
import Button from "./Button";
import Statistics from "./Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const setGoodHandler = () => {
    setGood((prevGood) => prevGood + 1);
  };

  const setNeutralHandler = () => {
    setNeutral((prevNeutral) => prevNeutral + 1);
  };

  const setBadHandler = () => {
    setBad((prevBad) => prevBad + 1);
  };

  const all = good + neutral + bad;

  //i am sorry if i misunderstood the average
  const average = () => {
    const total = good + bad;
    return good / total;
  };

  const positive = `${(good / all) * 100}%`;

  return (
    <div>
      <h2>give feedback</h2>
      <div>
        <Button onClick={setGoodHandler}>good</Button>
        <Button onClick={setNeutralHandler}>neutral</Button>
        <Button onClick={setBadHandler}>bad</Button>
      </div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average()}
        positive={positive}
      />
    </div>
  );
};

export default App;
