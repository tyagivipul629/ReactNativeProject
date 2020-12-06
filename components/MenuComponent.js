import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl.js';
import Loading from './LoadingComponent.js';
import * as Animatable from 'react-native-animatable';
class Menu extends React.Component {
    constructor(props){
        super(props);
        
    }
    render(){
        const renderMenuItem = ({item, index}) => {

            return (
                    <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        onPress={()=>this.props.
                            navigation.navigate('DishDetails',{id: item.id})}
                        leftAvatar={{ uri: baseUrl+item.image}}
                      />
            );
        };
        if(this.props.dishes.isLoading){
            return(
                <Loading />
            );
        }
        else if(this.props.dishes.errMess){
            return(
            <Text>{this.props.dishes.errMess}</Text>
            );
        }
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
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