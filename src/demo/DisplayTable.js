import React, { Component } from 'react'

class DisplayTable extends Component {
  render() {
    return(
      <div className='display-table'>
        <table class="beta">
            <tr>
              <th>StartTime</th>
              <th>EndTime</th>
              <th>Topic</th>
              <th>Attacker</th>
              <th>Victim</th>
            </tr>
          {this.props.rows.map(row => (
            <tr key={row.id}>
              <td>{row.StartTime}</td>
              <td>{row.EndTime}</td>
              <td>{row.Topic}</td>
              <td>{row.Attacker}</td>
              <td>{row.Victim}</td>
            </tr>
          ))}
        </table>

      </div>

    )
  }

  }

export default DisplayTable