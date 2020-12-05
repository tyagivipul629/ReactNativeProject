import React from 'react';
import { View, Text, FlatList, Modal, Button} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {Input} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {baseUrl} from '../shared/baseUrl.js';
import { connect } from 'react-redux';
import { postFavorite, postComment } from '../redux/ActionCreators.js';
import StarRating from 'react-native-star-rating';
import * as Animatable from 'react-native-animatable';

class RenderDish extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
    const dish=this.props.dish;
    if(dish!=null){
        return(
            <>
            <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}     
                style={{margin: 12}}       
            >
                <Text>
                    {dish.description}
                </Text>
                <View style={{flexDirection: 'row'}}>
                <Icon
                    raised
                    reverse
                    name={ this.props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => this.props.favorite ?  this.props.deleteFavorite(dish.id): this.props.addFavorite(dish.id)}
                    />
            <Icon
                    raised
                    reverse
                    name='pencil'
                    type='font-awesome' // Icon that will trigger opening of Modal
                    color='#f50'
                    onPress={()=>{this.props.toggleModal()}}/>
            </View>    
            </Card>
            </>
        );
    }
    else{
        return(<View></View>)
    }}
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
        
        <Card title='Comments' >
        <FlatList 
            data={comments}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
        
    );
}

class DishDetail extends React.Component{

    constructor(props){
        super(props);
        this.state={
            showModal: false,
            author: '',
            comment: '',
            starCount: 1
        }
    }

    toggleModal(){
        this.setState({showModal: !this.state.showModal});
    }

    markFavorite=(dishId)=>{
        this.props.dispatch(postFavorite(dishId));
    }

    removeFavorite=(dishId)=>{
        this.props.dispatch(removeFavorite(dishId));
    }

    onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
      }

    handleComment(dishId){
        this.props.dispatch(postComment(dishId,this.state.author,this.state.comment,this.state.starCount))
    }

    render(){
    const selectedDishId=this.props.route.params.id;
    return(<ScrollView><Animatable.View animation="fadeInDown" duration={2000} delay={1000}><RenderDish dish={this.props.dishes.filter(item=>item.id===selectedDishId)[0]} addFavorite={
        (dishId)=>this.markFavorite(dishId)
    } deleteFavorite={(dishId)=>this.removeFavorite(dishId)} favorite={this.props.favorite.includes(selectedDishId)} toggleModal={()=>this.toggleModal()}/></Animatable.View>
            <Animatable.View animation="fadeInUp" duration={2000} delay={1000}><RenderComments comments={this.props.comments.filter((comment)=>comment.dishId===selectedDishId)} /></Animatable.View>


            <Modal animationType = {"slide"} transparent = {false} //modal that contains the form
            visible = {this.state.showModal} 
            onDismiss = {() => this.toggleModal() }
            onRequestClose = {() => this.toggleModal() }>
                <View style={{flexDirection: 'column', paddingBottom: 10}}>
            <Text style={{justifyContent: 'center', textAlign: 'center', fontSize: 30, color: '#f1c40f'}}>{this.state.starCount}/5</Text>
                <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.starCount}
                emptyStarColor='#f1c40f'
                fullStarColor='#f1c40f'
                selectedStar={(rating) => this.onStarRatingPress(rating)}
            /></View>
            <View style={{flexDirection: 'column',justifyContent: 'center',paddingBottom: 20}}>
            <Input
                placeholder='author'
                value={this.state.author}
                leftIcon={
                    <Icon
                    name='user'
                    type='font-awesome'
                    size={24}
                    color='black'
                    />
                }
                onChangeText={(value)=>{this.setState({author: value})}}
                />
                <Input
                placeholder='comment'
                value={this.state.comment}
                leftIcon={
                    <Icon
                    name='comment'
                    type='font-awesome'
                    size={24}
                    color='black'
                    />
                }
                onChangeText={(value)=>{this.setState({comment: value})}}
                />
            </View>
                <View style={{flexDirection: 'column',justifyContent: 'center',paddingBottom: 20}}>
                <Button 
                    onPress = {() =>{this.handleComment(selectedDishId); this.toggleModal(); }}
                    color="#512D67"
                    title="Submit" 
                    />
                    </View>
                <Button 
                    onPress = {() =>{this.toggleModal(); }}
                    color="#c0c0c0"
                    title="Cancel" 
                    style={{position: 'relative',top: 20}}
                    />
            </Modal>
            
            </ScrollView>);
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