import React, {Component} from 'react';
import { View, Text, StyleSheet} from 'react-native';

const AppStyles = require("../../assets/App-assets/AppStyles.js");

export default function Ashley(){
    return(
        <View style={AppStyles.styles.HomeSector}>
            <View style={HomeStyle.AboutMe_Profile_Section}>
                <View style={HomeStyle.AboutMe_Profile_Picture}>

                </View>
            </View>
        </View>
    )
}

const HomeStyle = StyleSheet.create({
    AboutMe_Profile_Section:{
        width: '100%',
        height: '30%',
        borderBottomColor: 'black',
        borderBottomWidth: 1.5,
        backgroundColor:'blue',
        justifyContent:'flex-end',
    },
    AboutMe_Profile_Picture:{
        width: '35%',
        height: '80%',
        borderBottomColor: 'black',
        borderWidth: 2,
        backgroundColor:'green',
        left: '1%',
        bottom: '2.5%'
    }
})