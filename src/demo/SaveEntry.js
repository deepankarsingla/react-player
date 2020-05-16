import React, { Component } from 'react'

class SaveEntry extends Component {
  constructor (props) {
    super(props)
    this.addInput = this.addInput.bind(this)
  }
  addInput = ev => {
    console.log("adding");
  }

  render () {
    return (
      <div className='save-button'>
        <button onClick={this.addInput}>Save</button>
      </div>
    )
  }
}
export default SaveEntry
