import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Button } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
// import MainButton from '../components/MainButton';
import { BACKEND_URL } from 'react-native-dotenv'


export default class BookAppointment extends Component {
  state = {
    isDateTimePickerVisible: false,
    date: new Date(),
    ShowstartTime:false,
    ShowendTime:false,
    startTime:new Date(),
    endTime:new Date()
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });


  _handleDatePicked = (date) => {
    console.log("date",date)
    this.setState({date:date,ShowstartTime:true,isDateTimePickerVisible:false})
    
  };
    
_handleStartTime = data =>{
  console.log("start",data)
    this.setState({startTime:data,ShowendTime:true,ShowstartTime:false})
}
_handleEndTime = data =>{
  console.log("end",data)
    this.setState({endTime:data,ShowendTime:false},()=>console.log(this.state))
}

 submit=async()=> {
  const url = `${BACKEND_URL}/api/appointment/`;
  await fetch( url, {
  method: 'POST',
  headers: { 
    'Accept': 'appstartTimelication/json',
   'Content-Type': 'application/json' },
  // body: JSON.stringify({text: "blablabla", id_product: "12"})
  body: JSON.stringify({date: this.state.date, startTime: this.state.startTime, endTime:this.state.endTime})
}).then((response) => 
response.json())
.then(responseJson => {
  console.log("heeeeeeeeeeeeeeeeeeeeeeeere", responseJson.data);
  //Successful response from the API Call
  this.setState({...responseJson.data
  });
          console.log("here", responseJson.data);

})
// .then((responseData) => { console.log("response: " + responseData); })
.catch((err) => { console.log(err); });
}

  render () {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <Text>Select Date</Text>
        </TouchableOpacity>
        <DateTimePicker is24Hour={false}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode='date'
        />

         <DateTimePicker is24Hour={false}
          isVisible={this.state.ShowstartTime}
          onConfirm={this._handleStartTime}
          onCancel={this._hideDateTimePicker}
          mode='time'
        />
        <DateTimePicker is24Hour={false}
          isVisible={this.state.ShowendTime}
          onConfirm={this._handleEndTime}
          onCancel={this._hideDateTimePicker}
          mode='time'
        />
        
        <Text>
        the date is : {this.state.date.getDate()+"-"+(this.state.date.getMonth()+1)+"-"+ this.state.date.getFullYear()}
        the start time is:{this.state.startTime.getHours()+":"+this.state.startTime.getMinutes()}
        the end time is:{this.state.endTime.getHours()+":"+this.state.endTime.getMinutes()}
        </Text>
        <Button
          title="Reserve"
          onPress={() => this.submit()}
        />
      </View>
    );
  }
}
