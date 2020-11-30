import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { hot } from 'react-hot-loader'
import screenfull from 'screenfull'
import TagEntry from './TagEntry'
import AttackerReceiver from './Attacker-Receiver'
import  SaveEntry from "./SaveEntry"
import DisplayTable from './DisplayTable'
import MusicNotation from './Test'
import './reset.css'
import './defaults.css'
import './range.css'
import './App.css'

import ReactPlayer from '../ReactPlayer'
import Duration from './Duration'
import { CSVLink, CSVDownload } from "react-csv";
import Bubble from './Bubble'

let id = 0;
function createData(StartTime, EndTime , Topic ,Attacker, Receiver) {
  id += 1;
  return { id, StartTime, EndTime, Topic ,Attacker, Receiver};
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
    attackerList:[],
    receiverList:[],
    tagList:[],
    isSendingData:false,
    rows:[createData('StartTime', 'EndTime','Topic','Attacker','Receiver')],
    startTime:0,
    endTime:0
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

  handleStop = () => {
    this.setState({ url: null, playing: false })
  }

  handleVolumeChange = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  handleSetPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) })
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

  handleClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player))
  }

  ref = player => {
    this.player = player
  }



  handleSendingData = (e) => {
    const value =  this.state.receiverList && this.state.receiverList.length>0 && this.state.attackerList &&this.state.attackerList.length>0;
    let rows = [...this.state.rows];
    let len1 = this.state.attackerList.length;
    let len2 = this.state.receiverList.length;
    let len3 = this.state.tagList.length;

    if(value){
      rows.push(createData(fancyTimeFormat(this.state.startTime), fancyTimeFormat(this.state.endTime), this.state.tagList[len3-1], this.state.attackerList[len1-1], this.state.receiverList[len2-1]));
    }
    this.setState({
      rows
    })
  }

  handleAttacker = (attacker) => {
    let attackerList = [...this.state.attackerList]
    attackerList.push(attacker)
    this.setState({
      attackerList
    })
  }

  handleReceiver = (receiver) => {
    console.log("lang...",receiver);
    let receiverList = []
    receiverList.push(receiver)
    this.setState({
      receiverList
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
    console.log("here......");
    var filter = [[1000,2000]];
    const rawdata = [{v:33}, {v:10}, {v:6}]
    const data = [
      {"id": "1", "Start": "100", "Topic" : "Policy", "Attacker": "1", "Victim": "2"},
      {"id": "2", "Start": "110", "Topic" : "Policy", "Attacker": "2", "Victim": "3"},
      {"id": "3", "Start": "120", "Topic" : "Policy", "Attacker": "5", "Victim": "1"},
      {"id": "4", "Start": "130", "Topic" : "Policy", "Attacker": "6", "Victim": "4"}
      ]
    const { url, playing, controls, light, volume, muted, loop, played, duration, playbackRate, pip } = this.state
    return (
      <div className='app'>
        <section className='section'>
          <h1>Online Debate Analytics</h1>
          <div>
            <span>Custom URL</span>
            <div>
              <input className="url-input-box" ref={input => { this.urlInput = input }} type='text' placeholder='Enter URL' />
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

          <table>
            <tbody>
              <tr>
                <th>Seek</th>
                <td>
                  <progress max={1} value={played} />
                  <input
                    type='range' min={0} max={0.999999} step='any'
                    value={played}
                    onMouseDown={this.handleSeekMouseDown}
                    onChange={this.handleSeekChange}
                    onMouseUp={this.handleSeekMouseUp}
                    onInput={this.outputValue}
                  />
                  <output name='ageOutputName' id='ageOutputId'>Time : <Duration seconds={duration * played} /></output>
                </td>
              </tr>
              <tr>
                <th>Controls</th>
                <td>
                  <button onClick={this.handleStop}>Stop</button>
                  <button onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
                  <button onClick={this.handleClickFullscreen}>Fullscreen</button>
                  {light &&
                    <button onClick={() => this.player.showPreview()}>Show preview</button>}
                  {ReactPlayer.canEnablePIP(url) &&
                    <button onClick={this.handleTogglePIP}>{pip ? 'Disable PiP' : 'Enable PiP'}</button>}
                </td>
              </tr>
            </tbody>
          </table>
        </section>
          <div>
            <MusicNotation dataCont={data} height={400} width={400}

                           maxlen={200} zoom={5} padding={5}
            >


            </MusicNotation>
            {/*<Bubble useLabels data={rawdata} />*/}
              {/*<section>*/}
              {/*  <td>*/}
              {/*    <AttackerReceiver onSelectAttacker={this.handleAttacker} onSelectReceiver={this.handleReceiver}/></td>*/}
              {/*  <tr>*/}
              {/*    <TagEntry onSelectedTag={this.handleTags}/>*/}
              {/*    <SaveEntry onSendData={this.handleSendingData}/>*/}

              {/*  </tr>*/}
              {/*  <CSVLink data={this.state.rows}>Save (As CSV)</CSVLink>*/}

              {/*  <tr>*/}
              {/*    <DisplayTable rows={this.state.rows} />*/}

              {/*  </tr>*/}
              {/*</section>*/}
          </div>
      </div>
    )
  }
}

export default hot(module)(App)
