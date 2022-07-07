import Part from "./Part";

const Content = props => {
  return (
    <>
      <Part part={props.exercises[0].name} exercise={props.exercises[0].exercises}/>
      <Part part={props.exercises[1].name} exercise={props.exercises[1].exercises}/>
      <Part part={props.exercises[2].name} exercise={props.exercises[2].exercises}/>
    </>
  );
};

export default Content;