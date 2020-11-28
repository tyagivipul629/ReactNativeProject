import React from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl.js';

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
        return (
                <FlatList 
                    data={this.props.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    />
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        dishes: state.dishes.dishes
    }
}

export default connect(mapStateToProps)(Menu);