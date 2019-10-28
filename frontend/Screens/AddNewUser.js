// import React, { Component } from "react";
// import {
//   StyleSheet,
//   Text,
//   Image,
//   TouchableOpacity,
//   Vibration,
//   View,
//   TextInput
// } from "react-native";

// class AddNewUser extends Component {
//   constructor() {
//     super();
//     this.state = {
//       User_Firstname: "",
//       User_Lastname: ""
//     };
//   }

//   updateValue(text, field) {
//     if (field == "User_Firstname") {
//       this.setState({
//         User_Firstname: text
//       });
//     } else if (field == "User_Lastname") {
//       this.setState({
//         User_Lastname: text
//       });
//     }
//   }
//   submit() {
//     let collection = {};
//     (collection.User_Firstname = this.state.User_Firstname),
//       (collection.User_Lastname = this.state.User_Lastname);
//     console.warn(collection);

//     var url = "http://185.22.35.3:8000/";

//     fetch(url, {
//       method: "POST",
//       body: JSON.stringify(collection),
//       headers: new Headers({
//         "Content-Type": "application/json"
//       })
//     })
//       .then(res => res.json())
//       .catch(error => console.error("Error:", error))
//       .then(response => console.log("Success:", response));
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <TextInput
//           placeholder="First Name"
//           style={styles.input}
//           onChangeText={text => this.updateValue(text, "User_Firstname")}
//         />
//         <TextInput
//           placeholder="Last Name"
//           style={styles.input}
//           onChangeText={text => this.updateValue(text, "User_Lastname")}
//         />
//         <TouchableOpacity onPress={() => this.submit()} style={styles.btn}>
//           <Text>Submit</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#F5FCFF",
//     flex: 1,
//     justifyContent: "center"
//   },
//   btn: {
//     backgroundColor: "skyblue",
//     height: 40,
//     color: "#fff",
//     justifyContent: "center",
//     alignItems: "center"
//   }
// });
// export default AddNewUser;

import React, { useReducer, useCallback } from "react";
import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import * as authActions from "../../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = props => {
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: ""
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  const signupHandler = () => {
    dispatch(
      authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      )
    );
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Login"
                color={Colors.primary}
                onPress={signupHandler}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Switch to Sign Up"
                color={Colors.accent}
                onPress={() => {}}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate"
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
