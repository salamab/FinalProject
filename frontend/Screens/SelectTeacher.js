import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Button
} from "react-native";
import { Contacts } from "expo";

export default class SelectTeacher extends React.Component {
  static navigationOptions = {
    title: "This course covers the advanced topics in grammar...."
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      courses: []
    };
  }

  loadContacts = async () => {
    const permission = await Expo.Permissions.askAsync(
      Expo.Permissions.CONTACTS
    );

    if (permission.status !== "granted") {
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails]
    });

    console.log(data);
    this.setState({ contacts: data, inMemoryContacts: data, isLoading: false });
  };

  componentDidMount() {
    // this.setState({ isLoading: true });
    // this.contacts();
    // console.log("param/${this.props.navigation.state.params.s", this.props.navigation.state.params);
    const url = `http://192.168.0.105:8000/api/languageCourse/coursebylanguage/${this.props.navigation.state.params.Languages_ID}`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        console.log("here", responseJson.data);
        //Successful response from the API Call
        this.setState({
          courses: responseJson.data

          //adding the new data in Data Source of the SearchableDropdown
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderItem = ({ item }) => (
    <View style={{ minHeight: 70, padding: 5 }}>
      <Text style={{ color: "#bada55", fontWeight: "bold", fontSize: 26 }}>
        {item.User_Firstname + " "}
        {item.User_Lastname}
      </Text>
      <Text style={{ color: "#bada55", fontWeight: "bold", fontSize: 26 }}>
        {item.certifications.map(c => (
          <Text>{c.Certification_Name}</Text>
        ))}
      </Text>
      <Text style={{ color: "white", fontWeight: "bold" }}>
        {item.Hour_Price}
      </Text>
    </View>
  );

  searchContacts = value => {
    const filteredContacts = this.state.inMemoryContacts.filter(contact => {
      let contactLowercase = (
        contact.firstName +
        " " +
        contact.lastName
      ).toLowerCase();

      let searchTermLowercase = value.toLowerCase();

      return contactLowercase.indexOf(searchTermLowercase) > -1;
    });
    this.setState({ contacts: filteredContacts });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Header /> */}
        <SafeAreaView style={{ backgroundColor: "#2f363c" }} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#dddddd"
          style={{
            backgroundColor: "#2f363c",
            height: 50,
            fontSize: 25,
            padding: 10,
            color: "white",
            borderBottomWidth: 0.5,
            borderBottomColor: "#7d90a0"
          }}
          onChangeText={value => this.searchContacts(value)}
        />
        <View style={{ flex: 1, backgroundColor: "#2f363c" }}>
          {this.state.isLoading ? (
            <View
              style={{
                ...StyleSheet.absoluteFill,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ActivityIndicator size="large" color="#bad555" />
            </View>
          ) : null}
          <FlatList
            data={this.state.courses}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 50
                }}
              >
                <Text style={{ color: "#bad555" }}>No Courses Found</Text>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
