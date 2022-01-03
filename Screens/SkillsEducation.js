import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, StatusBar, Animated, SafeAreaView, Image } from 'react-native'


const AppStyles = require('../assets/App-assets/AppStyles')
const DimData = Dimensions.get("window")
const ALevelData = require('../Data/JSON-Data/ALevelData.json')
const skillData = require('../Data/JSON-Data/SkillData.json')

export default class SkillsEducation extends Component{
    constructor(props){
        super(props);
        this.state={
            Education_Value: new Animated.Value(1),
            Skills_Value: new Animated.Value(0),
            current_module_year: 1,
        };
        this.scrollViewSERef = React.createRef();
        this.scrollViewModuleRef = React.createRef();
    }

    setModuleYear(year, page){
        console.log("PAGE")
        console.log(page)
        this.setState({
            current_module_year: year
        }, () => this.scrollViewModuleRef.current.scrollTo({
            x: page.x,
            animated: true
        }))
    }

    createLanguagesTable = (languageAmount) => {
        let view = []
        let containerView = []
        let outer_iteration = skillData["Languages"].length/languageAmount
        let language_index=0

        for(let index_1=0; index_1<outer_iteration; index_1++){
            for(let index_2=0; index_2<languageAmount; index_2++, language_index++){
                view.push(
                    <View style={SEStyles.SE_Skills_LanguageTab} key={"LANGUAGE-"+index_1+index_2}>
                        <View style={SEStyles.SE_Skills_LanguageTabImageArea}>
                            <Image source={require('../assets/Images/JavaLogo.png')} style={{height:'100%', width:'100%'}}/>
                        </View>
                        <View style={SEStyles.SE_Skills_LanguageTabTitleArea}>
                            <View style={SEStyles.SE_Skills_LanguageTabTitle}>
                                <Text style={SEStyles.SE_Skills_LanguageTabTitleText}>{skillData["Languages"][language_index].language}</Text>
                            </View>
                            <View style={SEStyles.SE_Skills_LanguageTabExperienceArea}>
                                <Text style={SEStyles.SE_Skills_LanguageTabExperienceText}>{skillData["Languages"][language_index].experience}</Text>
                            </View>
                        </View>
                    </View>
                )
            }
            containerView.push(
                <View style={{flex:1}} key={"CONTAINER-"+index_1}>
                    {view}
                </View>
            )
            view = []
        }
        return containerView
    }

    createALevelArea = () => {
        let view = []
        console.log("HELLO OVER EHRE")
        console.log(ALevelData)
        ALevelData["A_Levels"].map((A_Level) => {
            view.push(
                <View style={SEStyles.SE_A_Level_Subject} key={A_Level.subject}>
                    <View style={SEStyles.SE_A_Level_Subject_Top}>
                        <View style={SEStyles.SE_A_Level_Image}>

                        </View>
                    </View>
                    <View style={SEStyles.SE_A_Level_Subject_Bottom}>
                        <Text>{A_Level.subject}</Text>
                    </View>
                </View>
            )
        })
        return view
    }

    createModuleTables(year, modulesAmount){
        let half_modulesAmount = modulesAmount/2
        let views = []
        let viewsContainer = []
        for(let index=0; index<modulesAmount; index+=4){
            for(let index_2=0; index_2<half_modulesAmount; index_2++){
                views.push(
                    <View style={SEStyles.SE_ModuleTableRow} key={year+"-"+index+"-"+index_2}>
                        <Text>{index+" - " + index_2}</Text>
                        {console.log(index+" - " + index_2)}
                    </View>
                )
            }
            viewsContainer.push(
                <View style={{height:'100%', width:'50%', flexDirection:'row', flexWrap: 'wrap'}} key={index}>
                    {views}
                </View>
            )
            views = []
            console.log(views.length)
        }
        return viewsContainer
    }

    setSEIndex(tag){
        if(tag=="SKILLS"){
            Animated.sequence([
                Animated.timing(this.state.Skills_Value, {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: 100,
                }),
                Animated.timing(this.state.Education_Value,{
                    toValue: 0,
                    useNativeDriver: true,
                    duration: 100,
                })
            ]).start()
        }else{
            Animated.sequence([
                Animated.timing(this.state.Education_Value, {
                    toValue: 1,
                    useNativeDriver: true,
                    duration: 100,
                }),
                Animated.timing(this.state.Skills_Value,{
                    toValue: 0,
                    useNativeDriver: true,
                    duration: 100,
                })
            ]).start()
        }
    }
    
    render(){
        return(
                <SafeAreaView style={SEStyles.ContactContainer}>
                    <StatusBar barStyle="dark-content" backgroundColor="white"/>
                    <View style={[AppStyles.styles.MenuBar, AppStyles.styles.MenuBarTop]}>
                        <View style={[AppStyles.styles.SideMenuArea]}>
                            <TouchableOpacity style={{height:'100%', width:'100%', backgroundColor:'green', alignItems:'center', justifyContent:'center'}} onPress={() => this.props.navigation.goBack()}>
                                <Text>Back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={SEStyles.SE_Elements_Container}>
                        <View style={SEStyles.SE_Toggle_Area}>
                            <TouchableOpacity style={SEStyles.SE_Toggle_Button} onPress={() => {[this.setSEIndex("EDUCATION"),
                                this.scrollViewSERef.current.scrollTo({
                                x: 0,
                                animated: true
                            })]}}>
                                <View style={SEStyles.SE_Toggle_Button_Title}>
                                    <Text>Education</Text>
                                </View>
                                <Animated.View style={[SEStyles.SE_Toggle_Button_Indicator,
                                {opacity: this.state.Education_Value.interpolate({inputRange:[0, 1], outputRange:[0, 1]})}]}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={SEStyles.SE_Toggle_Button} onPress={() => {[this.setSEIndex("SKILLS"), this.scrollViewSERef.current.scrollTo({
                                x: this.SkillsPageField.x,
                                animated: true
                            })]}}>
                                <View style={SEStyles.SE_Toggle_Button_Title}>
                                    <Text>Skills</Text>
                                </View>
                                <Animated.View style={[SEStyles.SE_Toggle_Button_Indicator,{opacity: this.state.Skills_Value.interpolate({
                                    inputRange:[0, 1],
                                    outputRange:[0, 1]
                                })}]}/>
                            </TouchableOpacity>
                        </View>
                        <ScrollView horizontal pagingEnabled={true} showsHorizontalScrollIndicator={false} ref={this.scrollViewSERef} scrollEnabled={false}>
                            <ScrollView horizontal={false} bounces={false}>
                                <View style={SEStyles.SE_Page} onLayout={event => this.EducationPageField = event.nativeEvent.layout}>
                                    <View style={{width:DimData.width, height:DimData.height*0.1}}>

                                    </View>
                                    <View style={{width:DimData.width, height:DimData.height}}>
                                        <View style={SEStyles.SE_DetailsArea}>
                                            <View style={SEStyles.SE_DegreeArea}>
                                                <Text style={SEStyles.SE_DegreeTitle}>BSc Computer Science with Industrial Experience - First Class</Text>
                                            </View>
                                            <View style={SEStyles.SE_YearsArea}>
                                                <TouchableOpacity style={(1 == this.state.current_module_year) ? SEStyles.SE_YearButton_ON : SEStyles.SE_YearButton_OFF} onPress={() => this.setModuleYear(1, this.yearOneField)}><Text>Year 1</Text></TouchableOpacity>
                                                <TouchableOpacity style={(2 == this.state.current_module_year) ? SEStyles.SE_YearButton_ON : SEStyles.SE_YearButton_OFF} onPress={() => this.setModuleYear(2, this.yearTwoField)}><Text>Year 2</Text></TouchableOpacity>
                                                <TouchableOpacity style={(3 == this.state.current_module_year) ? SEStyles.SE_YearButton_ON : SEStyles.SE_YearButton_OFF} onPress={() => this.setModuleYear(3, this.yearThreeField)}><Text>Year 3</Text></TouchableOpacity>
                                                <TouchableOpacity style={(4 == this.state.current_module_year) ? SEStyles.SE_YearButton_ON : SEStyles.SE_YearButton_OFF} onPress={() => this.setModuleYear(4, this.yearFourField)}><Text>Year 4</Text></TouchableOpacity>
                                            </View>
                                            <View style={SEStyles.SE_ModulesAreaTitle}>
                                                <Text style={SEStyles.SE_ModulesTitle}>Modules</Text>
                                            </View>
                                            <View style={SEStyles.SE_ModulesArea}>
                                                <View style={{height:'100%', width:'100%'}}>
                                                    <ScrollView scrollEnabled={false} ref={this.scrollViewModuleRef} horizontal={true}>
                                                        <View style={SEStyles.SE_ModulePage} onLayout={event => this.yearOneField = event.nativeEvent.layout}>
                                                            <View style={SEStyles.SE_DefaultModuleLayout}>
                                                                {this.createModuleTables("PROGRAMMING", 8)}
                                                            </View>
                                                        </View>
                                                        <View style={SEStyles.SE_ModulePage} onLayout={event => this.yearTwoField = event.nativeEvent.layout}>
                                                            <View style={SEStyles.SE_DefaultModuleLayout}>
                                                                {this.createModuleTables("BIG DATA", 8)}
                                                            </View>
                                                        </View>
                                                        <View style={SEStyles.SE_ModulePage} onLayout={event => this.yearThreeField = event.nativeEvent.layout}><Text>Year 3</Text></View>
                                                        <View style={SEStyles.SE_ModulePage} onLayout={event => this.yearFourField = event.nativeEvent.layout}><Text>Year 4</Text></View>
                                                    </ScrollView> 
                                                </View>
                                            </View>
                                            <View style={SEStyles.SE_A_LevelAreaTitle}>
                                                <Text style={SEStyles.SE_ModulesTitle}>A Levels</Text>
                                            </View>
                                            <View style={SEStyles.SE_A_Level_Area}>
                                                {this.createALevelArea()}
                                            </View>
                                        </View>
                                    </View>
                                </View> 
                            </ScrollView>
                            
                            <View style={SEStyles.SE_Page} onLayout={event => this.SkillsPageField = event.nativeEvent.layout}>
                                <View style={SEStyles.SE_Skills_SliderArea}>

                                </View>
                                <View style={SEStyles.SE_Skills_ContentArea}>
                                    <View style={SEStyles.SE_Skills_ContentImageArea}>

                                    </View>
                                    <ScrollView horizontal pagingEnabled={true}>
                                        <View style={SEStyles.SE_Skills_SkillDetailsArea}>
                                            {/* <View style={SEStyles.SE_Skills_LanguageTab}>
                                                <View style={SEStyles.SE_Skills_LanguageTabImageArea}>

                                                </View>
                                                <View style={SEStyles.SE_Skills_LanguageTabTitleArea}>
                                                    <View style={SEStyles.SE_Skills_LanguageTabTitle}>

                                                    </View>
                                                    <View style={SEStyles.SE_Skills_LanguageTabExperienceArea}>
                                                        
                                                    </View>
                                                </View>
                                            </View> */}
                                            {this.createLanguagesTable(4)}
                                        </View>
                                        <View style={SEStyles.SE_Skills_SkillDetailsArea}>
                                            <Text>ahjsjjs</Text>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </ScrollView>
                    </View>    
                </SafeAreaView>
        )
    }
}

const SEStyles = StyleSheet.create({
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
        height: '100%',
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:AppStyles.ghost_white,
    },
    SE_Elements_Container:{
        height: (DimData.height - StatusBar.currentHeight) - (DimData.height*0.075),
        width:'100%',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor: AppStyles.page_colour.midnight_blue,
    },
    SE_Toggle_Area:{
        alignItems:'flex-start',
        backgroundColor:'pink',
        height:'10%',
        width: '100%',
        flexDirection:'row'
    },
    SE_Toggle_Button:{
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:'white',
        height:'100%',
        width: '50%',
    },
    SE_Toggle_Button_Indicator:{
        backgroundColor:'black',
        width:'80%',
        height:'10%',
        borderRadius: 10,
        marginBottom:'5%'
    },
    SE_Toggle_Button_Title:{
        backgroundColor:'white',
        width:'100%',
        height:'80%',
        alignItems:'center',
        justifyContent:'center',
        paddingTop: '5%'
    },
    SE_Page:{
       height:'100%',
       width: DimData.width,
       justifyContent:'flex-start',
       alignItems:'center' 
    },
    SE_DetailsArea:{
        width:'100%',
        height:'100%',
        backgroundColor: AppStyles.page_colour.ghost_white,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
    },
    SE_DegreeArea:{
        width: '100%',
        height:'20%',
        borderBottomWidth:1,
        justifyContent:'center',
        alignItems: 'center'
    },
    SE_DegreeTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center'
    },
    SE_YearsArea:{
        height:'5%',
        width:'100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
    },
    SE_YearButton_OFF:{
        height:'100%',
        width:'25%',
        justifyContent:'center',
        alignItems:'center'
    },
    SE_YearButton_ON:{
        height:'100%',
        width:'25%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: 'pink'
    },
    SE_ModulesArea:{
        height:'30%', 
        backgroundColor:'red',
        width: '100%',
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center'
    },
    SE_ModulePage:{
        height:'100%',
        width: DimData.width,
        justifyContent:'center',
        alignItems:'center'
    },
    SE_ModulesAreaTitle:{
        height:'10%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'yellow',
    },
    SE_ModulesTitle:{
        fontWeight:'bold',
        fontSize: 20,
    },
    SE_ModuleTableRow:{
        borderBottomWidth: 1,
        height: '25%',
        width: '100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'pink'
    },
    SE_DefaultModuleLayout:{
        height:'100%', 
        width:'100%', 
        backgroundColor:'grey', 
        flexDirection:'row'
    },
    SE_A_Level_Area:{
        flex:1,
        backgroundColor:'pink',
        flexDirection:'row'
    },
    SE_A_LevelAreaTitle:{
        height:'10%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'yellow',
    },
    SE_A_Level_Subject:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    SE_A_Level_Subject_Top:{
        height:'80%', 
        width:'100%', 
        backgroundColor:'orange',
        justifyContent:'center',
        alignItems:'center'
    },
    SE_A_Level_Subject_Bottom:{
        height:'20%', 
        width:'100%', 
        alignItems:'center', 
        justifyContent:'flex-start'
    },
    SE_A_Level_Image:{
        borderRadius: 10,
        height: '80%',
        width: '80%',
        backgroundColor:'black',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,
    },
    SE_Skills_SliderArea:{
        height:'20%',
        width:'100%',
        flexDirection:'row',
        backgroundColor:'red'
    },
    SE_SliderButton:{
        flex:1
    },
    SE_Skills_ContentArea:{
        height:'80%',
        width: DimData.width,
        backgroundColor:'green'
    },
    SE_Skills_ContentImageArea:{
        height:'20%',
        width: '100%',
        backgroundColor:'orange',
    },
    SE_Skills_SkillDetailsArea:{
        height:'100%',
        width:DimData.width,
        backgroundColor:'pink',
        flexDirection: 'row'
    },
    SE_Skills_LanguageTab:{
        flex:1,
        flexDirection:'row',
        backgroundColor: AppStyles.page_colour.ghost_white,
    },
    SE_Skills_LanguageTabImageArea:{
        height:'100%',
        width:'40%',
        backgroundColor: AppStyles.page_colour.black,
    },
    SE_Skills_LanguageTabTitleArea:{
        height:'100%',
        width:'60%', 
        alignItems:'flex-end',
    },
    SE_Skills_LanguageTabTitleText:{
        paddingLeft: '5%'
    },  
    SE_Skills_LanguageTabExperienceText:{
        paddingRight: '5%',
        color: AppStyles.page_colour.ghost_white
    }, 
    SE_Skills_LanguageTabExperienceArea:{
        height:'20%',
        width:'100%',
        backgroundColor:'blue',
        alignItems:'flex-end',
        justifyContent:'center'
    },
    SE_Skills_LanguageTabTitle:{
        height:'80%',
        width:'100%', 
        backgroundColor:'pink',
        justifyContent:'center'
    },
})