const StatisticLine = (props) => {
  return (
    <tr>
      <td>
        {props.text} {props.value}
      </td>
    </tr>
  );
};

export default StatisticLine;
