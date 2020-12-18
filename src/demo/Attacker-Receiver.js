import React, { Component } from 'react'

class AttackerReceiver extends Component {
  constructor (props) {
    super(props)
    this.handleChangeAttacker = this.handleChangeAttacker.bind(this)
    this.handleChangeReceiver = this.handleChangeReceiver.bind(this)
    this.keyPressAttacker = this.keyPressAttacker.bind(this)
    this.keyPressReceiver = this.keyPressReceiver.bind(this)
    this.getAttackerName = this.getAttackerName.bind(this)
    this.getReceiverName = this.getReceiverName.bind(this)

    this.state = {
      attackerList: ["All" ,"Host", "Trump", "Joe", "Audience"],
      attacker: '',
      receiverList: ["All", "Host", "Trump", "Joe", "Audience"],
      receiver: '',
      isClickedAttacker: false,
      isClickedReceiver: false
    }
  }

  getAttackerName = e => {
      this.props.onSelectAttacker(e.target.value);
    }

  getReceiverName = e => {
    this.props.onSelectReceiver(e.target.value);
  }

  handleChangeAttacker (e) {
    this.setState({ attacker: e.target.value })
  }

  handleChangeReceiver (e) {
    this.setState({ receiver: e.target.value })
  }

  keyPressAttacker (e) {
    if (e.keyCode == 13) {
      var attackerList = [...this.state.attackerList]
      attackerList.push(e.target.value)
      this.setState({
        attackerList,
        attacker: ''
      })
    }
  }

  keyPressReceiver (e) {
    if (e.keyCode == 13) {
      console.log('value', e.target.value)
      var receiverList = [...this.state.receiverList]
      receiverList.push(e.target.value)
      this.setState({
        receiverList,
        receiver: ''
      })
    }
  }

    render () {
      return (
        <div className='tag-left'>
          <div className='tag-entry-box-attacker'>
            <input type='text' value={this.state.attacker}
                   onChange={this.handleChangeAttacker}
                   onKeyDown={this.keyPressAttacker}
                   type='text' placeholder='Enter Attacker'
            />
            <select className='attacker-select' name='color4' size='5' multiple onChange={this.getAttackerName}>
            {this.state.attackerList.map(function (todo) {
                return <option key={todo}>{todo}</option>
              })}

            </select>
          </div>
          <div className='tag-entry-box-receiver'>
            <input type='text' value={this.state.receiver}
                   onChange={this.handleChangeReceiver}
                   onKeyDown={this.keyPressReceiver}
                   type='text' placeholder='Enter Receiver'
            />
            <select className='receiver-select' name='color4' size='5' multiple onChange={this.getReceiverName}>
              {this.state.receiverList.map(function (todo) {
                return <option key={todo}>{todo}</option>
              })}
            </select>
          </div>
        </div>
      )
    }
}
export default AttackerReceiver