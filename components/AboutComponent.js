import React from 'react';
import {View, Text, FlatList} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {Card, ListItem} from 'react-native-elements';
import {LEADERS} from '../shared/leaders.js';
import { ScrollView } from 'react-native-gesture-handler';


class About extends React.Component{
    constructor(props){
        super(props);
        
    }
    
    renderMenuItem=({item,index})=>{
        return(
            <ListItem
                        key={index}
                        title={item.name}
                        subtitle={item.description}
                        hideChevron={true}
                        leftAvatar={{ source: require('./images/alberto.png')}}
                        bottomDivider
                      />
        );
    }
    render(){
        return(
            <ScrollView>
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
            <Card title="Corporate Leadership" titleStyle={{fontSize:20}}>
            <FlatList 
                    data={LEADERS}
                    renderItem={this.renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Card>
            </ScrollView>
        );
    }
}

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
        }
        
    }}>
  <AboutPage.Screen name="About Us" component={About} options={{title:'About Us'}}/>
  </AboutPage.Navigator>
    );
}

export default AboutComponent;