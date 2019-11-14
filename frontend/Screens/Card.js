import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Card, ListItem, Button, Icon, Avatar } from "react-native-elements";

import { BACKEND_URL } from 'react-native-dotenv'

export default class Cardimage extends Component {
  // state = {
  //   avatars: [
  //     {
  //       name: 'Samar', role: 'teacher', image:'Samar.jpg'
  //     },
  //     {
  //       name: 'Raed', role: 'teacher', image:'Raed.jpeg'
  //     },
  //     {
  //       name: 'Salam', role: 'student', image:'Salam.jpg'
  //     }
  //   ]
  // }
  constructor(props) {
    super(props);
  this.state = {
    
    avatars: []
  }
}
componentDidMount = async () => {
  const res = await fetch(`${BACKEND_URL}/api/languageCourse/coursebylanguage/2`);
  const response = await res.json();
  this.setState({
    avatars: response.data
  })
  console.log(this.state.avatars,"hooooooon")
}
render() {
    return (
      <View>
       {
        this.state.avatars.map((avatar, i) => {
          console.log(avatar.User_Firstname);

          const avatarImages = [
            'Raed.jpeg',
            'Salam.jpg',
            'Samar.jpg'
          ];
          
            return <ListItem
              key={i}
              leftAvatar={{ source: { uri: `${BACKEND_URL}/${avatarImages[i % avatarImages.length]}`} }}

              title={avatar.User_Firstname}
              subtitle={avatar.User_Lastname}
              User_Firstname={avatar.User_Firstname}
              User_Lastname={avatar.User_Lastname}
              Hour_Price={avatar.Hour_Price}
              Certification_Name={avatar.Certification_Name}

              bottomDivider
            />
        })
        }
          </View>
    );
  }
}
styles = StyleSheet.create({
  containerstyle: {
    padding: 10
  }
});