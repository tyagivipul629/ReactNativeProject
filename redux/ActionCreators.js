import * as ActionTypes from './ActionTypes.js';
import { baseUrl } from '../shared/baseUrl.js';
import AsyncStorage from '@react-native-community/async-storage';

export const fetchComments = () => (dispatch) => {

    
    fetch(baseUrl + 'comments')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};


export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const fetchDishes = () => (dispatch) => {


    fetch(baseUrl + 'dishes')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            var errmess = new Error(error.message);
            throw errmess;
      })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
};

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchPromos = () => (dispatch) => {
    

    fetch(baseUrl + 'promotions')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
};


export const promosFailed = (errmess) => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});

export const fetchLeaders = () => (dispatch) => {
    

    fetch(baseUrl + 'leaders')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
};


export const leadersFailed = (errmess) => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});

export const postFavorite=(dishId)=>(dispatch)=>{
    setTimeout(()=>{
        dispatch(addFavorite(dishId));
    },1000);
}

addFavorite=(dishId)=>({
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId
})

export const removeFavorite=(dishId)=>({
    type: ActionTypes.DELETE_FAVORITE,
    payload: dishId
})

export const postComment=(dishId,author,comment,rating)=>(dispatch)=>{
    const date=new Date().toISOString();
    const newComment={
        dishId: dishId,
        author: author,
        comment: comment,
        rating: rating,
        date: new Date().toISOString()
    }

    fetch(baseUrl+'comments',{
        method: 'POST',
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(newComment),
        credentials: "same-origin"
    }).then(response=>{
        if(response.ok) return response
        else{
            var error=new Error('Error '+response.status+': '+response.statusText);
            error.response=response;
            throw error;
        }
    },error=>{throw error;}).then(response=>{dispatch(addComment(newComment))}).catch(error=>{console.log(error);})
    
}

export const addComment=(args)=>({
    type: ActionTypes.ADD_COMMENT,
    payload: {dishId: args.dishId, author: args.author, comment: args.comment, rating: args.rating, date: args.date}
})

export const deleteComment=(commentId)=>(dispatch)=>{
    console.log(commentId);
    fetch(baseUrl+'comments/'+commentId,{
        method: 'DELETE',
        credentials: 'same-origin'
    }).then(response=>{
        if(response.ok) return response
        else{
            var error=new Error('Error '+response.status+': '+response.statusText);
            error.response=response;
            throw error;
        }
    },error=>{throw error;}).then(res=>{dispatch(DeleteComment(commentId))}).catch(err=>{console.log(err)})
}

DeleteComment=(commentId)=>({
    type: ActionTypes.DELETE_COMMENT,
    payload: commentId
})

EditComment=(comment)=>({
    type: ActionTypes.EDIT_COMMENT,
    payload: comment
})

export const editComment=(comment)=>(dispatch)=>{
    comment.date=new Date().toISOString();
    fetch(baseUrl+'comments/'+comment.id,{
        method: 'PUT',
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(comment),
        credentials: 'same-origin'
    }).then(response=>{
        if(response.ok) return response
        else{
            var error=new Error('Error '+response.status+': '+response.statusText);
            error.response=response;
            throw error;
        }
    },error=>{throw error;}).then(res=>res.json()).then(res=>{dispatch(EditComment(res))}).catch(err=>{console.log(err)})
}

export const loginUser=(username)=>(dispatch)=>{
    setTimeout(()=>dispatch(LoginUser(username)),2000);
}

const LoginUser=(username)=>({
    type: ActionTypes.LOGIN_USER,
    payload: username
})

export const logoutUser=()=>(dispatch)=>{
    AsyncStorage.removeItem('userinfo').then(()=>{dispatch(LogoutUser())}).catch((err)=>console.log('could not remove item ',err));
}

const LogoutUser=()=>({
    type: ActionTypes.LOGOUT_USER
})
