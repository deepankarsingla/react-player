import React, { Component } from 'react'


let id = 0;
function createData(StartTime, EndTime , Topic ,Attacker, Receiver) {
  id += 1;
  return { id, StartTime, EndTime, Topic ,Attacker, Receiver};
}

let rows = [
  createData('StartTime', 'EndTime','Topic','Attacker','Receiver'),
  createData('1:04', '5:03','Economy','Joe Biden','Donald Trump'),
  createData('5:04', '6:10','Economy','Joe Biden','Donal Trump'),
  createData('6:11', '9:10','Economy','Joe Biden','Donal Trump'),
  createData('9:11', '9:55','Economy','Joe Biden','Donal Trump'),
];

class DisplayTable extends Component {
  render() {
    return(
      <div>
        <table>
          {rows.map(row => (
            <tr key={row.id}>
              {/*<td>{row.id}</td>*/}
              <td>{row.StartTime}</td>
              <td>{row.EndTime}</td>
              <td>{row.Topic}</td>
              <td>{row.Attacker}</td>
              <td>{row.Receiver}</td>
            </tr>
          ))}
        </table>

      </div>

    )
  }

  }

export default DisplayTable