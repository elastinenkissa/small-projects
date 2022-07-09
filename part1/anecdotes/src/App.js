import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];
  const anecdoteVotes = new Uint8Array(anecdotes.length); 

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(anecdoteVotes);
  const [highestElementIndex, setHighestElementIndex] = useState(0);
  
  const anecdoteChangeHandler = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const voteHandler = () => {
    
    setHighestElementIndex(
      votes.indexOf(Math.max(...votes))
    )
    setVotes((prevVotes) => {
      const copy = [...prevVotes]
      copy[selected] += 1
      return copy
    });
  };
  


  return (
    <>
      <div>
        <h2>Anecdotes of the day</h2>
        {anecdotes[selected]}
        <div>has {votes[selected]} votes</div>
        <div>
          <button onClick={voteHandler}>vote</button>
          <button onClick={anecdoteChangeHandler}>next anecdote</button>
        </div>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        {anecdotes[highestElementIndex]}
        <div>has {votes[highestElementIndex]} votes</div>
      </div>
    </>
  );
};

export default App;
