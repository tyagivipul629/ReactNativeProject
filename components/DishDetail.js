import React from 'react';
import { View, Text, FlatList} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {baseUrl} from '../shared/baseUrl.js';
import { connect } from 'react-redux';
import { postFavorite, excludeFavorite } from '../redux/ActionCreators.js';

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
                    onPress={() => props.favorite ?  props.deleteFavorite(dish.id): props.addFavorite(dish.id)}
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

    markFavorite=(dishId)=>{
        this.props.dispatch(postFavorite(dishId));
    }

    removeFavorite=(dishId)=>{
        this.props.dispatch(excludeFavorite(dishId));
    }

    render(){
        console.log(this.props.favorite);
    const selectedDishId=this.props.route.params.id;
    return(<><RenderDish dish={this.props.dishes.filter(item=>item.id===selectedDishId)[0]} addFavorite={
        (dishId)=>this.markFavorite(dishId)
    } deleteFavorite={(dishId)=>this.removeFavorite(dishId)} favorite={this.props.favorite.includes(selectedDishId)} />
            <RenderComments comments={this.props.comments.filter((comment)=>comment.dishId===selectedDishId)} /></>);
    }
}

const mapStateToProps=(state)=>{
    return{
        dishes: state.dishes.dishes,
        comments: state.comments.comments,
        favorite: state.favorite
    }
}

export default connect(mapStateToProps)(DishDetail);