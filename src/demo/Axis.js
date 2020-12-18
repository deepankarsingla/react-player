import React from 'react';
import * as d3 from "d3";

export default class Axis extends React.Component {
  componentDidMount() {
    this.renderAxis();
  }

  componentDidUpdate() {
    this.renderAxis();
  }

  renderAxis() {
    var node  = this.refs.axis;
    switch(this.props.orient) {
      case "left": {
        var axis = d3.axisLeft(this.props.scale);
        break;
      }
      case "bottom": {
        var axis = d3.axisBottom(this.props.scale);
        break;
      }
      case "bottomEx": {
        var axis = d3.axisBottom(this.props.scale).tickValues([this.props.min,this.props.max]);
        break;
      }
    }

    d3.select(node).call(axis);
  }

  render() {
    return <g className="axis" ref="axis" transform={this.props.translate}><text x={this.props.txtX} y={this.props.txtY} fill="black" fontSize="16"  strokeWidth="0.5" stroke="#000000">{this.props.name}</text></g>
  }
}