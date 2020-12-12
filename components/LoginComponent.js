import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, Image } from 'react-native';
import { Card, Icon, Input, CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import {loginUser} from '../redux/ActionCreators.js';
import Loading from './LoadingComponent.js';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            pressed: false
        }
    }


    handleLogin() {
        this.setState({pressed: true})
        if(this.state.username!==''&&this.state.password!=='')
            AsyncStorage.setItem('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
            .then(()=>{this.props.dispatch(loginUser(this.state.username))})
                .catch((error) => console.log('Could not save user info', error));
        else setTimeout(()=>this.setState({pressed: false}),2000);
    }

    render() {
        return (
            <>
            <View style={{alignSelf: 'stretch', backgroundColor: '#512DA8', height: 50}}><Text style={{fontSize: 30, left: 10, color: 'white',}}>Login</Text></View>
            <View style={styles.container}>
                <Image source={require('./logo.png')} style={{justifyContent: 'center', alignSelf: 'center'}} />
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    inputContainerStyle={styles.formInput}
                    errorMessage={this.state.pressed&&this.state.username===''?'Required Field':''}
                    errorStyle={{fontSize: 20}}
                    />
                <Input
                    placeholder="Password"
                    secureTextEntry={true}
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    inputContainerStyle={styles.formInput}
                    errorMessage={this.state.pressed&&this.state.password===''?'Required Field':''}
                    errorStyle={{fontSize: 20}}
                    />
                    {!this.state.pressed?<View style={styles.formButton}><Button
                        onPress={() => this.handleLogin()}
                        title="Login"
                        color="#512DA8"
                        /></View>:<View style={{marginTop: 30}}><Loading /></View>}
            </View></>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 40
    },
    formInput: {
        justifyContent: 'center',
        alignSelf: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#512da8'
    },
    formButton: {
        margin: 40
    }
});

const mapStateToProps=(state)=>{
    return{
        UserState: state.UserState
    }
}


export default connect(mapStateToProps)(Login);