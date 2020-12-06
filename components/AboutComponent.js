import React from 'react';
import {View, Text, FlatList, Button} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {Card, ListItem} from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent.js';
import * as Animatable from 'react-native-animatable';




class About extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showDialog: false
        }
    }
    
    renderMenuItem=({item,index})=>{
        return(
            <>
            <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        leftAvatar={{ uri: baseUrl+item.image, rounded: true}}
                        bottomDivider
                      />
            <Card image={{ uri: baseUrl+item.image, rounded: true}}></Card></>
        );
    }
    render(){
        if (this.props.leaders.isLoading) {
            console.log("true");
            return(
                <ScrollView>
                    <Card title='Corporate Leadership'>
                        <Loading />
                    </Card>
                </ScrollView>
            );
        }
        else if (this.props.leaders.errMess) {
            return(
                <ScrollView>
                    
                    <Card
                        title='Corporate Leadership'>
                        <Text>{this.props.leaders.errMess}</Text>
                    </Card>
                </ScrollView>
            );
        }
        else{
        return(
            <>
            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <Card title="About Us" titleStyle={{fontSize:20}}>
                <View>
                    <Text>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in 
                        Hong Kong. With its unique brand of world 
                        fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  
                        Featuring four of the best three-star 
                        Michelin chefs in the world, you never know what will arrive on your plate 
                        the next time you visit us.{"\n"}{"\n"}
The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our 
CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.
</Text>
                </View>
            </Card>
            </Animatable.View>
            <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Corporate Leadership" titleStyle={{fontSize:20}}>
            <FlatList 
                    data={this.props.leaders.leaders}
                    renderItem={this.renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Card>
            <Button title="Press me" />
            </Animatable.View>
            </ScrollView>
            </>
        );
    }
    }
}

const mapStateToProps=(state)=>{
    return{
        leaders: state.leaders
    }
}

const ConnectedAbout=connect(mapStateToProps)(About);

const AboutPage=createStackNavigator();

function AboutComponent(props){
    return(
        <AboutPage.Navigator initialRouteName='About Us'
    screenOptions={{
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            color: "#fff"            
        },
        headerLeft: ()=>(<Icon name="list" type="font-awesome" size={22} color="white" 
      containerStyle={{paddingLeft: 10}} onPress={()=>props.navigation.toggleDrawer()}/>)
        
    }}>
  <AboutPage.Screen name="About Us" component={ConnectedAbout} options={{title:'About Us'}}/>
  </AboutPage.Navigator>
    );
}

export default AboutComponent;