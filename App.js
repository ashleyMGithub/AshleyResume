import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Screens
import HomeScreen from './Screens/HomeScreen.js';


const AppStack = createStackNavigator();

const createHomeStack = () => 
<AppStack.Navigator>
  <AppStack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
</AppStack.Navigator>

export default function App() {
  return (
      <NavigationContainer>
        <AppStack.Navigator>
          <AppStack.Screen name="HOME" children={createHomeStack} options={{headerShown:false}}/>
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
