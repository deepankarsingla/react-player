import React, { Component } from 'react'


class TagEntry extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.keyPress = this.keyPress.bind(this)

    this.state = {
      isClicked: false,
      value: '',
      tagList: ["Healthcare", "Foreign Policy", "Immigration"]
    }
  }

  getTagName = e => {
    this.props.onSelectedTag(e.target.value);
  }

    handleChange (e) {
      this.setState({ value: e.target.value })
    }

    keyPress (e) {
      if (e.keyCode == 13) {
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
      return (
        <div className='tag-right'>
          <input type='text' value={this.state.value}
                 onChange={this.handleChange}
                 onKeyDown={this.keyPress}
                 type='text' placeholder='Enter Tag'
          />
          <select className='tag-select' name='color4' size='5' multiple onChange={this.getTagName}>
            {this.state.tagList.map(function (todo) {
              return <option key={todo}>{todo}</option>
            })}

          </select>

        </div>
      )
    }
}
export default TagEntry
