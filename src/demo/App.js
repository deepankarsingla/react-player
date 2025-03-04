import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { hot } from 'react-hot-loader'
import screenfull from 'screenfull'
import TagEntry from './TagEntry'
import AttackerReceiver from './Attacker-Receiver'
import  SaveEntry from "./SaveEntry"
import DisplayTable from './DisplayTable'
import testtable from './testtable'

import './reset.css'
import './defaults.css'
import './range.css'
import './App.css'

import ReactPlayer from '../ReactPlayer'
import Duration from './Duration'
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
    langValue:''
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
    this.setState({ playing: !this.state.playing })
  }

  handleStop = () => {
    this.setState({ url: null, playing: false })
  }

  handleToggleControls = () => {
    const url = this.state.url
    this.setState({
      controls: !this.state.controls,
      url: null
    }, () => this.load(url))
  }

  handleToggleLight = () => {
    this.setState({ light: !this.state.light })
  }

  handleToggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }

  handleVolumeChange = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  handleToggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }

  handleSetPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }

  handleTogglePIP = () => {
    this.setState({ pip: !this.state.pip })
  }

  handlePlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }

  handleEnablePIP = () => {
    console.log('onEnablePIP')
    this.setState({ pip: true })
  }

  handleDisablePIP = () => {
    console.log('onDisablePIP')
    this.setState({ pip: false })
  }

  handlePause = () => {
    console.log('onPause')
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
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  handleEnded = () => {
    console.log('onEnded')
    this.setState({ playing: this.state.loop })
  }

  handleDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }

  handleClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player))
  }

  renderLoadButton = (url, label) => {
    return (
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }

  ref = player => {
    this.player = player
  }

  handleLanguage = (langValue) => {
    console.log("lang...",langValue);
    this.setState({language: langValue});
  }

  render () {
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
              <tr>
                <th>Speed</th>
                <td>
                  <button onClick={this.handleSetPlaybackRate} value={1}>1x</button>
                  <button onClick={this.handleSetPlaybackRate} value={1.5}>1.5x</button>
                  <button onClick={this.handleSetPlaybackRate} value={2}>2x</button>
                </td>
              </tr>
              <tr>
                <th>Volume</th>
                <td>
                  <input type='range' min={0} max={1} step='any' value={volume} onChange={this.handleVolumeChange} />
                </td>
              </tr>
            </tbody>
          </table>
        </section>
{/*<<<<<<< HEAD*/}
{/*<<<<<<< HEAD*/}
          <div>
              <section>
                <td>
                  <AttackerReceiver onSelectLanguage={this.handleLanguage}/></td>
                <tr>
                  <TagEntry />
                  <SaveEntry/>
                </tr>
                <tr>
                  <DisplayTable/>
                </tr>
                <tr>
                  <testtable/>
                </tr>
              </section>
          </div>
{/*=======*/}
{/*=======*/}
{/*>>>>>>> parent of 20badf0... css 2*/}

{/*        <section>*/}
{/*          <td>*/}
{/*            <AttackerReceiver onSelectLanguage={this.handleLanguage}/></td>*/}
{/*          <tr>*/}
{/*            <TagEntry />*/}
{/*            <SaveEntry/>*/}
{/*          </tr>*/}
{/*          <tr>*/}
{/*            <DisplayTable/>*/}
{/*          </tr>*/}

{/*        </section>*/}

{/*<<<<<<< HEAD*/}
{/*>>>>>>> parent of 20badf0... css 2*/}
{/*=======*/}
{/*>>>>>>> parent of 20badf0... css 2*/}
      </div>
    )
  }
}

export default hot(module)(App)
