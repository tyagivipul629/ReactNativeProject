import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishDetail.js';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, SafeAreaView } from '@react-navigation/stack';
import {View, Text, StyleSheet} from 'react-native';
import {createDrawerNavigator, DrawerItemList, DrawerItems, DrawerContentScrollView} from '@react-navigation/drawer';
import HomePage from './HomePage.js';
import ContactComponent from './ContactComponent.js';
import AboutComponent from './AboutComponent.js';
import Reservation from './ReservationComponent.js';
import {Icon} from 'react-native-elements';
import { Image} from 'react-native';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import FavoritesComponent from './FavoritesComponent.js';
import TestComponent from './testComponent';




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
    
      <View style={styles.drawerHeader}>
        <View style={{flex:1}}>
        <Image source={require('./logo.png')} style={styles.drawerImage} />
        </View>
        <View style={{flex: 2}}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
    <DrawerItemList {...props} />
  </DrawerContentScrollView>)
  
};

class Main extends Component {
  
  componentDidMount() {
    this.props.dispatch(fetchDishes());
    this.props.dispatch(fetchComments());
    this.props.dispatch(fetchPromos());
    this.props.dispatch(fetchLeaders());

    
  }
  
  render() {
 
    return (
      <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home" drawerStyle={{
    width: 240,
  }} drawerContent={(props)=><CustomDrawerContentComponent {...props} />}>
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
          title: 'TestComponent',
          drawerIcon: ({focused, size}) => (
            <Icon
              name="cutlery"
              type="font-awesome"
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          )
        }}/>
      </Drawer.Navigator>
    </NavigationContainer>
    );
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
    leaders: state.leaders
  }
}
  
export default connect(mapStateToProps)(Main);