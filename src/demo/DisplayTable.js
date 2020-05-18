import React, { Component } from 'react'


let id = 0;
function createData(StartTime, EndTime , Topic ,Attacker, Receiver) {
  id += 1;
  return { id, StartTime, EndTime, Topic ,Attacker, Receiver};
}

let rows = [
  createData('StartTime', 'EndTime','Topic','Attacker','Receiver'),
  createData('0:00', '1:33','Education','Audience','Hillary Clinton'),
  createData('1:34', '3:10','Education','Hillary Clinton','Audience'),
  createData('3:11', '5:43','Education','Donald Trump','Audience'),
  createData('5:44', '6:07','Women Rights','Host','Donald Trump'),
  createData('6:08', '7:14','Women Rights','Donald Trump','All'),
  createData('7:15', '7:23','Women Rights','Host','Donald Trump'),
  createData('7:24', '8:08','Women Rights','Donald Trump','All'),
  createData('8:09', '11:00','Women Rights','Hillary Clinton','Audience')

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