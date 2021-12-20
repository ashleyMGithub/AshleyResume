import React from 'react'
import { View, StyleSheet,Text, Dimensions } from 'react-native'

const AppStyles = require('../../../assets/App-assets/AppStyles.js')
const DimData = Dimensions.get("window")
const interest_amount = 4

function min(number_one, number_two){
    return (number_one>number_two) ? number_two : number_one
}

function displayInterests(InterestData){
    interest_length = InterestData.Interests.length
    interest_array = ['','','','']
    interest_matrix = []
    interest_index = 0
    interest_iteration = Math.floor(interest_length/interest_amount)
    let second_iteration_limit = min(interest_amount, interest_length-interest_index)
    let view = []

    for(let iteration = 0; iteration<interest_iteration; iteration++){
        interest_matrix.push(interest_array)
        for(let iteration_two=0; iteration_two<second_iteration_limit; iteration_two++){
            interest_matrix[iteration][iteration_two] = InterestData.Interests[interest_index].name
            interest_index++
        }
        view.push(getInterestView(interest_matrix[iteration], iteration))
        second_iteration_limit = min(interest_amount, interest_length-interest_index)
    }
    return view
}

function getInterestView(interest_array, key){
    return(
            <View style={InterestStyle.AboutMe_SectorHeader_InterestsInterim} key={key}>
                <View style={InterestStyle.Home_InterestsIterimTextSector_InterestArea}>
                    <View style={InterestStyle.Home_InterestsIterimTextSector_Interest}>
                        <View style={InterestStyle.Home_InterestsIterimTextSector_InterestPhotoArea}>
                            <View style={InterestStyle.Home_InterestsIterimTextSector_InterestPhoto}>
                                <Text>[Insert picture here]</Text>
                            </View>
                        </View>
                        <View style={InterestStyle.Home_InterestsIterimTextSector_InterestTextArea}>
                            <Text>{interest_array[0]}</Text>
                        </View>
                    </View>
                    <View style={InterestStyle.Home_InterestsIterimTextSector_Interest}>
                        <View style={InterestStyle.Home_InterestsIterimTextSector_InterestPhotoArea}>
                            <View style={InterestStyle.Home_InterestsIterimTextSector_InterestPhoto}>
                                <Text>[Insert picture here]</Text>
                            </View>
                        </View>
                        <View style={InterestStyle.Home_InterestsIterimTextSector_InterestTextArea}>
                            <Text>{interest_array[1]}</Text>
                        </View>
                    </View>
                </View>
                <View style={InterestStyle.Home_InterestsIterimTextSector_InterestArea}>
                    <View style={InterestStyle.Home_InterestsIterimTextSector_Interest}>
                        <View style={InterestStyle.Home_InterestsIterimTextSector_InterestPhotoArea}>
                            <View style={InterestStyle.Home_InterestsIterimTextSector_InterestPhoto}>
                                <Text>[Insert picture here]</Text>
                            </View>
                        </View>
                        <View style={InterestStyle.Home_InterestsIterimTextSector_InterestTextArea}>
                            <Text>{interest_array[2]}</Text>
                        </View>
                    </View>
                    <View style={InterestStyle.Home_InterestsIterimTextSector_Interest}>
                        <View style={InterestStyle.Home_InterestsIterimTextSector_InterestPhotoArea}>
                            <View style={InterestStyle.Home_InterestsIterimTextSector_InterestPhoto}>
                                <Text>[Insert picture here]</Text>
                            </View>
                        </View>
                        <View style={InterestStyle.Home_InterestsIterimTextSector_InterestTextArea}>
                            <Text style>{interest_array[3]}</Text>
                        </View>
                    </View>
                </View>
            </View>
    )
}


export default function InterestInterim(InterestData){
    let view = displayInterests(InterestData)
    return view
}

const InterestStyle = StyleSheet.create({
    AboutMe_SectorHeader_InterestsInterim:{
        width: DimData.width,
        height:'100%',
        backgroundColor: AppStyles.page_colour.mild_peach,
        flexDirection: 'row',
        paddingRight: '2.5%'
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
        alignItems:'center',
        justifyContent:'center',
    },
    Home_InterestsIterimTextSector_InterestPhoto:{
        width:'80%',
        height:'80%',
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
    },
    Home_InterestsIterimTextSector_InterestTextArea:{
        height: '100%',
        width: '60%',
        alignItems:'center',
        justifyContent:'center',
    },
})