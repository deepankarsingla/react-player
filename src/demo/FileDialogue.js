import React, { Component } from 'react'

class FileDialogue extends Component {
    componentDidMount(){
        this.fileSelector = this.buildFileSelector();
    }
    buildFileSelector(){
        const fileSelector = document.createElement('input');
        fileSelector.setAttribute('type', 'file');
        fileSelector.setAttribute('multiple', 'multiple');
        return fileSelector;
    }

    handleFileSelect = (e) => {
        e.preventDefault();
        this.fileSelector.click();
    }

    render(){
        return <a className="button" href="" onClick={this.handleFileSelect}>Select files</a>
    }
}
export default FileDialogue;