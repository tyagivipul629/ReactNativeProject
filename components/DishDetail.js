import React from 'react';
import { View, Text } from 'react-native';
import {Card} from 'react-native-elements';
import {DISHES} from '../shared/dishes.js';

function RenderDish(props){
    const dish=props.dish;
    if(dish!=null){
        return(
            <Card
                featuredTitle={dish.name}
                image={require('./images/uthappizza.png')}     
                style={{margin: 12}}       
            >
                <Text>
                    {dish.description}
                </Text>
            </Card>
        );
    }
    else{
        return(<View></View>)
    }
}

class DishDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            dishes: DISHES
        }
    }
    
    render(){
    const selectedDishId=this.props.route.params.id;
    return(<RenderDish dish={this.state.dishes.filter(item=>item.id===selectedDishId)[0]} />);
    }
}

export default DishDetail;