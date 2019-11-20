
import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import SearchableFlatlist from "searchable-flatlist";
import { BACKEND_URL } from 'react-native-dotenv';


export default class SelectLanguage extends Component {

  constructor(props) {
    super(props);
  this.state = { searchTerm: "", data: [] };
  
  }
 async componentDidMount() {
    console.log("select language", this.props.navigation.getParam("user_id",0))
    const url = `${BACKEND_URL}/api/languages`;
    try{
    const response = await fetch(url);
    const responseJson = await response.json();
    
        console.log("here", responseJson.data);
        //Successful response from the API Call
        this.setState({
          data: [...responseJson.data]

          //adding the new data in Data Source of the SearchableDropdown
        });
    }catch(error){
        console.error(error);
      };
  }
  render() {
    const { navigate } = this.props.navigation;
    let { sContainer, sSearchBar, sTextItem } = styles;
    return (
      <View style={sContainer}>
        <TextInput
          placeholder={"Search Language"}
          style={sSearchBar}
          onChangeText={searchTerm => this.setState({ searchTerm })}
        />
        {
          <SearchableFlatlist
            searchProperty={"Languages_Name"}
            searchTerm={this.state.searchTerm}
            data={this.state.data}
            containerStyle={{ flex: 1 }}
            renderItem={({ item }) => (
              <Text
                onPress={() =>
                  this.props.navigation.navigate("cardimage", {
                    Languages_ID: item.Languages_ID, user_id:this.props.navigation.getParam("user_id", 0)
                  })
                }
                style={sTextItem}
              >
                {item.Languages_Name}
              </Text>
            )}
            keyExtractor={item => item.Languages_ID}
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sContainer: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  sTextItem: {
    height: 75,
    width: "100%",
    textAlign: 'left',
    textAlignVertical: "center",
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingLeft: 15
  },
  sSearchBar: {
    width: "100%",
    paddingHorizontal: 10,
    // margin: 10,
    height: 30,
    borderColor: "gray",
    borderBottomWidth: 1,
    fontSize: 18
  }
});
