import React from 'react';
import { View, Text, FlatList} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {baseUrl} from '../shared/baseUrl.js';
import { connect } from 'react-redux';

function RenderDish(props){
    const dish=props.dish;
    if(dish!=null){
        return(
            <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}     
                style={{margin: 12}}       
            >
                <Text>
                    {dish.description}
                </Text>
                <Icon
                    raised
                    reverse
                    name={ props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress(dish.id)}
                    />
            </Card>
        );
    }
    else{
        return(<View></View>)
    }
}

function RenderComments(props){
    const comments=props.comments;

    const renderItem=({item, index})=>(
        <View key={index} style={{margin: 10}} style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
        </View>
    )

    return(
        <ScrollView>
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
        </ScrollView>
    );
}

class DishDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            favorites: []
        }
    }

    markFavorite=(dishId) =>{
        this.setState({favorites: this.state.favorites.concat(dishId)});
    }
    
    render(){
    const selectedDishId=this.props.route.params.id;
    return(<><RenderDish dish={this.props.dishes.filter(item=>item.id===selectedDishId)[0]} onPress={
        (dishId)=>this.markFavorite(dishId)
    } favorite={this.state.favorites.some((item)=>item===selectedDishId)} />
            <RenderComments comments={this.props.comments.filter((comment)=>comment.dishId===selectedDishId)} /></>);
    }
}

const mapStateToProps=(state)=>{
    return{
        dishes: state.dishes.dishes,
        comments: state.comments.comments
    }
}

export default connect(mapStateToProps)(DishDetail);