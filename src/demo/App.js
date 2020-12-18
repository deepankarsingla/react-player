import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { hot } from 'react-hot-loader'
import screenfull from 'screenfull'
import TagEntry from './TagEntry'
import AttackerReceiver from './Attacker-Receiver'
import  SaveEntry from "./SaveEntry"
import DisplayTable from './DisplayTable'
import OverviewGridHist from './Balloon'

import './reset.css'
import './defaults.css'
import './range.css'
import './App.css'

import ReactPlayer from '../ReactPlayer'
import Duration from './Duration'
import { CSVLink, CSVDownload } from "react-csv";
import Bubble from './Bubble'
import MusicNotation from './MusicPlot'
import RankLine from './RankFile'

let id = 0;
function createData(StartTime, EndTime , Topic ,Attacker, Victim) {
  id += 1;
  return { id, StartTime, EndTime, Topic ,Attacker, Victim};
}

function fancyTimeFormat(time)
{
  // Hours, minutes and seconds
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
}

class App extends Component {
  state = {
    url: 'https://www.youtube.com/watch?v=FRlI2SQ0Ueg',
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false,
    langValue:'',
    attackerList:["All", "Host", "Trump", "Joe", "Audience"],
    receiverList:["All", "Host", "Trump", "Joe", "Audience"],
    tmpAttackerList:[],
    tmpReceiverList:[],
    participants:new Set(["All", "Host", "Trump", "Joe", "Audience"]),
    tagList:[],
    isSendingData:false,
    rows:[],
    startTime:0,
    endTime:0,
    ondition: true
  }

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    })
  }


  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing,
      startTime: this.state.endTime+1,
      endTime: this.state.duration * this.state.played

    })
  }

  handleClick=(condition) =>{
    this.setState( {condition} )
  }

  handleTogglePIP = () => {
    this.setState({ pip: !this.state.pip })
  }

  handlePlay = () => {
    this.setState({ playing: true })
  }

  handleEnablePIP = () => {
    this.setState({ pip: true })
  }

  handleDisablePIP = () => {
    this.setState({ pip: false })
  }

  handlePause = () => {
    this.setState({ playing: false })
  }

  handleSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  handleSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  handleSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  handleProgress = state => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  handleEnded = () => {
    this.setState({ playing: this.state.loop })
  }

  handleDuration = (duration) => {
    this.setState({ duration })
  }

  ref = player => {
    this.player = player
  }



  handleSendingData = (e) => {
    console.log("this.state.tmpAttackerList.......",this.state.tmpAttackerList);
    console.log("this.state.tmpReceiverList.......",this.state.tmpReceiverList);
    const value =  this.state.tmpAttackerList && this.state.tmpAttackerList.length>0
      && this.state.tmpReceiverList && this.state.tmpReceiverList.length>0;
    let rows = [...this.state.rows];
    let len1 = this.state.attackerList.length;
    let len2 = this.state.receiverList.length;
    let len3 = this.state.tagList.length;

    if(value){
      console.log("this.state.tmpAttackerList.......",this.state.tmpAttackerList);
      console.log("this.state.tmpReceiverList.......",this.state.tmpReceiverList);
      for(let i=0; i<this.state.tmpAttackerList.length; i++){
        for(let j=0; j<this.state.tmpReceiverList.length; j++){
          rows.push(createData(fancyTimeFormat(this.state.startTime), fancyTimeFormat(this.state.endTime),
            this.state.tagList[len3-1], this.state.tmpAttackerList[i], this.state.tmpReceiverList[j]));
        }
      }
    }
    this.setState({
      rows,
      tmpAttackerList: [],
      tmpReceiverList:[]
    })
  }

  handleAttacker = (attacker) => {
    let attackerList = [...this.state.attackerList]
    attackerList.push(attacker)
    let tmpAttackerList = [...this.state.tmpAttackerList]
    tmpAttackerList.push(attacker)
    this.setState({
      attackerList,
      tmpAttackerList,
      participants: new Set(this.state.participants).add(attacker)
    })
  }

  handleReceiver = (receiver) => {
    let receiverList = []
    receiverList.push(receiver)
    let tmpReceiverList = [...this.state.tmpReceiverList];
    tmpReceiverList.push(receiver);

    this.setState({
      receiverList,
      tmpReceiverList,
      participants: new Set(this.state.participants).add(receiver)
    })
  }

  handleTags= (tag) => {
    let tagList = []
    tagList.push(tag)
    this.setState({
      tagList
    })

  }


  render () {
    const { url, playing, controls, light, volume, muted, loop, played, duration, playbackRate, pip } = this.state
    const { condition } = this.state;
    const data = [
      {"id": "1", "Topic" : "Policy", "Attacker": "1", "Victim": "2"},
      {"id": "2",  "Topic" : "Policy", "Attacker": "1", "Victim": "2"},
      {"id": "3",  "Topic" : "Policy", "Attacker": "1", "Victim": "2"},
      // {"id": "4", "Start": "108", "Topic" : "Policy", "Attacker": "1", "Victim": "2"},
      // {"id": "5", "Start": "150", "Topic" : "Policy", "Attacker": "1", "Victim": "2"},
      //
      // {"id": "5", "Start": "120", "Topic" : "Policy", "Attacker": "2", "Victim": "3"},
      // {"id": "7", "Start": "150", "Topic" : "Policy", "Attacker": "3", "Victim": "1"},
      // {"id": "8", "Start": "200", "Topic" : "Policy", "Attacker": "4", "Victim": "5"},
      // {"id": "9", "Start": "100", "Topic" : "Policy", "Attacker": "1", "Victim": "5"},
      // {"id": "10", "Start": "100", "Topic" : "Policy", "Attacker": "1", "Victim": "6"},
    ]
    var filter = [[1000,2000]];
    return (
      <div className='app'>
        <div className='page-left'>
          <div className='header'>
            <div className='project-name-left'>Debate Analytics</div>
            <div className='url-box-right'>
              <input className='url-input-box' ref={input => { this.urlInput = input }} type='text'
                     placeholder='Enter URL'/>
              <button onClick={() => this.setState({ url: this.urlInput.value })}>Load</button>
            </div>
          </div>
          <div className='player-wrapper'>
            <ReactPlayer
              ref={this.ref}
              className='react-player'
              width='100%'
              height='100%'
              url={url}
              pip={pip}
              playing={playing}
              controls={controls}
              light={light}
              loop={loop}
              playbackRate={playbackRate}
              volume={volume}
              muted={muted}
              onReady={() => console.log('onReady')}
              onStart={() => console.log('onStart')}
              onPlay={this.handlePlay}
              onEnablePIP={this.handleEnablePIP}
              onDisablePIP={this.handleDisablePIP}
              onPause={this.handlePause}
              onBuffer={() => console.log('onBuffer')}
              onSeek={e => console.log('onSeek', e)}
              onEnded={this.handleEnded}
              onError={e => console.log('onError', e)}
              onProgress={this.handleProgress}
              onDuration={this.handleDuration}
            />
          </div>
          <div className='player'>
            <div className='player-seek'>
              <input
                type='range' min={0} max={0.999999} step='any'
                value={played}
                onMouseDown={this.handleSeekMouseDown}
                onChange={this.handleSeekChange}
                onMouseUp={this.handleSeekMouseUp}
                onInput={this.outputValue}
              />
              <output name='ageOutputName' id='ageOutputId'>Time : <Duration seconds={duration * played} /></output>
            </div>
            <div className='player-button'>
              <button onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
              {light &&
              <button onClick={() => this.player.showPreview()}>Show preview</button>}
              {ReactPlayer.canEnablePIP(url) &&
              <button onClick={this.handleTogglePIP}>{pip ? 'Disable PiP' : 'Enable PiP'}</button>}
            </div>
          </div>
          <div className='add-tag'>
            <AttackerReceiver onSelectAttacker={this.handleAttacker} onSelectReceiver={this.handleReceiver}/>
            <TagEntry onSelectedTag={this.handleTags}/>
          </div>
          <div className='add-tag-button'>
            <SaveEntry onSendData={this.handleSendingData}/>
            <CSVLink data={this.state.rows}>Save (As CSV)</CSVLink>
          </div>
        </div>
        <div className='page-right'>
          {/*// <RankLine data={this.state.rows} height={450} width ={650} padding={70} />*/}

          <div className='plot'>
            <button onClick={() => this.handleClick(true)}>Music Notation</button>
            <button onClick={() => this.handleClick(false)}>Balloon Plot</button>
            {condition === true ?

              <OverviewGridHist dataCont={this.state.rows} height={400} width ={600} padding={65}
              participants={this.state.participants}
              selected={[1,2]}
              />
              :
              <MusicNotation
              dataCont={this.state.rows}
              participants={this.state.participants}
              height={300}
              width={680}
              maxlen={600}
              zoom={1}
              padding={1}


              />
            }
          </div>
          <DisplayTable rows={this.state.rows} />




        </div>
      </div>
    )
  }
}

export default hot(module)(App)
