import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Input from '../components/Input';
import MainButton from "../components/MainButton";
import { BACKEND_URL } from 'react-native-dotenv';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      User_Email: "",
      User_Password: "", 
      error:false,
      error_message:""
    };
  }
  updateValue(text, field) {
    this.setState({
      [field]: text
    })
  }
  
  submit = async () => {
    try{
      console.log("hereeeeertdgf")
    const response = await fetch(`${BACKEND_URL}/api/login?User_Email=${this.state.User_Email}&User_Password=${this.state.User_Password}`);
    const data = await response.json();
    if (data.success) {
      console.log("id",data.data)
      this.props.navigation.navigate("selectlanguage" ,{user_id: data.data})
    }
    else{
      this.setState({error:true,error_message:data.message})
    }
  }
  catch(err)
  {
    console.log(err)
  }
   return true;
  };

  render(){
  return (
    <View style={styles.container}>
    <View >
      {this.state.error?<Text>{this.state.error_message}</Text> :<Text style={{color: 'gray'}}>Enter your Email and Password </Text>}
      </View>
      <View style={styles.buttonContainer}>
        <View>
          <Input placeholder='Your Email' style={{color: 'gray'}}
            onChangeText={text => this.updateValue(text, "User_Email")}/>
        
          <Input placeholder ="Your Password" style={{color: 'gray'}}
            onChangeText={text => this.updateValue(text, "User_Password")}/>
        </View>
      </View>
      
      <View style={styles.btn}>
      <MainButton onPress={() => {this.submit();}}><Text style={{textAlign: 'auto'}}>Login</Text></MainButton>
        
      </View>
      
    </View>
  );
        }
};
export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4B44AD',
    flex: 1,
    justifyContent: "center",
    marginTop: 200
  },
  btn: {
    height: 40,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  }
});
