import React, { Component } from 'react'
import { Switch } from 'react-native'


export default class SwitchButton extends Component{
    render(){
        console.log(this.props)
        return(
            <Switch
                trackColor={{false: "#767577", true: "#00FF00" }}
                thumbColor={"white"}
                ios_backgroundColor="#f5dd4b"
                onValueChange={this.props.switchFunction(!this.props.isActive)}
                value={this.props.isActive}

            />
        )
    }
}
