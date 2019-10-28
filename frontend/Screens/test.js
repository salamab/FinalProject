import React from "react";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import {
  View,
  Button,
  TextInput,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from "react-native";

export default class test extends React.Component {
  state = {
    User_Firstname: "",
    User_Lastname: "",
    User_Email: "",
    User_Password: "",
    User_Address: "",
    User_Phone: ""
  };

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  //Sign up

  SignUp = async () => {
    let formData = new FormData();

    formData.append("User_Firstname", this.state.User_Firstname);
    formData.append("User_Lastname", this.state.User_Lastname);
    formData.append("User_Email", this.state.User_Email);
    formData.append("User_Password", this.state.User_Password);
    formData.append("User_Address", this.state.User_Address);
    formData.append("User_Phone", this.state.User_Phone);
    console.log(formData);
    const response = await fetch("http://localhost:8000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
    });
    const data = await response.json();
    console.log("data", data);
    console.log("data.suc", data.success);
    if (data.success) {
      AsyncStorage.setItem("user", JSON.stringify(data.user));
    }
    return data.success;
  };

  _onPress = async () => {
    if (
      !this.state.User_Firstname &&
      !this.state.User_Lastname &&
      !this.state.Confirm_Password &&
      !this.state.User_Address &&
      !this.state.User_Phone &&
      !this.state.email
    ) {
      alert("Complete your Sign up");
      return false;
    } else if (this.state.User_Password != this.state.Confirm_Password) {
      alert("Conform Your Password");
      return false;
    } else {
      console.log("hsh");
      const signup_response = await this.SignUp();

      if (signup_response) {
        props.navigation.navigate({ routeName: "selectTeacher" });
      } else {
        alert("Please check your credential");
      }
    }
  };
  componentDidMount() {
    // this.getPermissionAsync();
    getPermissionAsync = async () => {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      } else if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    };
  }

  render() {
    return (
      <ScrollView style={{ padding: 30 }}>
        <KeyboardAvoidingView style={{ marginTop: 60 }}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={val => this.onChangeText("User_Firstname", val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Lastname"
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={val => this.onChangeText("User_Lastname", val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={val => this.onChangeText("User_Email", val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={val => this.onChangeText("User_Password", val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Your Password"
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={val => this.onChangeText("Confirm_Password", val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Address"
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={val => this.onChangeText("User_Address", val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            autoCapitalize="none"
            placeholderTextColor="white"
            onChangeText={val => this.onChangeText("User_Phone", val)}
          />

          <Button title="Sign Up" onPress={this._onPress} />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 55,
    backgroundColor: "#42A5F5",
    margin: 10,
    color: "white",
    borderRadius: 14
  }
  // fontSize: 18,
  // fontWeight: "500"

  // container: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center"
  // }
});
