import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Card } from 'react-native-elements';
import {Text, View, Animated, Easing} from 'react-native';
import {Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';


const Homepage=createStackNavigator();

function RenderItem(props){
    if (props.isLoading) {
        return(
                <Loading />
        );
    }
    else if (props.errMess) {
        return(
            <View> 
                <Text>{props.erreMess}</Text>
            </View>
        );
    }
    else{
    const item=props.item;
    if(item!=null){
        return(
            <Card
            featuredTitle={item.name}
            featuredSubtitle={item.designation}
            image={{uri: baseUrl+item.image}}
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
}

class Home extends React.Component{
    constructor(props){
        super(props);
        this.animatedValue=new Animated.Value(0);
    }

    componentDidMount(){
        this.animate();
    }
    animate(){
        this.animatedValue.setValue(0);
        Animated.timing(
           this.animatedValue,
           {
               toValue: 8,
               duration: 10000,
               easing: Easing.linear,
               useNativeDriver: true
           } 
        ).start(()=>this.animate())
    }

    render(){
        const xpos1=this.animatedValue.interpolate({
            inputRange: [0,1,3,5,8],
            outputRange: [1000, 500, 0, -500, -1000]
        });
        const xpos2=this.animatedValue.interpolate({
            inputRange: [0,2,4,6,8],
            outputRange: [1200, 600, 0, -600, -1200]
        });
        const xpos3=this.animatedValue.interpolate({
            inputRange: [0,3,5,7,8],
            outputRange: [1200, 600, 0, -600, -1200]
        });
        return(
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                <Animated.View style={{width: '100%',transform: [{translateX: xpos1}]}}><RenderItem item={this.props.dishes.dishes.filter(dish=>dish.featured)[0]} isLoading={this.props.dishes.isLoading} /></Animated.View>
                <Animated.View style={{width: '100%',transform: [{translateX: xpos2}]}}><RenderItem item={this.props.promotions.promotions.filter(promo=>promo.featured)[0]} isLoading={this.props.promotions.isLoading} /></Animated.View>
                <Animated.View style={{width: '100%',transform: [{translateX: xpos3}]}}><RenderItem item={this.props.leaders.leaders.filter(leader=>leader.featured)[0]} isLoading={this.props.leaders.isLoading} /></Animated.View>
            </View>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
      dishes: state.dishes,
      promotions: state.promotions,
      leaders: state.leaders
    }
}

const ConnectedHome=connect(mapStateToProps)(Home);

function HomePage(props){
    return(<Homepage.Navigator initialRouteName='Home'
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
  <Homepage.Screen name="Home" component={ConnectedHome} />
  </Homepage.Navigator>
  );
}

export default HomePage;