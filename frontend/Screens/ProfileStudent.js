import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Card, ListItem, Button, Icon, Avatar } from "react-native-elements";
import { BACKEND_URL } from 'react-native-dotenv'
import MainButton from "../components/MainButton";

export default class ProfileStudent extends Component {
  
  constructor(props) {
    super(props);
  this.state = {
    image:"",
    name: "",
    dateReservation: ""
  }
}
 
render() {
    return (
      <View>
      
      <Avatar 
      size="large"
  rounded
  source={{
    uri:
      '/home/codi/FinalProject/Backend/public/Salam.jpg',
  }}
/>


        
          </View>
    );
  }
}
styles = StyleSheet.create({
  
  
});