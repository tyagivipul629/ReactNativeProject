import React from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import {DISHES} from '../shared/dishes.js';

class Menu extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dishes: DISHES
        }
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
                        leftAvatar={{ source: require('./images/uthappizza.png')}}
                      />
            );
        };
        return (
                <FlatList 
                    data={this.state.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    />
        );
    }
}


export default Menu;