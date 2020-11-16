import React from 'react';
import { View, Text } from 'react-native';
import {Card} from 'react-native-elements';

function RenderDish(props){
    const dish=props.dish;
    if(dish!=null){
        return(
            <Card
                featuredTitle={dish.name}
                image={require('./images/uthappizza.png')}     
                style={{margin: 10}}       
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

function DishDetail(props){
    return(<RenderDish dish={props.selectedDish} />);
}

export default DishDetail;