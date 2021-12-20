import React, { Component } from 'react'

export default class SliderNodes extends Component{
    constructor(props){
        super(props);
        this.state={
            previousNode: this.props.previousNode,
            nextNode: this.props.nextNode,
            nextSlide: this.props.nextSlide,
            previousSlide: this.props.previousSlide,
        }
    }
}
