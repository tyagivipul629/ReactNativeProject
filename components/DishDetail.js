import React from 'react';
import { View, Text, FlatList, Modal, Button, Alert, PanResponder, Share} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {Input} from 'react-native-elements';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {baseUrl} from '../shared/baseUrl.js';
import { connect } from 'react-redux';
import { postFavorite, postComment, removeFavorite, deleteComment, editComment} from '../redux/ActionCreators.js';
import StarRating from 'react-native-star-rating';
import * as Animatable from 'react-native-animatable';
import NetInfo from '@react-native-community/netinfo';

class RenderDish extends React.Component{
    constructor(props){
        super(props);
        
    }

    handleViewRef = (ref) => this.view = ref;

    shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        },{
            dialogTitle: 'Share ' + title
        })
    }

    render(){
        const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
            if ( dx < -200 )
                return true;
            else
                return false;
        }

        const recognizeComment=({moveX, moveY, dx, dy}) => {
            if ( dx > 200 )
                return true;
            else
                return false;
        }
    
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => {
                return true;
            },
            onPanResponderGrant: () => {this.view.rubberBand(1000).then(endState => {});},
            onPanResponderEnd: (e, gestureState) => {
                if (recognizeDrag(gestureState))
                    Alert.alert(
                        'Add Favorite',
                        'Are you sure you wish to add ' + dish.name + ' to favorite?',
                        [
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => {this.props.favorite ? console.log('Already favorite') : this.props.addFavorite(dish.id)}},
                        ],
                        { cancelable: false }
                    );
                if(recognizeComment(gestureState))
                        this.props.toggleModal();
    
                return true;
            }
        })
    const dish=this.props.dish;
    if(dish!=null){
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000} ref={this.handleViewRef}
            {...panResponder.panHandlers}>
            <Card          
            >
                <Card.Title>{dish.name}</Card.Title>
                <Card.Image source={{uri: baseUrl+dish.image}} />
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
                    type='font-awesome' 
                    color='#f50'
                    onPress={()=>{this.props.toggleModal()}}/>
            <Icon
                            raised
                            reverse
                            name='share'
                            type='font-awesome'
                            color='#51D2A8'
                            onPress={() => this.shareDish(dish.name, dish.description, baseUrl + dish.image)} />
            </View>    
            </Card>
            </Animatable.View>
        );
    }
    else{
        return(<View></View>)
    }}
}


class RenderComments extends React.Component{

    constructor(props){
        super(props);
        this.state={
            showModal: false,
            author: '',
            comment: '',
            rating: 1,
            id: -1,
            dishId: -1,
            netConnected: true,
        };
    }

    handleDelete(index,dispatch){
        dispatch(deleteComment(index));
    }

    toggleModal(){
        this.setState({showModal: !this.state.showModal});
    }

    handleEdit(comment){
        this.setState({id: comment.id, author: comment.author, rating: comment.rating, comment: comment.comment,dishId: comment.dishId},()=>this.toggleModal());
    }

    handleEditSubmit(){
        var comment={
            id: this.state.id,
            author: this.state.author,
            comment: this.state.comment,
            rating: this.state.rating,
            dishId: this.state.dishId
        }
        this.props.dispatch(editComment(comment));
    }

    onStarRatingPress(rating) {
        this.setState({
          rating: rating
        });
      }

      componentDidMount(){
        NetInfo.fetch().then(state =>{this.setState({netConnected: state.isConnected})});
        NetInfo.addEventListener(state => {
            this.setState({netConnected: state.isConnected})
          });
    }

    render(){
        
    const comments=this.props.comments;

    const renderItem=({item, index})=>(
        <View key={index} style={{margin: 10}} style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
                {this.props.UserState.username===item.author&&<View style={{flexDirection: 'row'}}><TouchableOpacity
      style={{
        marginTop: 10,
        height: 30,
        width: 50
      }}
    >
      <Text style={{ fontSize: 15, color: "cornflowerblue" }} onPress={()=>this.handleDelete(item.id,this.props.dispatch)}>Delete</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={{
        marginTop: 10,
        height: 30,
        width: 50
      }}
    >
      <Text style={{ fontSize: 15, color: "cornflowerblue" }} onPress={()=>{this.handleEdit({id: item.id, author: item.author,comment: item.comment, rating: item.rating, dishId: item.dishId})}} >Edit</Text>
    </TouchableOpacity></View>}
        </View>
    )

    return(

        <>
        
        <Card>
            <Card.Title>Comments</Card.Title>
        <FlatList 
            data={comments}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            />
        </Card>
        <Modal animationType = {"slide"} transparent = {false} 
        visible = {this.state.showModal} 
        onDismiss = {() => this.toggleModal() }
        onRequestClose = {() => this.toggleModal() }>
            <View style={{flexDirection: 'column', paddingBottom: 10}}>
        <Text style={{justifyContent: 'center', textAlign: 'center', fontSize: 30, color: '#f1c40f'}}>{this.state.rating}/5</Text>
            <StarRating
            disabled={false}
            maxStars={5}
            rating={this.state.rating}
            emptyStarColor='#f1c40f'
            fullStarColor='#f1c40f'
            selectedStar={(rating) => this.onStarRatingPress(rating)}
        /></View>
        <View style={{flexDirection: 'column',justifyContent: 'center',paddingBottom: 20}}>
        <Input
            placeholder='author'
            value={this.state.author}
            disabled={true}
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
                onPress = {() =>{
                    if(!this.state.netConnected){
                        Alert.alert(
                            'You are offline!',
                            ' Turn on data',
                            [
                                {
                                    text: 'Ok',
                                    onPress:()=>{}
                                }
                            ],{cancelable: false}
                        );
                    }
                    else{this.handleEditSubmit(); this.toggleModal();}
                     }}
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
                </>
        
    );}
}

class DishDetail extends React.Component{

    constructor(props){
        super(props);
        this.state={
            showModal: false,
            author: this.props.UserState.username,
            comment: '',
            starCount: 1,
            netConnected: true
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

    componentDidMount(){
        NetInfo.fetch().then(state =>{this.setState({netConnected: state.isConnected})});
        NetInfo.addEventListener(state => {
            this.setState({netConnected: state.isConnected})
          });
    }

    render(){
        
    const selectedDishId=this.props.route.params.id;
    return(<ScrollView><RenderDish dish={this.props.dishes.filter(item=>item.id===selectedDishId)[0]} addFavorite={
        (dishId)=>this.markFavorite(dishId)
    } deleteFavorite={(dishId)=>this.removeFavorite(dishId)} favorite={this.props.favorite.includes(selectedDishId)} toggleModal={()=>this.toggleModal()}/>
            <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
                <RenderComments comments={this.props.comments.filter((comment)=>comment.dishId===selectedDishId)} dispatch={this.props.dispatch} UserState={this.props.UserState} /></Animatable.View>


            <Modal animationType = {"slide"} transparent = {false} 
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
                disabled={true}
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
                    onPress = {() =>{
                        if(!this.state.netConnected){
                            Alert.alert(
                                'You are offline!',
                                ' Turn on data',
                                [
                                    {
                                        text: 'Ok',
                                        onPress:()=>{}
                                    }
                                ],{cancelable: false}
                            );
                        }
                        else{this.handleComment(selectedDishId); this.toggleModal();}
                         }}
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
        favorite: state.favorite,
        UserState: state.UserState
    }
}

export default connect(mapStateToProps)(DishDetail);