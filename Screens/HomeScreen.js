import React, { Component, createRef, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, StatusBar, ScrollView, SafeAreaView, Animated, Modal, Pressable} from 'react-native';
import { decode } from 'html-entities';

import SkillsAndEducation from './Home/SkillsAndEducation';
import Experience from './Home/Experience';
import Contact from './Home/Contact';
import Ashley from './Home/Ashley';
import InterestInterim from './Home/Interims/InterestInterim';
import { SkillIcon } from '../assets/App-assets/Icons/SkillIcon';
import HomeModal from '../assets/App-assets/Modals/HomeModal';
//import SliderNodes from '../assets/App-assets/Nodes/sliderNodes';

const DimData = Dimensions.get("window")

const skillTabAmount = 2;
var skillTab_preset = []

//import styles
const AppStyles = require('../assets/App-assets/AppStyles');

//import interests
const InterestData = require('../Data/JSON-Data/Home/InterestData.json');

//Import skill data
const SkillData = require('../Data/JSON-Data/Home/SkillTabData.json')

//import Template data
const TemplateData = require('../assets/App-assets/Templates')

var currentSkillTab = 'technical'


export default class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            activeSkillTab: 'technical',
            skillTab:{
                technical:{name:"technical", backgroundColor:'white'},
                people:{name:"people", backgroundColor:'grey'},
                business:{name:"business", backgroundColor:'grey'},
            },
            color_chosen:'white',
            colour_animation: new Animated.Value(0),
            skillColour:{
                technical: AppStyles.page_colour.sapphire,
                people:'blue',
                business:'green',
                currentColour: AppStyles.page_colour.sapphire,
                newColour: 'red',
                currentValue: 0,
            },
            homeModalVisible: false,
            DarkMode: false,
            experienceSlider:{
                currentJobIndex:0
            }
        };
        this.scrollViewExperienceRef= React.createRef();
        this.jobOneField= React.createRef();
        this.jobTwoField= React.createRef();
        this.jobThreeField= React.createRef();
        this.jobFourField= React.createRef();
        this.jobFiveField= React.createRef();
        this.jobFields=[this.jobOneField, this.jobTwoField, this.jobThreeField, this.jobFourField, this.jobFiveField]
        this.jobNodes = []

    }

    setDark = (isDark) => {
        this.setState({
            DarkMode: isDark
        })
    }

    setHomeModalVisibility = (isVisible) =>{
        this.setState({
            homeModalVisible: isVisible
        })
    }
    
    //EXPERIENCE METHODS
    getExperienceTemplate(elementField){
        return(
            <View style={HomeStyle.ExperienceViewArea}
            onLayout={event => elementField = event.nativeEvent.layout}
            >
                <View style={HomeStyle.ExperienceView}>
                    <View style={HomeStyle.ExperienceJobView}>
                        <View style={HomeStyle.ExperienceJobPhotoArea}>
                            <View style={HomeStyle.ExperienceJobPhoto}>
                        
                            </View>
                            <View style={HomeStyle.ExperienceJobTitle}>

                            </View>
                        </View>
                        <View style={HomeStyle.ExperienceJobDate}>
                            <View>
                                <Text>Date</Text>
                            </View>
                        </View>
                        <View style={HomeStyle.ExperienceJobArea}>
                            <View style={HomeStyle.ExperienceJobDescription}>

                            </View>
                            <View style={HomeStyle.ExperienceJobEmployer}>

                            </View>
                        </View>
                        <View style={HomeStyle.ExperienceJobSectorIndicator}>
                            <Text>XXX</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    /*
        setState is asynchronous
        Change page within the callback of setState
        This maintains synchronisation when moving between pages
        Won't have cases where you are on page 1 but the code still thinks you are on page 0
    */
    updateExperienceSlider = (tag) =>{
        let page = (tag=="+") ? 1 : -1
        this.setState({
            experienceSlider:{currentJobIndex: Math.min(Math.max(0, (this.state.experienceSlider.currentJobIndex+page)), 5)}
        }, () => 
            this.scrollViewExperienceRef.current.scrollTo({
            x: this.props.experienceData[this.state.experienceSlider.currentJobIndex].x,
            animated: true
            })
        )
    }

    //SKILL METHODS
    selectSkillTab(keyProp){
        this.setSkillTab(keyProp)
        console.log(this.state.skillTab)
        console.log(keyProp)
        console.log(this.state.skillTab.technical.name == keyProp)
        this.setState({
            skillTab:{
                technical:{backgroundColor:("technical"==keyProp) ? 'white' : 'grey'},
                people:{backgroundColor:("people"==keyProp) ? 'white' : 'grey'},
                business:{backgroundColor:("business"==keyProp) ? 'white' : 'grey'},
            },
        })
    }
    
    setTabColour(keyProp){
        return (keyProp==currentSkillTab) ? 'white' : 'grey'
    }

    getSkillTab(ElementKey, last=false, title=""){
        let TabStyle = (last == false) ? HomeStyle.SE_Container_TabBar_Tab : HomeStyle.SE_Container_TabBar_Tab_Last
        return(
            /*If used, ElementKey variable needs to cycle through an array of names (techincal, people and business)*/
            <TouchableOpacity style={[TabStyle, {backgroundColor: this.state.color_chosen}]} key={ElementKey} keyProp={ElementKey} onPress={() => selectSkillTab(ElementKey)}>
                <Text>{title}</Text>
            </TouchableOpacity>
        )
    }
    
    CreateSkillTabs(SkillData){
        if(skillTab_preset.length!=0){
            return skillTab_preset
        }
        let view = []
        /*When used in the future, instead of pushing "SkillTab-"+index, push 'techincal', 'business' and 'people' individual via an array maybe*/
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
        currentSkillTab = keyProp
    }

    createSkillRows(data = undefined, title=""){
        let view = []
        let skillRowsInterim = 2
        let offset=1
        view.push(this.getSkillRow(false, undefined, (title+0)))
        for(let index=0; index<skillRowsInterim; index++){
            view.push(this.getSkillRow(false, undefined, (title+(index+offset))))
        }
        //view.push(this.getSkillRow(true, undefined, (title+skillRowsInterim+offset), "Press the buttons for more info"))
        return view
    }

    getSkillRow(last=false, data=undefined, ElementKey="", Caption=""){
       let skillStyle = (last==false) ? HomeStyle.SE_SkillSection_Row : [HomeStyle.SE_SkillSection_Row, {borderBottomWidth:0, justifyContent:'center', alignItems:'center', height: '10%'}]
       let rowInput = (Caption=="") ? this.getRowInfo() : <Text>{Caption}</Text>
       return(
           <View style={skillStyle} key={ElementKey}>
               {rowInput}
           </View>
       )
    }

    getRowInfo(){
        const info_amount = 3;
        let view = []
        for(let index=0; index<info_amount; index++){
            view.push(SkillIcon())
        }
        return view
    }

    changeColour(){
        Animated.timing(this.state.colour_animation,{
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start(() =>{
            Animated.timing(this.state.colour_animation,{
                toValue: 0,
                duration: 1000,
                useNativeDriver: false
            }).start()
        });
    }

    componentDidMount(){
        console.log("Component Mounted")
    }

    skillColourChange(skillType, value){
        this.setState({
            skillColour:{newColour: this.state.skillColour[skillType]}
        })
        Animated.timing(this.state.colour_animation,{
            toValue: value,
            duration: 1000,
            useNativeDriver: false,
        }).start()
        this.setState({
            skillColour:{currentColour: this.state.skillColour[skillType], 
                        currentValue: ~this.state.skillColour.currentValue,
                        technical: AppStyles.page_colour.sapphire,
                        people:'red',
                        business:'green',
                        newColour: this.state.skillColour[skillType]
                    }
        })
    }
    
    render(){
        const testColour= {
            backgroundColor: this.state.colour_animation.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: ['blue', 'pink', 'green']
            }),
        }

        const animatedStyle = {
            backgroundColor: testColour
        }
        return(
            <View style={AppStyles.styles.container}>
                <SafeAreaView style={AppStyles.styles.HomePage}>
                    <StatusBar barStyle="dark-content" backgroundColor="white"/>
                    <View style={[AppStyles.styles.MenuBar, AppStyles.styles.MenuBarTop]}>
                        <View style={AppStyles.styles.SideMenuArea}>
                            <TouchableOpacity style={AppStyles.styles.MenuBarButton} onPress={() => this.setHomeModalVisibility(true)}>
                                <Text>Side Menu</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView horizontal
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={true}
                    ref={ref => this.scrollViewMainPageRef = ref}
                    scrollEnabled={false}
                    >
                        <ScrollView>
                            <View style={AppStyles.styles.HomeSector}
                            onLayout={event => (this.AshleyField = event.nativeEvent.layout)}>
                                    {<HomeModal isVisible={this.state.homeModalVisible} setHomeModalVisibility={this.setHomeModalVisibility} switchFunction={this.setDark} isDark={this.state.DarkMode}/>}
                                    <View style={HomeStyle.AboutMe_Profile_Section}>
                                        <View style={HomeStyle.AboutMe_Profile_Picture}>
                                            
                                        </View>
                                    </View>
                                    <View style={HomeStyle.AboutMe_SectorHeader}>
                                        <Text style={HomeStyle.AboutMe_SectorHeaderText}>Get To Know Me</Text>
                                    </View>
                                    <View style={HomeStyle.AboutMe_SectorHeader_GetToKnowMeInterim}
                                    onLayout={event => (this.GetToKnowMeInterimField = event.nativeEvent.layout)}> 
                                        <ScrollView alwaysBounceVertical={true}>
                                            <View>
                                                <Text style={HomeStyle.AboutMe_SectorHeader_GetToKnowMeInterimText}>Greetings, I am an agile software engineer at CGI, with responsibilities revolving around programming and testing. After university, I’ve been inspired and interested in entering the tech industry and this has increased since becoming more involved in my role. I am passionate about software and using my technological skills to help others. Being involved in areas of software development such as implementation, designing, testing, project management and more have truly intrigued me. I hope to work at my best and enhance my technical skills in this industry.</Text>
                                            </View>
                                        </ScrollView>
                                    </View>
                                    <View style={HomeStyle.AboutMe_SectorHeader}>
                                        <Text style={HomeStyle.AboutMe_SectorHeaderText}>Interests</Text>
                                    </View>
                                    <ScrollView horizontal pagingEnabled={true}
                                        showsHorizontalScrollIndicator={false}
                                    >
                                        {InterestInterim(InterestData)}
                                    </ScrollView>
                                    <View style={HomeStyle.Home_PartiesSectorHeader}>
                                        <Text style={HomeStyle.AboutMe_SectorHeaderText}>Am I fun at parties?</Text>
                                        <TouchableOpacity style={HomeStyle.Home_PartiesButton}><Text>Your answer</Text></TouchableOpacity>
                                    </View>
                            </View>
                        </ScrollView>
                        <View style={AppStyles.styles.HomeSector}
                        onLayout={event => (this.SkillsAndEducationField = event.nativeEvent.layout)}>
                            {/* {SkillsAndEducation(SkillData)} */}
                            <Animated.View style={[HomeStyle.SE_Container, {height: (DimData.height - StatusBar.currentHeight) - (DimData.height*0.075*2), backgroundColor: animatedStyle.backgroundColor.backgroundColor}]}>
                                <View style={HomeStyle.SE_Container_TabArea}>
                                    <View style={HomeStyle.SE_Container_TabBar_Tab_Image}>
                                        <Text>[Insert Skills Image here]</Text>
                                    </View>
                                    <View style={HomeStyle.SE_Container_TabArea_TabBar}>
                                        {/* {this.CreateSkillTabs(SkillData)} */}
                                        <TouchableOpacity style={[ HomeStyle.SE_Container_TabBar_Tab, {backgroundColor: this.state.skillTab.technical.backgroundColor}]} key={"technical"} keyProp={"technical"} onPress={() => {this.selectSkillTab("technical"); this.scrollViewSkillsPageRef.scrollTo({
                                            x: this.TechnicalField.x,
                                            animated: true
                                        }); this.skillColourChange("technical", 0)}}>
                                            <Text>{"Technical"}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[ HomeStyle.SE_Container_TabBar_Tab, {backgroundColor: this.state.skillTab.people.backgroundColor}]} key={"people"} keyProp={"people"} onPress={() => {this.selectSkillTab("people"); this.scrollViewSkillsPageRef.scrollTo({
                                            x: this.PeopleField.x,
                                            animated:true
                                        }); this.skillColourChange("people", 0.5)}}>
                                            <Text>{"People"}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[ HomeStyle.SE_Container_TabBar_Tab_Last, {backgroundColor: this.state.skillTab.business.backgroundColor}]} key={"business"} keyProp={"business"} onPress={() => {this.selectSkillTab("business"); this.scrollViewSkillsPageRef.scrollTo({
                                            x: this.BusinessField.x,
                                            animated: true
                                        }); this.skillColourChange("business", 1)}}>
                                            <Text>{"Business"}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <ScrollView horizontal pagingEnabled={true} showsHorizontalScrollIndicator={false} ref={ ref => this.scrollViewSkillsPageRef = ref} scrollEnabled={false}>
                                    <Animated.View style={HomeStyle.SE_Container_Skills_Area} onLayout={event => this.TechnicalField = event.nativeEvent.layout}>
                                        <View style={HomeStyle.SE_Container_Skills_Area_SkillSection}>
                                            {this.createSkillRows(undefined, "Technical")}
                                        </View>
                                    </Animated.View>
                                    <Animated.View style={HomeStyle.SE_Container_Skills_Area} onLayout={event => this.PeopleField = event.nativeEvent.layout}>
                                        <View style={HomeStyle.SE_Container_Skills_Area_SkillSection}>
                                            {this.createSkillRows(undefined, "People")}
                                        </View>
                                    </Animated.View>
                                    <Animated.View style={HomeStyle.SE_Container_Skills_Area} onLayout={event => this.BusinessField = event.nativeEvent.layout}>
                                        <View style={HomeStyle.SE_Container_Skills_Area_SkillSection}>
                                            {this.createSkillRows(undefined, "Business")}
                                        </View>
                                    </Animated.View>
                                </ScrollView>
                            </Animated.View >
                        </View>
                        <View style={AppStyles.styles.HomeSector}
                        onLayout={event => this.ExperienceField = event.nativeEvent.layout}>
                            {/* {Experience()} */}
                            <View style={HomeStyle.ExperienceContainer}>
                                <View style={HomeStyle.ExperienceJobSliderArea}>
                                    <View style={HomeStyle.ExperienceJobSlider}>
                                        <TouchableOpacity style={HomeStyle.ExperienceJobSwitchButton}
                                            onLayout={event => this.JobSwitchButton = event.nativeEvent.layout}
                                            onPress={() => [this.updateExperienceSlider("-")]}>
                                            <Text>Previous</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={HomeStyle.ExperienceJobListTitleArea}>
                                            <View style={HomeStyle.ExperienceJobListTitle}><Text>Job List</Text></View>
                                            <View style={HomeStyle.ExperienceJobListTitleButton}><Text>{`>`}</Text></View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={HomeStyle.ExperienceJobSwitchButton} onPress={() => [this.updateExperienceSlider("+")]}>
                                            <Text>Next</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <ScrollView horizontal ref={this.scrollViewExperienceRef} pagingEnabled={true} showsHorizontalScrollIndicator={false} scrollEventThrottle={1} scrollEnabled={false}>
                                    {this.getExperienceTemplate(this.jobOneField)}
                                    {this.getExperienceTemplate(this.jobTwoField)}
                                    {this.getExperienceTemplate(this.jobThreeField)}
                                    {this.getExperienceTemplate(this.jobFourField)}
                                    {this.getExperienceTemplate(this.jobFiveField)}
                                    {/* {this.generateNodes()} */}
                                    <View style={HomeStyle.ExperienceViewArea}
                                    onLayout={event => this.jobTwoField = event.nativeEvent.layout}
                                    >
                                        <Text>job 2</Text>
                                    </View>
                                </ScrollView>
                            </View>
                        </View>
                        <View style={AppStyles.styles.HomeSector}
                        onLayout={event => this.ContactField = event.nativeEvent.layout}>
                            <Animated.View style={[HomeStyle.ContactContainer, {backgroundColor: animatedStyle.backgroundColor.backgroundColor}]}>
                                <TouchableOpacity style={HomeStyle.testButton} onPress={() => this.skillColourChange("people", 1)}><Text>shshs</Text></TouchableOpacity>
                            </Animated.View>
                        </View>
                    </ScrollView>
                    <SafeAreaView style={[AppStyles.styles.MenuBar]}
                    onLayout={event => this.BottomMenuBarField = event.nativeEvent.layout}
                    >
                        <View style={AppStyles.styles.BottomBar}>
                            <TouchableOpacity style={AppStyles.styles.MenuBarButton}
                            onPress={() => {
                                this.scrollViewMainPageRef.scrollTo({
                                    x: this.AshleyField.x,
                                    animated:true
                                })
                            }}
                            >
                                <Text>Home</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={AppStyles.styles.BottomBar}>
                            <TouchableOpacity style={AppStyles.styles.MenuBarButton}
                            onPress={() => {
                                this.scrollViewMainPageRef.scrollTo({
                                    x: this.SkillsAndEducationField.x,
                                    animated:true
                                })
                            }}
                            >
                                <Text>Skills & Education</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={AppStyles.styles.BottomBar}>
                            <TouchableOpacity style={AppStyles.styles.MenuBarButton}
                            onPress={() => {
                                this.scrollViewMainPageRef.scrollTo({
                                    x: this.ExperienceField.x,
                                    animated:true
                                })
                            }}>
                                <Text>Experience</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={AppStyles.styles.BottomBarEnd}>
                            <TouchableOpacity style={AppStyles.styles.MenuBarButton}
                            onPress={() => {
                                this.scrollViewMainPageRef.scrollTo({
                                    x: this.ContactField.x,
                                    animated: true
                                })
                            }}>
                                <Text>Contact</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </SafeAreaView>
            </View>
        )
    }
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
    },
    AboutMe_SectorHeader:{
        width:'100%',
        height: '10%',
        backgroundColor: AppStyles.page_colour.peach,
        justifyContent:'center'
    },
    AboutMe_SectorHeaderText:{
        color: AppStyles.page_colour.brown,
        paddingLeft:'7.5%',
        fontSize:20,
        fontWeight: "normal"
    },
    AboutMe_SectorHeader_GetToKnowMeInterim:{
        width:'100%',
        height:'20%',
        backgroundColor: AppStyles.page_colour.mild_peach,
        paddingBottom:'2.5%',
        paddingTop:'2.5%'
    },
    AboutMe_SectorHeader_GetToKnowMeInterimText:{
        color: AppStyles.page_colour.dark_brown,
        paddingLeft:'7.5%',
        fontSize:15,
        fontWeight: "normal",
        paddingRight: '2.5%',
        textAlign:'left'
    },
    AboutMe_SectorHeader_InterestsInterim:{
        width:'100%',
        height:'20%',
        backgroundColor: AppStyles.page_colour.mild_peach,
        flexDirection: 'row'
    },
    Home_InterestsIterimTextSector:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: AppStyles.page_colour.pink,
        paddingLeft:'7.5%',
        flex: 1,
        flexDirection:'row'
    },
    Home_InterestsIterimTextSector_Interest:{
        justifyContent:'flex-start',
        backgroundColor: AppStyles.page_colour.mild_peach,
        width:'100%',
        height:'50%',
        flexDirection:'row',
    },
    Home_InterestsIterimTextSector_InterestArea:{
        justifyContent:'flex-start',
        backgroundColor: AppStyles.page_colour.mild_peach,
        width:'50%',
        height:'100%',
    },
    Home_InterestsIterimTextSector_InterestPhotoArea:{
        height:'100%',
        width: '40%',
        backgroundColor:'red',
        alignItems:'center',
        justifyContent:'center',
    },
    Home_InterestsIterimTextSector_InterestPhoto:{
        width:'80%',
        height:'80%',
        backgroundColor:'white'
    },
    Home_InterestsIterimTextSector_InterestTextArea:{
        height: '100%',
        width: '60%',
        backgroundColor:'grey'
    },
    Home_PartiesSectorHeader:{
        width:'100%',
        height: '10%',
        backgroundColor: AppStyles.page_colour.peach,
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center'
    },
    Home_PartiesButton:{
        width:'30%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'red'
    },
    ExperienceContainer:{
        height: (DimData.height - StatusBar.currentHeight) - (DimData.height*0.075*2),
        width:'100%',
        backgroundColor: AppStyles.page_colour.ghost_white,
        justifyContent:'flex-start',
        alignItems:'center',
        marginTop:'10%',
    },
    ExperienceViewArea:{
        backgroundColor:'orange',
        width: DimData.width,
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    ExperienceView:{
        backgroundColor:'green',
        width:'80%',
        height:'100%',
        alignItems:'center',
        justifyContent:'flex-start'
    },
    ExperienceJobView:{
        width:'100%',
        height:'50%',
        alignItems:'center',
        justifyContent:'flex-start',
        backgroundColor:'red'
    },
    ExperienceJobPhotoArea:{
        width:'90%',
        height: '100%',
        backgroundColor: AppStyles.page_colour.sapphire,
        alignItems:'center',
        justifyContent:'flex-start'
    },
    ExperienceJobPhoto:{
        width:'90%',
        height: '90%',
        backgroundColor: AppStyles.page_colour.red,
    },
    ExperienceJobTitle:{
        height: '20%',
        width:'80%',
        backgroundColor: AppStyles.page_colour.blue,
        alignItems:'center',
        justifyContent:'center',
        position: 'absolute',
        bottom: '5%'
    },
    ExperienceJobDate:{
        width:'100%',
        height:'20%',
        justifyContent:'center',
        backgroundColor: AppStyles.page_colour.purple,
        flexDirection: 'row',
        alignItems:'center',
    },
    ExperienceJobSwitchButton:{
        height:'100%',
        width: '20%',
        backgroundColor: AppStyles.page_colour.yellow,
        alignItems:'center',
        justifyContent:'center'
    },
    ExperienceJobSectorIndicator:{
        height:'10%',
        width:'100%',
        backgroundColor: AppStyles.page_colour.pink,
        alignItems:'center',
        justifyContent:'center',

    },
    ExperienceJobArea:{
        height:'30%',
        width:'100%',
        backgroundColor: AppStyles.page_colour.red,
        alignItems:'center',
        justifyContent:'flex-start',
    },
    ExperienceJobDescription:{
        height:'40%',
        width: '80%',
        backgroundColor: AppStyles.page_colour.ghost_white,
        alignItems:'center',
        justifyContent:'center'
    },
    ExperienceJobEmployer:{
        height:'40%',
        width: '60%',
        backgroundColor: AppStyles.page_colour.sapphire,
        alignItems:'center',
        justifyContent:'center',
    },
    ExperienceJobSliderArea:{
        height: '10%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        backgroundColor: AppStyles.page_colour.purple
    },
    ExperienceJobSlider:{
        height: '100%',
        width:'90%',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        backgroundColor: AppStyles.page_colour.purple
    },
    ExperienceJobListTitleArea:{
       flexDirection:'row',
       height:'100%',
       width: '60%',
       backgroundColor: AppStyles.page_colour.sapphire,
       alignItems:'center',
       justifyContent:'center'
    },
    ExperienceJobListTitle:{
        height:'100%',
        width:'70%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'red'
    },
    ExperienceJobListTitleButton:{
        width:'30%',
        height:'100%',
        backgroundColor: AppStyles.page_colour.pink,
        justifyContent:'center',
        alignItems:'center'
    },
    SE_Container:{
        height: '100%',
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    SE_Container_TabArea:{
        height: '40%',
        width:'100%',
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
    SE_Container_TabBar_Tab_Image:{
        height: '50%',
        width: '50%',
        backgroundColor: AppStyles.page_colour.ghost_white,
        borderRadius: 10,
        margin:'5%',
        alignItems:'center',
        justifyContent:'center'
    },
    SE_Container_TabBar_Tab_Last:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    SE_Container_Skills_Area:{
        height: (DimData.height - (DimData.height*0.4) - (DimData.height*0.075*2)),
        width: DimData.width,
        alignItems:'center',
        justifyContent:'flex-start',
    },
    SE_Container_Skills_Area_SkillSection:{
        backgroundColor: AppStyles.page_colour.ghost_white,
        height:'90%',
        width:'70%',
        borderRadius: 10,
        shadowColor: AppStyles.page_colour.black,
        shadowOffset:{
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.35,
        shadowRadius: 6,
        elevation: 10,
        alignItems:'center',
        justifyContent:'center',
    },
    SE_SkillSection_Row:{
        backgroundColor: AppStyles.page_colour.ghost_white,
        height:'30%',
        width:'90%',
        flexDirection:'row',

    },
    ContactContainer:{
        height: (DimData.height - StatusBar.currentHeight) - (DimData.height*0.075*2),
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    testButton:{
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:'pink',
        height:'20%',
        width: '50%'
    },
})