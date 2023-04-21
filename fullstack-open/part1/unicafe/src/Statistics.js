import StatisticLine from "./StatisticLine";

const Statistics = (props) => {
  if (props.all === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>
              <h2>statistics</h2>
            </td>
          </tr>
        </thead>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="all" value={props.all} />
          <StatisticLine text="average" value={props.average} />
          <StatisticLine text="positive" value={props.positive} />
        </tbody>
      </table>
    </>
  );
};

export default Statistics;
