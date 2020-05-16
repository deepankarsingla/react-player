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
    )
  }

  }


  // constructor(props){
  //   super(props);
  //   this.state = {size: 3}
  // }
  // render(){
  //   let rows = [];
  //   for (var i = 0; i < this.state.size; i++){
  //     let rowID = `row${i}`
  //     let cell = []
  //     for (var idx = 0; idx < this.state.size; idx++){
  //       let cellID = `cell${i}-${idx}`
  //       cell.push(<td key={cellID} id={cellID}></td>)
  //     }
  //     rows.push(<tr key={i} id={rowID}>{cell}</tr>)
  //   }
  //   return(
  //     <div className="container">
  //       <div className="row">
  //         <div className="col s12 board">
  //           <table id="simple-board">
  //             <tbody>
  //             {rows}
  //             </tbody>
  //           </table>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

export default DisplayTable