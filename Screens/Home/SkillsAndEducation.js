import React, {Component, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, TouchableOpacity} from 'react-native';

const AppStyles = require("../../assets/App-assets/AppStyles.js");
const DimData = Dimensions.get("window")
const skillTabAmount = 2;
var skillTab_preset = []

class Skills extends Component{
    constructor(props){
        super(props);
        this.state={
            activeSkillTab: 'SkillTab-0',
            skillTab:{
                technical:{backgroundColor:'white'},
                people:{backgroundColor:'grey'},
                business:{backgroundColor:'grey'},
            }
        }
    }

    selectSkillTab(keyProp){
        console.log(this.state.skillTab)
        this.setSkillTab(keyProp)
        this.setState({
            skillTab:{people:{backgroundColor:'red'}}
        })
        console.log(this.state.skillTab)
    }
    
    setTabColour(keyProp){
        return (keyProp==this.state.activeSkillTab) ? 'white' : 'grey'
    }
    
    getSkillTab(ElementKey, last=false, title=""){
        let TabStyle = (last == false) ? SkillStyle.SE_Container_TabBar_Tab : SkillStyle.SE_Container_TabBar_Tab_Last
        return(
            <TouchableOpacity style={[TabStyle, {backgroundColor: this.setTabColour(ElementKey)}]} key={ElementKey} keyProp={ElementKey} onPress={() => this.componentDidMount()}>
                <Text>{title}</Text>
            </TouchableOpacity>
        )
    }
    
    CreateSkillTabs(SkillData){
        if(skillTab_preset.length!=0){
            return skillTab_preset
        }
        let view = []
        for(let index=0; index<skillTabAmount; index++){
            view.push(this.getSkillTab("SkillTab-"+index, false, SkillData.SkillType[index].name))
        }
        view.push(this.getSkillTab("SkillTab-"+skillTabAmount, true, SkillData.SkillType[skillTabAmount].name))
        skillTab_preset = view
        this.setSkillTab(skillTab_preset[0].key)
        return view
    }
    
    setSkillTab(keyProp){
        console.log(keyProp)
        if(keyProp==undefined){
            console.log("Keyprop is undefined, solve this please")
            return
        }
        this.setState({
            activeSkillTab: keyProp
        })
    }

    componentDidMount(){
        this.setSkillTab(this.state.activeSkillTab)
        this.selectSkillTab(this.state.activeSkillTab)
        console.log("component mounting")
    }
}

export default function SkillsAndEducation(SkillData){
    let skillObject = new Skills();
    return(
        <View style={[SkillStyle.SE_Container, {height: (DimData.height - StatusBar.currentHeight) - (DimData.height*0.075*2)}]}>
            <View style={SkillStyle.SE_Container_TabArea}>
                <View style={SkillStyle.SE_Container_TabArea_TabBar}>
                    {skillObject.CreateSkillTabs(SkillData)}
                </View>
            </View>
        </View>
    )
}

const SkillStyle = StyleSheet.create({
    SE_Container:{
        height: '100%',
        width:'100%',
        backgroundColor: AppStyles.page_colour.sapphire,
        justifyContent:'flex-start',
        alignItems:'center',
    },
    SE_Container_TabArea:{
        height: '40%',
        width:'100%',
        backgroundColor: AppStyles.page_colour.red,
        justifyContent:'flex-end',
        alignItems:'center',
    },
    SE_Container_TabArea_TabBar:{
        height: '20%',
        width: '60%',
        backgroundColor: AppStyles.page_colour.ghost_white,
        borderRadius: 10,
        marginBottom: '10%',
        flexDirection: 'row'
    },
    SE_Container_TabBar_Tab:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    SE_Container_TabBar_Tab_Last:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
})