import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, Modal, Stylesheet, Dimensions, Pressable, Animated, SafeAreaView } from 'react-native'

//import side menu button template
import SideMenuButton from '../Buttons/SideMenuButton.js';

//Import AppStyles
const AppStyles = require('../AppStyles.js');

//Get screen width
const DimData = Dimensions.get("window");

class ModalForHome extends Component{
    constructor(props){
        super(props);
        this.state={
            isVisible: true,
            modalBackgroundColour: AppStyles.page_colour.black,
            modalColour: AppStyles.page_colour.ghost_white,
            modalTextColour: AppStyles.page_colour.black,
            modalX: new Animated.Value(0),
            modalOpacity: new Animated.Value(0),
            DarkMode: false,
        }
        this.setVisible = this.setVisible.bind(this)
        this.getVisibility = this.getVisibility.bind(this)
        this.getModal = this.getModal.bind(this)
    }

    //Sets the visibility of the modal
    setVisible(visibility){
        // console.log("HEY")
        // console.log(visibility)
        // console.log(this)
        this.setState((state) =>{
            return {isVisible: visibility}
        })
        console.log(this.state)
        //this.state.isVisible = visibility
    }

    //getsVisibility
    getVisibility(){
        console.log("Get visibility")
        return this.state.isVisible
    }

    componentDidMount(){
        console.log("Component mounted")
    }

    modalClose(){
        console.log("entered")
        while(this.state.modalX!=0){
            console.log(this.state.modalX)
        }
    }

    //Gets the modal
    getModal(isVisible, visibilityFunction, switchFunction, isDark){
        let animationValue = 0 
        let modalOpacityValue = 0
        if(isVisible){
            animationValue = 1
            modalOpacityValue = 1
            Animated.timing(this.state.modalX,{
                toValue: animationValue,
                duration: 500,
                useNativeDriver: false
            }).start()
            Animated.timing(this.state.modalOpacity,{
                toValue: modalOpacityValue,
                duration: 200,
                useNativeDriver: false
            }).start()
        }
        return(
            <Modal
                visible={isVisible}  
                transparent={true}
                animationType='fade'
            >
                <SafeAreaView style={{height:'100%', width:'100%', justifyContent:'center', alignItems:'flex-start'}}>
                    <TouchableWithoutFeedback style={{height:'100%', width:'100%', position:'absolute'}} onPress={() => {
                        Animated.sequence([
                            Animated.timing(this.state.modalX, {toValue: 0, duration: 200, useNativeDriver: false}),
                            Animated.timing(this.state.modalOpacity, {toValue: 0, duration: 100, useNativeDriver: false})
                        ]).start(() => visibilityFunction(false))
                    }}>
                        <Animated.View style={{height:'100%', width:'100%', backgroundColor:'black', alignItems:'center', justifyContent:'center', position:'absolute', 
                        opacity:this.state.modalOpacity.interpolate({inputRange:[0, 1], outputRange:[0, 0.5]})}}
                        onLayout={event => (this.sideMenuField = event.nativeEvent.layout)}
                        >

                        </Animated.View>
                    </TouchableWithoutFeedback>
                    <Animated.View style={{height:'100%', width:'60%', backgroundColor:this.state.modalColour, transform:[{ translateX: this.state.modalX.interpolate({
                        inputRange: [0, 1],
                        outputRange: [-DimData.width*0.6, 0]
                    })}]}}>
                        {<SideMenuButton caption="Coding Languages" type="BUTTON" isActive={isDark} switchFunction={() => switchFunction}/>}
                        {<SideMenuButton caption="Hobbies" type="BUTTON" isActive={isDark} switchFunction={() => switchFunction}/>}
                        {<SideMenuButton caption="Dark Mode" type="SWITCH" isActive={isDark} switchFunction={() => switchFunction} sign="SWITCH"/>}
                    </Animated.View>
                </SafeAreaView>
            </Modal>
        )
        
    }

}

export default class HomeModal extends Component{
    constructor(props){
        super(props);
        this.state={
            modal: new ModalForHome()
        }
    }
    
    componentDidMount(){
        console.log("Button pressed")
    }

    render(){
        // console.log(this.state.modal)
        // console.log("NEXT")
        console.log(this.props)
        console.log(this.props.setHomeModalVisibility)
        return(
            this.state.modal.getModal(this.props.isVisible, this.props.setHomeModalVisibility, this.props.switchFunction, this.props.isDark)
        )
    }
}

