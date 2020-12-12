import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {Card} from 'react-native-elements';
import {View, Text, StyleSheet, Linking, Share} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';



class Contact extends React.Component{
    constructor(props){
        super(props);
        this.state={
            arr:["Vipul","Satish","Manisha","Jonty"]
        }
    }
    render(){
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <Card title="Contact Us" titleStyle={{fontSize:20}}>
                <View style={styles.text}>
                    <Text style={styles.text}>121, Clear Water Bay Road</Text>
                    <Text style={styles.text}>Clear Water Bay, Kowloon</Text>
                    <Text style={styles.text}>HONG KONG</Text>
                    <Text style={styles.text}>Tel: +852 1234 5678</Text>
                    <Text style={styles.text}>Fax: +852 8765 4321</Text>
                    <Text style={styles.text}>Email:confusion@food.net</Text>
                </View>
                <Button
                        title=" Send Email"
                        buttonStyle={{backgroundColor: "#512DA8"}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={() => Linking.openURL('mailto:vipultyagi629@gmail.com?subject=Query Mail&body=Type your query below:') }
                        />
            </Card>
            </Animatable.View>
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
        headerLeft: ()=>(<Icon name="list" type="font-awesome" size={22} color="white" 
      containerStyle={{paddingLeft: 10}} onPress={()=>props.navigation.toggleDrawer()}/>)
        
    }}>
  <ContactPage.Screen name="Contact Us" component={Contact} options={{title:'Contact Us'}}/>
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