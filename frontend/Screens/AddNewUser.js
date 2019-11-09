import React, { Component } from "react";
import {
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

// import Certifications from "./Certifications";

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
      user_id: 0
    };
  }

  updateValue(text, field) {
    if (field == "User_Firstname") {
      this.setState({ User_Firstname: text });
    } else if (field == "User_Lastname") {
      this.setState({ User_Lastname: text });
    } else if (field == "User_Email") {
      this.setState({ User_Email: text });
    } else if (field == "User_Password") {
      this.setState({ User_Password: text });
    } else if (field == "Confirm_Password") {
      this.setState({ Confirm_Password: text });
    } else if (field == "User_Address") {
      this.setState({ User_Address: text });
    } else if (field == "User_Phone") {
      this.setState({ User_Phone: text });
    }
  }
  submit = async () => {
    let collection = {};
    collection.User_Firstname = this.state.User_Firstname;
    collection.User_Lastname = this.state.User_Lastname;
    collection.User_Email = this.state.User_Email;
    collection.User_Password = this.state.User_Password;
    collection.Confirm_Password = this.state.Confirm_Password;
    collection.User_Address = this.state.User_Address;
    collection.User_Phone = this.state.User_Phone;
    collection.Role = this.props.navigation.getParam("role", "Teacher");
    // collection.Certification_ID =
    //  console.warn(collection);

    var url = "http://192.168.1.3:8000/api/users";
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(collection)
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

    var url = `http://192.168.1.3:8000/api/userCertification/${this.state.user_id}`;

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
    // this.setState({ isLoading: true });
    // this.contacts();
    // console.log("params", this.props.navigation.state.params);
    const url = `http://192.168.1.5:8000/api/certification/`;
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
  render() {
    const { navigate } = this.props.navigation;
    const { selectedItems } = this.state;
    //console.log(selectedItems);
    return (
      <ScrollView>
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

          <TouchableOpacity
            onPress={() => {
              this.submit();
              this.props.navigation.navigate({ routeName: "selectlanguage" });
            }}
            style={styles.btn}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    flex: 1,
    justifyContent: "center"
  },
  btn: {
    backgroundColor: "skyblue",
    height: 40,
    color: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
});
export default AddNewUser;
