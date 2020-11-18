import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishDetail.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {View, Text} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomePage from './HomePage.js';
import ContactComponent from './ContactComponent.js';
import AboutComponent from './AboutComponent.js';


const Stack = createStackNavigator();
const Drawer=createDrawerNavigator();


function MenuNavigator(props){
  return(<Stack.Navigator initialRouteName='Menu'
  screenOptions={{
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
          color: "#fff"            
      }
  }}>
<Stack.Screen name="Menu" component={Menu} />
<Stack.Screen name="DishDetails" component={DishDetail} />
</Stack.Navigator>);
}

class Main extends Component {
  
  render() {
 
    return (
      <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomePage} />
        <Drawer.Screen name="Menu" component={MenuNavigator} />
        <Drawer.Screen name="Contact Us" component={ContactComponent} />
        <Drawer.Screen name="About Us" component={AboutComponent} />
      </Drawer.Navigator>
    </NavigationContainer>
    );
  }
}
  
export default Main;