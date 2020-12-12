import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { ListItem, Avatar, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl.js';
import Loading from './LoadingComponent.js';
import * as Animatable from 'react-native-animatable';

function Description(props){
    return(
        <><Text>{props.description}</Text>
        </>
    );
}
class Menu extends React.Component {
    constructor(props){
        super(props);
        
    }
    render(){
        const renderMenuItem = ({item, index}) => {

            return (
                    <>
                      <ListItem onPress={()=>this.props.
                            navigation.navigate('DishDetails',{id: item.id})} >
    <Avatar source={{uri: baseUrl+item.image}} />
    <ListItem.Content>
      <ListItem.Title>{item.name}</ListItem.Title>
      <ListItem.Subtitle><Description description={item.description} /></ListItem.Subtitle>
    </ListItem.Content>
    <ListItem.Chevron />
  </ListItem>
                      </>
            );
        };
        if(this.props.dishes.isLoading){
            return(
                <Loading />
            );
        }
        else if(this.props.dishes.errMess&&this.props.dishes.dishes.length===0){
            return(
            <Text>{this.props.dishes.errMess}</Text>
            );
        }
        return (
            <Animatable.View animation="fadeInDown" duration={1000} delay={500}>
                <FlatList 
                    data={this.props.dishes.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Animatable.View>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        dishes: state.dishes
    }
}

export default connect(mapStateToProps)(Menu);