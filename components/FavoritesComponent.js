import React from 'react';
import {View, Text, FlatList, Alert} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {Card, ListItem} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent.js';
import Swipeout from 'react-native-swipeout';
import {removeFavorite} from '../redux/ActionCreators.js';
import * as Animatable from 'react-native-animatable';

class Favorites extends React.Component{
    render(){
        const renderMenuItem=({item,index})=>{
            const rightButton=[{
                text: 'Delete',
                type: 'delete',
                onPress:()=>{
                    Alert.alert(
                        'Delete Favorite?',
                        'Are you sure you wish to delete the favorite dish '+item.name+'?',
                        [
                            {
                                text: 'Cancel',
                                onPress:()=>{}
                                
                            },
                            {
                                text: 'Ok',
                                onPress:()=>this.props.dispatch(removeFavorite(item.id))
                            }
                        ],{cancelable: false}
                    );
                }
            }]
            return (
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Swipeout right={rightButton} autoClose={true}>
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    onPress={()=>this.props.
                        navigation.navigate('DishDetails',{id: item.id})}
                    leftAvatar={{ uri: baseUrl+item.image}}
                  />
                </Swipeout>
                </Animatable.View>
        );
        }
        if(this.props.dishes.isLoading){
            return(<Loading />);
        }
        else if(this.props.dishes.errMess){
            return(
            <View><Text>{this.props.dishes.errMess}</Text></View>
            );
        }
        else{
            return(
                <FlatList
                data={this.props.dishes.dishes.filter(dish=>this.props.favorites.includes(dish.id))}
                renderItem={renderMenuItem}
                keyExtractor={item=>item.id.toString()} 
                />
            );
        }
    }
}

const mapStateToProps=(state)=>{
    return{
        dishes: state.dishes,
        favorites: state.favorite
    }
}

const FavoriteComp=connect(mapStateToProps)(Favorites);
const FavoritesComp=createStackNavigator();

function FavoritesComponent(props){
    return(
        <FavoritesComp.Navigator initialRouteName='Favorites'
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
  <FavoritesComp.Screen name="Favorites" component={FavoriteComp} options={{title: 'Favorites'}}/>
  </FavoritesComp.Navigator>
    );
}

export default FavoritesComponent;