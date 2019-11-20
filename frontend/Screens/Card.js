import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Card, ListItem, Button, Icon, Avatar } from "react-native-elements";

import { BACKEND_URL } from 'react-native-dotenv'
import MainButton from "../components/MainButton";

export default class Cardimage extends Component {
  
  constructor(props) {
    super(props);
  this.state = {
    
    avatars: []
  }
}
 async componentDidMount(){
  const id = this.props.navigation.getParam("Languages_ID", 0)
  const user_id = this.props.navigation.getParam("user_id", 0)
  console.log("here", id, user_id)
  const res = await fetch(`${BACKEND_URL}/api/languageCourse/coursebylanguage/${id}`);
  const response = await res.json();
  console.log("languages",response)
  this.setState({avatars:response.data})
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

              title={avatar.User_Firstname+" "+avatar.User_Lastname}
              subtitle={
          <View>
              <Text>{avatar.Hour_Price}</Text>
              <View><Text>Certifications:</Text>{avatar.certifications.map((c,i)=>
              <ListItem
              key={i}
              title={c.Certification_Name}
              titleStyle={{ color: 'grey', fontSize:8 }}
              />)}</View>
              <MainButton onPress={()=> this.props.navigation.navigate('bookappointment', {user_id: this.props.navigation.getParam("user_id", 0), Language_Course_ID:avatar.Language_Course_ID })}>BOOK</MainButton>
          </View>
              }     
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