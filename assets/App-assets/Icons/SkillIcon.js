import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export function SkillIcon(customStyle=undefined, caption){
    let chosenStyle = (customStyle==undefined) ? styles : customStyle
    let ElementKey = Math.random().toString()
    return(
        <View style={styles.SkillIconArea} key={ElementKey}>
            <View style={styles.SkillIconCanvasOuter}>
                <View style={styles.SkillIconCanvasInner}>
            
                </View>
            </View>
            <View style={styles.SkillIconCanvasTextArea}>
                <Text adjustsFontSizeToFit>{caption}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    SkillIconArea:{
        height: '100%',
        width: '33%',
        alignItems:'center',
        justifyContent:'center',
        //backgroundColor:'red'
    },
    SkillIconCanvasOuter:{
        borderRadius: 6,
        backgroundColor: 'white',
        shadowOffset:{
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.35,
        shadowRadius: 6,
        elevation: 10,
        height: '70%',
        width: '85%',
        alignItems:'center',
        justifyContent:'center',
    },
    SkillIconCanvasInner:{
        borderRadius: 6,
        backgroundColor: 'black',
        height:'90%',
        width:'90%',
        alignItems:'center',
        justifyContent:'center',
    },
    SkillIconCanvasTextArea:{
        height:'20%',
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        marginTop:'5%',
        //backgroundColor:'green'
    }
})