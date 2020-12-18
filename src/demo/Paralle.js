import React  from 'react';
import Axis   from './axis';


const renderAxes = (props) => {
  return (d, i) => {
    console.log("d", i);
    const axSettings = {
      translate: `translate(0,${props.yLocs[i]})`,
      scale: props.scales,
      orient: 'bottom',
      name: d,
      txtX: "10",
      txtY: "0",
      key: i,
    };
    return <Axis {...axSettings}/>;
  };
};

export default class ParallelAxes extends React.Component {

  render(){

    return(
      <g className="xy-axis">
        {this.props.labels.map(renderAxes(this.props))}
      </g>
    );
  }
}