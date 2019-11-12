import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Card, ListItem, Button, Icon, Avatar } from "react-native-elements";
/* 
<Avatar
  rounded
  source={{
    uri:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
  }}
/> */
export default class Cardimage extends Component {
  state = {
    avatars: [
      {
        name: 'Samar', role: 'teacher', image:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
      },
      {
        name: 'Salam', role: 'teacher', image:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
      },
      {
        name: 'Shirak', role: 'student', image:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
      }
    ]
  }
  render() {
    return (
      <View>
        {/* <View style={styles.containerstyle}>
           
              <Avatar
                size="large"
                rounded
                // title="CR"
                onPress={() => console.log("Works!")}
                source={{
                              uri:
                                "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"
                            }}
                            activeOpacity={0.7}
                          />
                </View>
              <View>
                <Text>Samar Fatayri</Text>
              </View> */}
       {
   this.state.avatars.map((avatar, i) => (
      <ListItem
        key={i}
        leftAvatar={{ source: { uri: avatar.image } }}
        title={avatar.name}
        subtitle={avatar.role}
        bottomDivider
      />
    ))
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