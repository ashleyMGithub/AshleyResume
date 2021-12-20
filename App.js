import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Screens
import HomeScreen from './Screens/HomeScreen.js';


const AppStack = createStackNavigator();
const window_width = Dimensions.get("window").width;

function generateExperienceData(){
  console.log("Hello Experience")
  let data = []
  let job_amount = 5
  for(let index=0; index<=job_amount; index++){
      data.push({"x": index * window_width})
  }
  console.log(data)
  return data
}

const createHomeStack = () => 
<AppStack.Navigator>
  <AppStack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
</AppStack.Navigator>

export default function App() {
  return (
      <NavigationContainer>
        <AppStack.Navigator>
          <AppStack.Screen name="HOME" children={createHomeStack} options={{headerShown:false}}>
          {(props) => <HomeScreen experienceData={generateExperienceData()}/>}
          </AppStack.Screen>
        </AppStack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
