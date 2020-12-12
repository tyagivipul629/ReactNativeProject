import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, FlatList, Text, Alert } from 'react-native';
import { ListItem, Icon, Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { baseUrl } from '../shared/baseUrl';
import Loading from './LoadingComponent';

class testComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            beg: 0,
            end: 10,
            data: [],
            endMessage: ''
        }}

        endHandler=()=>{
            this.setState(prevState=>({
                beg: prevState.beg+10,
                end: prevState.end+10
            }),()=>{
                fetch(baseUrl+'users?_start='+this.state.beg+'&_end='+this.state.end).then((res)=>res.json())
                .then((res)=>{
                    if(res.length===0)
                        this.setState({endMessage: 'No more data to show!'})
                    else this.setState({data: this.state.data.concat(res)})
                }).catch(err=>{console.log(err)});
            })
        }

        componentDidMount(){
            fetch(baseUrl+'users?_start='+this.state.beg+'&_end='+this.state.end).then((res)=>res.json()).then(res=>{this.setState({data: this.state.data.concat(res)})}).catch(err=>{console.log(err)});
        }
        render(){
            
            const renderMenuItem=({item,index})=>{
                return(
                    
                    <ListItem key={index} onPress={()=>{Alert.alert(
                        ''+item.first_name+' '+item.last_name+'',
                        ''+item.email+' '+item.gender+' '+item.ip_address,
                        [
                            {
                                text: 'Ok',
                                onPress:()=>{}
                            }
                        ],{cancelable: false}
                    );}} hideChevron={true} bottomDivider>
                        <ListItem.Title>{item.first_name}</ListItem.Title>
                        <ListItem.Subtitle>{item.last_name}</ListItem.Subtitle>
                    </ListItem>
                    
                );
            }
            return(<><FlatList 
                    data={this.state.data}
                    renderItem={renderMenuItem}
                    onEndReached={this.endHandler}
                    keyExtractor={(item)=>item.id.toString()}
                    onEndReachedThreshold={5}
                    ListFooterComponent={this.state.endMessage===''?<Loading />:<View style={{justifyContent: 'center'}}><Text  style={{textAlign: 'center',fontSize: 20, color: '#512da8', marginBottom: 10, marginTop: 10}}>{this.state.endMessage}</Text></View>}
                    />
                    </>);
        }
    }


const TestComponent=createStackNavigator();

function testComponent1(props){
    return(<TestComponent.Navigator initialRouteName='TestComponent'
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
  <TestComponent.Screen name="TestComponent" component={testComponent} />
  </TestComponent.Navigator>
  );
}

export default testComponent1;