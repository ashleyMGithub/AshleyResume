import React, {Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';


const AppStyles = require("../../assets/App-assets/AppStyles.js");

export default function Experience(){
    return(
        <View style={ExperienceStyles.ExperienceContainer}>
            <Text>Experience</Text>
        </View>
    )
}

const ExperienceStyles = StyleSheet.create({
    ExperienceContainer:{
        height: '100%',
        width:'100%',
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
    }
})