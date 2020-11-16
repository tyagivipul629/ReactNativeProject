
import React from 'react';
import {
  View,
  Text,
  TextInput
} from 'react-native';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      inptext:''
    };
  }
  handleText=(text)=>{
    this.setState({inptext:text});
  }
  render(){
    return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
        <TextInput underlineColorAndroid = "transparent"
               placeholder = "Email"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               backgroundColor="yellow"
               onChangeText={this.handleText} />
      <Text>Hello {this.state.inptext}</Text>
    </View>
  );
}
};

export default App;
