import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {DISHES} from '../shared/dishes.js';
import {LEADERS} from '../shared/leaders.js';
import {PROMOTIONS} from '../shared/promotions.js';
import { Card } from 'react-native-elements';
import {Text, View, ScrollView} from 'react-native';


const Homepage=createStackNavigator();

function RenderItem(props){
    const item=props.item;
    if(item!=null){
        return(
            <Card
            featuredTitle={item.name}
            featuredSubtitle={item.designation}
            image={require('./images/uthappizza.png')}
            >
                <Text style={{margin:10}}>{item.description}</Text>
            </Card>
        );
    }
    else{
        return(
            <View></View>
        );
    }
}

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dishes: DISHES,
            promotions: PROMOTIONS,
            leaders: LEADERS
        };
    }
    render(){
        return(
            <ScrollView>
                <RenderItem item={this.state.dishes.filter(dish=>dish.featured)[0]} />
                <RenderItem item={this.state.promotions.filter(promo=>promo.featured)[0]} />
                <RenderItem item={this.state.leaders.filter(leader=>leader.featured)[0]} />
            </ScrollView>
        );
    }
}


function HomePage(props){
    return(<Homepage.Navigator initialRouteName='Home'
    screenOptions={{
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            color: "#fff"            
        }
    }}>
  <Homepage.Screen name="Home" component={Home} />
  </Homepage.Navigator>
  );
}

export default HomePage;