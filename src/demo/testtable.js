import {CSVLink, CSVDownload} from 'react-csv';

import React, { Component } from 'react'
const csvData =[
  ['firstname', 'lastname', 'email'] ,
  ['John', 'Doe' , 'john.doe@xyz.com'] ,
  ['Jane', 'Doe' , 'jane.doe@xyz.com']
];
class testtable extends Component {
  render() {
    return(
      <div>
      <CSVLink data={csvData} >Download me</CSVLink>
      </div>

    )
  }

}

export default testtable