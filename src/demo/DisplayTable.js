import React, { Component } from 'react'

class DisplayTable extends Component {
  render() {
    console.log(this.props.rows);
    return(
      <div>
        <table class="beta">
          {this.props.rows.map(row => (
            <tr key={row.id}>
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