const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => {
      return <Part key={part.id} part={part} />;
    })}
  </>
);

const Course = ({ courses }) => {

    return (
      <>
        {courses.map((course) => {
          const totalSum = course.parts.reduce((sum, part) => {
            return (sum += part.exercises);
          }, 0)
          return (
            <div key={course.id}>
              <Header course={course.name} />
              <Content parts={course.parts} />
              <Total sum={totalSum} />
            </div>
          );
        })}
      </>
    );
  };

  export default Course;