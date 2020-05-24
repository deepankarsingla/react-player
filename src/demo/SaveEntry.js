import React, { Component } from 'react'

class SaveEntry extends Component {
  constructor (props) {
    super(props)
    this.sendDataToTable = this.sendDataToTable.bind(this)
  }
  sendDataToTable = ev => {
    this.props.onSendData(true)
  }

  render () {
    return (

      <div className='save-button'>
        <button onClick={this.sendDataToTable}>Tag</button>
        <button onClick={this.addInput}>Save</button>
      </div>
    )
  }
}
export default SaveEntry