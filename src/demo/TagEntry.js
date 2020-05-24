import React, { Component } from 'react'


class TagEntry extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.keyPress = this.keyPress.bind(this)

    this.state = {
      isClicked: false,
      value: '',
      tagList: ["Healthcare", "Foreign Policy", "Immigration", "Economy", "Civil Right", "Gun Control", "Climate Change", "Women Right", "Education"]
    }
  }

  getTagName = e => {
    console.log(e.target.value);
    this.props.onSelectedTag(e.target.value);
  }

    addInput = ev => {
      this.setState({ isClicked: true })
    }

    handleChange (e) {
      this.setState({ value: e.target.value })
    }

    keyPress (e) {
      if (e.keyCode == 13) {
        console.log('value', e.target.value)
        var tagList = [...this.state.tagList]
        tagList.push(e.target.value)
        this.setState({
          tagList,
          value: ''
        })
      }
    }

    render () {
      const isClicked = this.state.isClicked
      let button
      if (isClicked) {
        button = <input type='text' value={this.state.value} onChange={this.handleChange} onKeyDown={this.keyPress} />
      }
      return (
        <div className='tag-entry-box'>
          <button onClick={this.addInput}>+</button>
          {button}

          <select name='color4' size='5' multiple onChange={this.getTagName}>
            {this.state.tagList.map(function (todo) {
              return <option key={todo}>{todo}</option>
            })}

          </select>

        </div>
      )
    }
}
export default TagEntry
