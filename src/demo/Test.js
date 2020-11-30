import React from 'react';
import * as d3 from "d3";
import * as d3Col from 'd3-scale-chromatic';
import ReactDOM from 'react-dom';
// import ParallelAxes from './parallelAxes';
import crossfilter from 'crossfilter';

var colorScale = d3.scaleOrdinal(d3Col.schemeSet1);

const xScaleTime = (props) => {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var todayMillis = today.getTime();
  var min = new Date();
  var max = new Date();
  return d3.scaleTime()
    .domain([min.setTime(todayMillis+props.filter[0].min), max.setTime(todayMillis+props.filter[0].max)])
    .range([props.padding, props.width - 2*props.padding]).nice();
};

const xScaleEq = (props, max) => {
  var maxVal = props.dataCont.length
  if(max > maxVal){
    maxVal = max
  }
  return d3.scaleLinear()
    .domain([0, maxVal])
    .range([props.padding, props.width - 2*props.padding]).nice();
};

const renderLines = (mid, props, scale, yLocs, zoom, bundle ) => {
  return (coords, index) => {

    var p1 = +coords.Attacker-1;
    var p2 = +coords.Victim-1;

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var todayMillis = today.getTime();
    var dt = new Date();
    dt.setTime(todayMillis + coords.Time);

    const lineProps = {
      strokeWidth: 1.5,//zoom > 1.5 ? 1.5 : zoom+0.5,
      fill: 'none',
      stroke: d3Col.schemeSet2[+coords.Attacker-1],
      opacity: 1,
      key: index,
      //    x1: scale(index),
      //    y1: yLocs[+coords.Attacker-1],
      //    x2: scale(index),
      //    y2: yLocs[+coords.Victim-1],
      markerEnd: "url(#arrow"+ coords.Attacker +")",
    }

    var path = d3.line()
      .x(function(d) { return d.x; })
      .y(function(d) { return d.y; }).curve(d3.curveBasis);

    var points = [
      {x: scale(index), y: yLocs[+coords.Attacker-1]},
      {x: scale(index), y: yLocs[+coords.Victim-1]}
    ];

    if(bundle){
      points = [
        {x: scale(index), y: yLocs[+coords.Attacker-1]},
        {x: scale(mid[index].x), y: mid[index].y},
        {x: scale(index), y: yLocs[+coords.Victim-1]}
      ];
    }
    return <path d={path(points)} {...lineProps}/>

  };
};

export default class MusicNotation extends React.Component{

  componentWillMount() {
    this.setState({scaleTime: null, scaleEq: null, yLocs:[], axLabels:[], top:0 , left: 0, anno: null, txtValue: "", childVisible: false, mid: [], bundle: true});
  }

  componentDidMount() {
    this.applyFilter();
    this.forceUpdate();
    var markerNode1 = ReactDOM.findDOMNode(this.refs.marker1)
    markerNode1.setAttribute('markerWidth', 6);
    markerNode1.setAttribute('markerHeight', 4);
    markerNode1.setAttribute('refX', 6.3);
    markerNode1.setAttribute('refY', 2);
    markerNode1.setAttribute('orient', 'auto');
    var markerNode2 = ReactDOM.findDOMNode(this.refs.marker2)
    markerNode2.setAttribute('markerWidth', 6);
    markerNode2.setAttribute('markerHeight', 4);
    markerNode2.setAttribute('refX', 6.3);
    markerNode2.setAttribute('refY', 2);
    markerNode2.setAttribute('orient', 'auto');
    var markerNode3 = ReactDOM.findDOMNode(this.refs.marker3)
    markerNode3.setAttribute('markerWidth', 6);
    markerNode3.setAttribute('markerHeight', 4);
    markerNode3.setAttribute('refX', 6.3);
    markerNode3.setAttribute('refY', 2);
    markerNode3.setAttribute('orient', 'auto');
    var markerNode4 = ReactDOM.findDOMNode(this.refs.marker4)
    markerNode4.setAttribute('markerWidth', 6);
    markerNode4.setAttribute('markerHeight', 4);
    markerNode4.setAttribute('refX', 6.3);
    markerNode4.setAttribute('refY', 2);
    markerNode4.setAttribute('orient', 'auto');

    var markerShadowNode = ReactDOM.findDOMNode(this.refs.markerShadow)
    markerShadowNode.setAttribute('markerWidth', 6);
    markerShadowNode.setAttribute('markerHeight', 4);
    markerShadowNode.setAttribute('refX', 6.3);
    markerShadowNode.setAttribute('refY', 2);
    markerShadowNode.setAttribute('orient', 'auto');

  }

  componentDidUpdate() {
    var e = this.svg;
    if(e) {
      var dim = e.getBoundingClientRect();
      this.state.left = dim.left;
      this.state.top = dim.top;
    }
  }

  componentWillReceiveProps(nextProps) {
    //this.applyFilter();
    if(nextProps.maxLen != this.props.maxLen){
      console.log(nextProps.maxLen)
      var scalingprops = { ...nextProps, width: nextProps.width*nextProps.zoom};
      // this.state.scaleTime = xScaleTime(scalingprops);
      this.state.scaleEq = xScaleEq(scalingprops, this.props.maxLen);
    }
  }

  applyFilter() {
    if(this.props.dataCont != null) {
      var scalingprops = { ...this.props, width: this.props.width*this.props.zoom};
      // this.state.scaleTime = xScaleTime(scalingprops);
      this.state.scaleEq = xScaleEq(scalingprops, this.props.maxLen);
      this.state.axLabels = ["1","2","3","4"];

      this.state.yLocs = [];
      var axDist = (this.props.height - this.props.padding*3)/(4-1);
      var pad = this.props.padding*2;
      for(var i=0; i < 4 ;i++) {
        this.state.yLocs.push(pad + axDist*i);
      }

      if(this.state.bundle){
        var count = 1;
        var data = this.props.dataCont;
        this.state.mid = [];
        var start = 0;
        var stop = 0;
        for(var i=1; i < data.length; i++) {
          if(data[i].Attacker === data[i-1].Attacker && data[i].Victim === data[i-1].Victim) {
            count = count + 1;
          }
          else {
            stop = i - 1;
            var minP = d3.min([this.state.yLocs[+data[i-1].Attacker-1], this.state.yLocs[+data[i-1].Victim-1]]);
            var maxP = d3.max([this.state.yLocs[+data[i-1].Attacker-1], this.state.yLocs[+data[i-1].Victim-1]]);
            var y = minP + Math.abs(maxP - minP)/2;
            if(count > 1) {
              for(var j = i - count; j < i; j++) {
                var xTmp = start + ((stop-start)/2);
                if(this.props.scaleType === "Time") {
                  xTmp = (data[Math.floor(xTmp)].Time + data[Math.ceil(xTmp)].Time)/2;
                }
                this.state.mid.push({
                  x: xTmp,
                  y: y
                });
              }
            }
            else{
              for(var j = i - count; j < i; j++) {
                var xTmp = j;
                if(this.props.scaleType === "Time") {
                  xTmp = data[j].Time;
                }
                this.state.mid.push({
                  x: xTmp,
                  y: y
                });
              }
            }

            start = i;
            count = 1;
          }
        }
        stop = data.length - 1;
        var minP = d3.min([this.state.yLocs[+data[stop].Attacker-1], this.state.yLocs[+data[stop].Victim-1]]);
        var maxP = d3.max([this.state.yLocs[+data[stop].Attacker-1], this.state.yLocs[+data[stop].Victim-1]]);
        var y = minP + Math.abs(maxP - minP)/2;
        for(var j = data.length - count; j < data.length; j++) {
          var xTmp = start + ((stop-start)/2);
          if(this.props.scaleType === "Time") {
            xTmp = (data[Math.floor(xTmp)].Time + data[Math.ceil(xTmp)].Time)/2;
          }
          this.state.mid.push({
            x: xTmp,
            y: y
          });
        }
      }
    }
  }

  onZoomIn() {
    //  var newZ = this.props.zoom + 0.1;
//    this.props.onZoom(newZ);
  }

  onZoomOut() {
    //  var newZ = this.props.zoom - 0.1;
    //  this.props.onZoom(newZ);
  }

  onToggleBundle() {
    var tmp = !this.state.bundle;
    this.setState({bundle: tmp});
  }


  move(dir) {
    this.props.moveGroup(dir, {id:(this.props.subjectName + this.props.groupName),group:this.props.groupName, subject:this.props.subjectName})
  }

  remove() {
    this.props.removeGroup({id:(this.props.subjectName + this.props.groupName),group:this.props.groupName, subject:this.props.subjectName})
  }

  render() {
    this.applyFilter();
    var scale = this.state.scaleEq;
    var color1 = "#1abc9c";
    var color2 = "#00767b";
    return (
      <div style={{borderBottom:"6px solid #111111",background: "#ffffff", height:this.props.height+12+6,}}>
        <div style={{width:100, height:this.props.height+12+6, background: colorScale(this.props.subjectName), float:"left"}}>
          <div>{"Group " + this.props.groupName}</div>
          <button onClick={() => this.move("up")}><i class="fa fa-arrow-up"></i></button>
          <button onClick={() => this.move("down")}><i class="fa fa-arrow-down"></i></button>
          <button onClick={() => this.remove("up")}><i class="fa fa-close"></i></button>
        </div>
        <div style={{width:this.props.width, overflowX: "auto", overflowY: "hidden", background: "#ffffff", padding:0, marginLeft:102}}>
          <svg width={this.props.width*this.props.zoom} height={this.props.height}>
            <marker ref="marker1" id="arrow1">
              <path d="M 0 0 L 6 2 L 0 4 z" fill={d3Col.schemeSet2[0]} />
            </marker>
            <marker ref="marker2" id="arrow2">
              <path d="M 0 0 L 6 2 L 0 4 z" fill={d3Col.schemeSet2[1]} />
            </marker>
            <marker ref="marker3" id="arrow3">
              <path d="M 0 0 L 6 2 L 0 4 z" fill={d3Col.schemeSet2[2]} />
            </marker>
            <marker ref="marker4" id="arrow4">
              <path d="M 0 0 L 6 2 L 0 4 z" fill={d3Col.schemeSet2[3]} />
            </marker>
            <marker ref="markerShadow" id="arrowShadowMusic">
              <path d="M 0 0 L 6 2 L 0 4 z" fill="#a2a2a2" />
            </marker>
            { this.props.dataCont === null
              ? null
              : <g>
                <g className="scatterArea">
                  {this.props.dataCont.map(renderLines(this.state.mid, this.props, scale, this.state.yLocs, this.props.zoom, this.state.bundle))}
                </g>
                {/*<ParallelAxes scales={scale} yLocs={this.state.yLocs} labels={this.state.axLabels} ticks={Math.ceil(this.props.zoom*11)} max={this.props.dataCont.length}/>*/}
              </g>
            }
          </svg>
        </div>
      </div>
    );
  }
}
