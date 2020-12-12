import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetail.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, SafeAreaView } from '@react-navigation/stack';
import {View, Text, StyleSheet, Button} from 'react-native';
import {createDrawerNavigator, DrawerItemList, DrawerItems, DrawerContentScrollView} from '@react-navigation/drawer';
import HomePage from './HomePage.js';
import ContactComponent from './ContactComponent.js';
import AboutComponent from './AboutComponent.js';
import Reservation from './ReservationComponent.js';
import {Icon} from 'react-native-elements';
import { Image} from 'react-native';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders, logoutUser } from '../redux/ActionCreators';
import FavoritesComponent from './FavoritesComponent.js';
import TestComponent from './testComponent';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import LoginComponent from './LoginComponent.js';
import { UserState } from '../redux/UserState';




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
      },
      headerLeft: ()=>(<Icon name="list" type="font-awesome" size={22} color="white" 
      containerStyle={{paddingLeft: 10}} onPress={()=>props.navigation.toggleDrawer()}/>)
      
  }}>
<Stack.Screen name="Menu" component={Menu} />
<Stack.Screen name="DishDetails" component={DishDetail} />
</Stack.Navigator>);
}

const CustomDrawerContentComponent = (props) => {
  return (<DrawerContentScrollView>
    <View style={{flexDirection: 'column',justifyContent: 'center', alignItems: 'center'}}>
      <View style={styles.drawerHeader}>
        <View style={{flex:1}}>
          <Image source={require('./logo.png')} style={styles.drawerImage} />
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <View style={{backgroundColor: '#512DA8', alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center'}}><Text style={{fontSize: 25, color: 'white'}}>{props.username}</Text></View>
      </View>
    <DrawerItemList {...props} />
    <View><Button title='Logout' buttonStyle={{backgroundColor: '#42cef5'}} onPress={()=>props.dispatch(logoutUser())} /></View>
  </DrawerContentScrollView>)
  
};

class Main extends Component {

  constructor(props){
    super(props);
    this.state={
      loggedIn: false
    }
  }
  
  componentDidMount() {
    this.props.dispatch(fetchComments());
    this.props.dispatch(fetchLeaders()); 
    this.props.dispatch(fetchPromos());
    this.props.dispatch(fetchDishes());
    NetInfo.addEventListener(state => {
      if(state.isConnected){
        this.props.dispatch(fetchComments());
    this.props.dispatch(fetchLeaders()); 
    this.props.dispatch(fetchPromos());
    this.props.dispatch(fetchDishes());
      }
    });
    
  }

  
  render() {
 
    if(!this.props.UserState.isLoggedIn){
        return(
          <LoginComponent />
        );
      }
    else{
        return(<NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" drawerStyle={{
    width: 240,
  }} drawerContent={(props)=><CustomDrawerContentComponent {...props} dispatch={this.props.dispatch} username={this.props.UserState.username} />}>
        <Drawer.Screen name="Home" component={HomePage} options={{
          title: 'Home',
          drawerIcon: ({focused, size}) => (
            <Icon
              name="home"
              type="font-awesome"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          )
        }}/>
        <Drawer.Screen name="Menu" component={MenuNavigator} options={{
          title: 'Menu',
          drawerIcon: ({focused, size}) => (
            <Icon
              name="list"
              type="font-awesome"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          )
        }}/>
        <Drawer.Screen name="Contact Us" component={ContactComponent} options={{
          title: 'Contact',
          drawerIcon: ({focused, size}) => (
            <Icon
              name="address-card"
              type="font-awesome"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          )
        }}/>
        <Drawer.Screen name="About Us" component={AboutComponent} options={{
          title: 'About Us',
          drawerIcon: ({focused, size}) => (
            <Icon
              name="info-circle"
              type="font-awesome"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          )
        }}/>
        <Drawer.Screen name="Favorites" component={FavoritesComponent} options={{
          title: 'Favorites',
          drawerIcon: ({focused, size}) => (
            <Icon
              name="heart"
              type="font-awesome"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          )
        }}/>
        <Drawer.Screen name="Reservation" component={Reservation} options={{
          title: 'Reservation',
          drawerIcon: ({focused, size}) => (
            <Icon
              name="cutlery"
              type="font-awesome"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          )
        }}/>
        <Drawer.Screen name="TestComponent" component={TestComponent} options={{
          title: 'Users',
          drawerIcon: ({focused, size}) => (
            <Icon
              name="user-circle-o"
              type="font-awesome"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          )
        }}/>
      </Drawer.Navigator>
    </NavigationContainer>)
      }
      
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

const mapStateToProps=(state)=>{
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    UserState: state.UserState
  }
}
  
export default connect(mapStateToProps)(Main);