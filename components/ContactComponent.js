import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Card} from 'react-native-elements';
import {View, Text, StyleSheet} from 'react-native';


class Contact extends React.Component{
    constructor(props){
        super(props);
        this.state={
            arr:["Vipul","Satish","Manisha","Jonty"]
        }
    }
    render(){
        return(
            <Card title="Contact Us" titleStyle={{fontSize:20}}>
                <View style={styles.text}>
                    <Text style={styles.text}>121, Clear Water Bay Road</Text>
                    <Text style={styles.text}>Clear Water Bay, Kowloon</Text>
                    <Text style={styles.text}>HONG KONG</Text>
                    <Text style={styles.text}>Tel: +852 1234 5678</Text>
                    <Text style={styles.text}>Fax: +852 8765 4321</Text>
                    <Text style={styles.text}>Email:confusion@food.net</Text>
                </View>
            </Card>
        );
    }
}

const ContactPage=createStackNavigator();

function ContactComponent(props){
    return(
        <ContactPage.Navigator initialRouteName='Contact Us'
    screenOptions={{
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: "#fff",
        
    }}>
  <ContactPage.Screen name="Contact Us" component={Contact} options={{title:''}}/>
  </ContactPage.Navigator>
    );
}

const styles=StyleSheet.create({
    text:{
        padding:7,
        fontWeight: 'bold'
    }
})

export default ContactComponent;