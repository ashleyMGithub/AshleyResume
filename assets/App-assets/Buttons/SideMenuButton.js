import React, { Component } from 'react'
import {View, Pressable, StyleSheet, Text, TouchableOpacity} from 'react-native'

//importing switch button
import SwitchButton from './SwitchButton'


export default class SideMenuButton extends Component{
    render(){
        let titleView = (this.props.type == "BUTTON") ?
                        <TouchableOpacity style={SMBStyle.ElementTextArea} onPress={() => this.props.pressFunction}>
                            <Text>{this.props.caption}</Text>
                        </TouchableOpacity> : 
                        <View style={SMBStyle.ElementTextArea}>
                            <Text>{this.props.caption}</Text>
                        </View>
        let second_view =   (this.props.sign == "SWITCH") ?
                            <SwitchButton isActive={this.props.isActive} switchFunction={this.props.switchFunction}/> :
                            undefined
        console.log(this.props)
        console.log(second_view)
        return(
            <View style={SMBStyle.ButtonContainer}>
                <View style={SMBStyle.ElementContainer}>
                    {titleView}
                    <View style={SMBStyle.ElementButtonArea}>
                        {second_view}
                    </View>
                </View>
            </View>
        )
    }
    
}

const SMBStyle = StyleSheet.create({
    ButtonContainer:{
        height: '10%',
        width: '100%',
    },
    ElementContainer:{
        height:'100%',
        width:'100%',
        paddingLeft: '2.5%',
        flexDirection:'row',
        justifyContent:'space-around'
    },
    ElementTextArea:{
        height:'100%',
        width:'70%',
        justifyContent:'center',
    },
    ElementButtonArea:{
        height:'100%',
        width:'30%',
        justifyContent:'center',
        alignItems:'center',
    }
})
