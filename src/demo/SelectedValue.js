import React, { Component } from 'react'
import TagEntry from './TagEntry'
import AttackerReceiver from './Attacker-Receiver'

class SelectedValue extends Component {
  constructor (props) {
    super(props)
    this.collectTags = this.collectTags.bind(this)
    this.collectAttacker = this.collectAttacker.bind(this)
    this.collectReceiver = this.collectReceiver.bind(this)

    this.state = {
      selectedTags: [],
      selectedAttacker : [],
      selectedReceiver: []
    }
  }

    render () {
      return (
        <div>
          <TagEntry collectTags={this.state.collectTags} />
          <AttackerReceiver collectAttacker/>
        </div>
      )
    }

}
export default SelectedValue;


