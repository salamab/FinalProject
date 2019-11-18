import React, { Component } from "react";
import {
  Button,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Vibration,
  View,
  TextInput,
  ScrollView
} from "react-native";
import Input from "../components/Input";
import MainButton from "../components/MainButton";
import MultiSelect from "react-native-multiple-select";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from "expo-permissions";
import { BACKEND_URL } from 'react-native-dotenv'

class AddNewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User_Firstname: "",
      User_Lastname: "",
      User_Email: "",
      User_Password: "",
      Confirm_Password: "",
      User_Address: "",
      User_Phone: "",
      Role: "",
      Certification_ID: "",
      selectedItems: [],
      items: [],
      user_id: 0,
      avatar:''
    };
  }

  updateValue(text, field) {
    this.setState({
      [field]: text
    })
  }
  submit = async () => {
    let formData = new FormData();
    const uri = this.state.avatar.uri;
    const uriParts = uri.split(".");
    const fileName = uriParts[uriParts.length - 1];
    formData.append("avatar", {
      name: `photo.${fileName}`,
      type: `image/${fileName}`,
      uri:
        Platform.OS === "android"
          ? this.state.avatar.uri
          : this.state.avatar.uri.replace("file://", "")
    });
    formData.append("User_Firstname", this.state.User_Firstname);
    formData.append("User_Lastname", this.state.User_Lastname);
    formData.append("User_Email", this.state.User_Email);
    formData.append("User_Password", this.state.User_Password);
    formData.append("Confirm_Password", this.state.Confirm_Password);
    formData.append("User_Address", this.state.User_Address);
    formData.append("User_Phone", this.state.User_Phone);
    formData.append("Role", this.props.navigation.getParam("role", "Teacher"));

    
    var url = `${BACKEND_URL}/api/users`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          
          "Content-Type": "multipart/form-data"
        },
        body: formData
      });
      const response = await res.json();

      //console.log("Success:", response);
      this.setState({ user_id: response.id });
    } catch (error) {
      console.error("Error1:", error);
    }
    this.setState({
      User_Firstname: "",
      User_Lastname: "",
      User_Email: "",
      User_Password: "",
      Confirm_Password: "",
      User_Address: "",
      User_Phone: "",
      Role: ""
      // Certification_ID: ""
    });

    console.log("ID", this.state.user_id);

    var url = `${BACKEND_URL}/api/userCertification/${this.state.user_id}`;

    try {
      const res2 = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.selectedItems)
      });
      const response2 = await res2.json();

      console.log("Response2:", response2);
    } catch (error) {
      console.error("Error2:", error);
    }
  };
  componentDidMount() {
    this.getPermissionAsync();
    console.log('hi');
    // this.setState({ isLoading: true });
    // this.contacts();
    // console.log("params", this.props.navigation.state.params);
    const url = `${BACKEND_URL}/api/certification/`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        // console.log("heeeeeeeeeeeeeeeeeeeeeeeere", responseJson.data);
        //Successful response from the API Call
        this.setState({
          items: [...responseJson.data]

          //adding the new data in Data Source of the SearchableDropdown
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
    // console.log(this.state.selectedItems);
  };
  
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    const { navigate } = this.props.navigation;
    const { selectedItems } = this.state;
    let { image } = this.state;
    //console.log(selectedItems);
    return (
      <ScrollView keyboardDismissMode="interactive">
        <View style={styles.container}>
          <Input
            placeholder="First Name"
            onChangeText={text => this.updateValue(text, "User_Firstname")}
            value={this.state.User_Firstname}
          ></Input>
          <Input
            placeholder="Last Name"
            onChangeText={text => this.updateValue(text, "User_Lastname")}
          ></Input>
          <View style={{ flex: 1 }}>
            <MultiSelect
              hideTags
              items={this.state.items}
              uniqueKey="Certification_ID"
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={this.onSelectedItemsChange}
              selectedItems={selectedItems}
              selectText="Pick Items"
              searchInputPlaceholderText="Search Items..."
              onChangeInput={text => console.log(text)}
              tagRemoveIconColor="#CCC"
              tagBorderColor="#CCC"
              tagTextColor="#CCC"
              selectedItemTextColor="#CCC"
              selectedItemIconColor="#CCC"
              itemTextColor="#000"
              displayKey="Certification_Name"
              searchInputStyle={{ color: "#CCC" }}
              submitButtonColor="#CCC"
              submitButtonText="Submit"
            />
            <View>
              {this.multiSelect &&
                this.multiSelect.getSelectedItemsExt(selectedItems)}
            </View>

            

          </View>
          {/* <Certifications /> */}
          <Input
            placeholder="Email"
            onChangeText={text => this.updateValue(text, "User_Email")}
          ></Input>
          <Input
            placeholder="Password"
            onChangeText={text => this.updateValue(text, "User_Password")}
          ></Input>
          <Input
            placeholder="Confirm Password"
            onChangeText={text => this.updateValue(text, "Confirm_Password")}
          ></Input>
          <Input
            placeholder="Address"
            onChangeText={text => this.updateValue(text, "User_Address")}
          ></Input>
          <Input
            placeholder="Phone No."
            onChangeText={text => this.updateValue(text, "User_Phone")}
          ></Input>

          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <MainButton style={styles.btn}
                    // title="Pick an image from camera roll"
                    onPress={this._pickImage}
                  >Pick an image from camera roll</MainButton>
                  {image &&
                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                
          
          <MainButton  style={styles.btn}
            onPress={() => {
              this.submit();
              this.props.navigation.navigate({ routeName: "selectlanguage" });
            }}
           
          >
            <Text>Submit</Text>
            </MainButton>
            </View>
          
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'blue',
    flex: 1,
    justifyContent: "center"
  },
  btn: {
    backgroundColor: "#460BAC",
    height: 40,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
});
export default AddNewUser;
