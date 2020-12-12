import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, TouchableOpacity, Alert } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createStackNavigator } from '@react-navigation/stack';
import Moment from 'moment';
import * as Animatable from 'react-native-animatable';
import PushNotification from 'react-native-push-notification';

class ReservationComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(),
            showModal: false,
            show: false,
            mode: 'date'
        }
    }

    componentDidMount(){
        PushNotification.createChannel(
            {
              channelId: "233253", // (required)
              channelName: "My channel1",
              vibrate: true // (required)
              // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
          );
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleReservation() {
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: '+this.state.guests+'\n'+
            'Smoking? '+this.state.smoking+'\n'+
            'Date and Time: '+this.state.date,
            [
                {
                    text: 'Cancel',
                    onPress: ()=>{this.resetForm()}
                },
                {
                    text: 'OK',
                    onPress: ()=>{PushNotification.localNotificationSchedule({
                        channelId: "233253",
                        message: "Your reservation details:\n"+"Number of guests: "+this.state.guests+
                        "\nSmoking: "+this.state.smoking, // (required)
                        date: new Date(Date.now() + 20 * 1000), // in 60 secs
                        allowWhileIdle: true // (optional) set notification to work while on doze, default: false
                      });this.resetForm()}
                }
            ],{cancelable: false}
        );
        
    }

    resetForm(){
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date(),
            show: false,
            mode: 'date'
        });
    }
    
    render() {
        
        return(
            <>
            <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
            <ScrollView>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                </Picker>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                <Switch
                    style={styles.formItem}
                    value={this.state.smoking}
                    onTintColor='#512DA8'
                    onValueChange={(value) => this.setState({smoking: value})}>
                </Switch>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time</Text>
                <TouchableOpacity style={styles.formItem}
            style={{
                padding: 7,
                borderColor: '#512DA8',
                borderWidth: 2,
                flexDirection: "row"
            }}
            onPress={() => this.setState({ show: true, mode: 'date' })}
      >
          <Icon type='font-awesome' name='calendar' color='#512DA8' />
          <Text >
              {' ' + Moment(this.state.date).format('DD-MMM-YYYY h:mm A') }
          </Text>
      </TouchableOpacity>
      {this.state.show && (
          <DateTimePicker
              value={this.state.date}
              mode={this.state.mode}
              minimumDate={new Date()}
              onChange={(event, date) => {
                  if (date === undefined) {
                      this.setState({ show: false });
                  }
                  else {
                      this.setState({
                          show: this.state.mode === "date" ? true : false,
                          mode: "time",
                          date: new Date(date)
                      });
                  }
              }}
          />
      )}
                </View>
                <View style={styles.formRow}>
                <Button
                    onPress={() => this.handleReservation()}
                    title="Reserve"
                    color="#512DA8"
                    />
                </View>
            </ScrollView>
            </Animatable.View>
        </>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

const Reservation=createStackNavigator();

function reservation(props){
    return(<Reservation.Navigator initialRouteName='Reservation'
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
  <Reservation.Screen name="Reservation" component={ReservationComponent} />
  </Reservation.Navigator>
  );
}

export default reservation;