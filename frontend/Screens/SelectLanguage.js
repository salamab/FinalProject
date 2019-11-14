// import React, { Component } from "react";
// import { FlatList, StyleSheet, Text, View } from "react-native";
// import DropdownMenu from "react-native-dropdown-menu";

// export default class SelectLanguage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       text: ""
//     };
//   }

//   render() {
//     var data = [["English", "Frensh", "Arabic", "PHP", "Italian", "Italian"]];
//     return (
//       <View style={{ flex: 1 }}>
//         <View style={{ height: 64 }} />
//         <DropdownMenu
//           placeholder="Select The Language You Want To Learn"
//           style={{ flex: 1, backgroundColor: "skyblue" }}
//           bgColor={"#ff1493"}
//           tintColor={"#666666"}
//           activityTintColor={"green"}
//           // arrowImg={}
//           // checkImage={}
//           // optionTextStyle={{color: '#333333'}}
//           // titleStyle={{color: '#333333'}}
//           // maxHeight={300}
//           handler={(selection, row) =>
//             this.setState({ text: data[selection][row] })
//           }
//           data={data}
//         >
//           <View style={{ flex: 2 }}>
//             <Text style={{ marginTop: 50 }}>
//               {" "}
//               The Teachers availble of the {this.state.text} language
//             </Text>
//           </View>
//         </DropdownMenu>
//       </View>
//     );
//   }
// }

//..2eme metode..................
// import React, { Component } from "react";
// import { View, Text, Picker, StyleSheet } from "react-native";

// class PickerExample extends Component {
//   state = { user: "" };
//   updateUser = user => {
//     this.setState({ user: user });
//   };
//   render() {
//     return (
//       <View>
//         <Picker selectedValue={this.state.user} onValueChange={this.updateUser}>
//           <Picker.Item label="Steve" value="steve" />
//           <Picker.Item label="Ellen" value="ellen" />
//           <Picker.Item label="Maria" value="maria" />
//         </Picker>
//         <Text style={styles.text}>{this.state.user}</Text>
//       </View>
//     );
//   }
// }
// export default PickerExample;

// const styles = StyleSheet.create({
//   text: {
//     fontSize: 30,
//     alignSelf: "center",
//     color: "red"
//   }
// });

// another method.........................................................................

// /*This is an Example of Searchable Dropdown*/
// import React, { Component } from "react";
// //import react in our project
// import { View, Text } from "react-native";
// //import basic react native components
// import SearchableDropdown from "react-native-searchable-dropdown";
// //import SearchableDropdown component

// //Item array for the dropdown
// var items = [
//   //name key is must.It is to show the text in front
//   { id: 1, name: "angellist" },
//   { id: 2, name: "codepen" },
//   { id: 3, name: "envelope" },
//   { id: 4, name: "etsy" },
//   { id: 5, name: "facebook" },
//   { id: 6, name: "foursquare" },
//   { id: 7, name: "github-alt" },
//   { id: 8, name: "github" },
//   { id: 9, name: "gitlab" },
//   { id: 10, name: "instagram" }
// ];
// export default class SelectLanguage extends Component {
//   constructor() {
//     super();
//     this.state = {
//       serverData: []
//       //Data Source for the SearchableDropdown
//     };
//   }
//   componentDidMount() {
//     const url = "http://192.168.0.105:8000/api/languages";
//     fetch(url)
//       .then(response => response.json())
//       .then(responseJson => {
//         //Successful response from the API Call
//         this.setState({
//           serverData: [...this.state.serverData, responseJson.results]

//           //adding the new data in Data Source of the SearchableDropdown
//         });
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }

//   async componentDidMount() {
//     const response = await fetch(`http://192.168.0.105:8000/api/languages`);
//     const json = await response.json();
//     this.setState({ serverData: json.data });
//     console.log(this.state.serverData);
//   }
//   render() {
//     return (
//       <View style={{ flex: 1, marginTop: 30 }}>
//         <Text style={{ marginLeft: 10 }}>
//           Searchable Dropdown from Static Array
//         </Text>
//         <SearchableDropdown
//           onTextChange={text => console.log(text)}
//           //On text change listner on the searchable input
//           onItemSelect={item => alert(JSON.stringify(item))}
//           //onItemSelect called after the selection from the dropdown
//           containerStyle={{ padding: 5 }}
//           //suggestion container style
//           textInputStyle={{
//             //inserted text style
//             padding: 12,
//             borderWidth: 1,
//             borderColor: "#ccc",
//             backgroundColor: "#FAF7F6"
//           }}
//           itemStyle={{
//             //single dropdown item style
//             padding: 10,
//             marginTop: 2,
//             backgroundColor: "#FAF9F8",
//             borderColor: "#bbb",
//             borderWidth: 1
//           }}
//           itemTextStyle={{
//             //single dropdown item's text style
//             color: "#222"
//           }}
//           itemsContainerStyle={{
//             //items container style you can pass maxHeight
//             //to restrict the items dropdown hieght
//             maxHeight: "60%"
//           }}
//           items={items}
//           //mapping of item array
//           defaultIndex={1}
//           //default selected item index
//           placeholder="placeholder"
//           //place holder for the search input
//           resetValue={false}
//           //reset textInput Value with true and false state
//           underlineColorAndroid="transparent"
//           //To remove the underline from the android input
//         />
//         <Text style={{ marginLeft: 10 }}>
//           Searchable Dropdown from Dynamic Array from Server
//         </Text>
//         <SearchableDropdown
//           onTextChange={text => console.log(text)}
//           //On text change listner on the searchable input
//           onItemSelect={item => alert(JSON.stringify(item))}
//           //onItemSelect called after the selection from the dropdown
//           containerStyle={{ padding: 5 }}
//           //suggestion container style
//           textInputStyle={{
//             //inserted text style
//             padding: 12,
//             borderWidth: 1,
//             borderColor: "#ccc",
//             backgroundColor: "#FAF7F6"
//           }}
//           itemStyle={{
//             //single dropdown item style
//             padding: 10,
//             marginTop: 2,
//             backgroundColor: "#FAF9F8",
//             borderColor: "#bbb",
//             borderWidth: 1
//           }}
//           itemTextStyle={{
//             //single dropdown item's text style
//             color: "#222"
//           }}
//           itemsContainerStyle={{
//             //items container style you can pass maxHeight
//             //to restrict the items dropdown hieght
//             maxHeight: "50%"
//           }}
//           items={this.state.serverData}
//           //mapping of item array
//           defaultIndex={0}
//           //default selected item index
//           placeholder="placeholder"
//           //place holder for the search input
//           resetValue={false}
//           //reset textInput Value with true and false state
//           underlineColorAndroid="transparent"
//           //To remove the underline from the android input
//         />
//       </View>
//     );
//   }
// }

//
import React, { Component } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import SearchableFlatlist from "searchable-flatlist";
import { BACKEND_URL } from 'react-native-dotenv';

// const data = [
//   { id: 1, name: "Francesco Raoux" },
//   { id: 2, name: "Tasha Bonanno" },
//   { id: 3, name: "Merle Braunstein" },
//   { id: 4, name: "Aleda Bouzan" },
//   { id: 5, name: "Issiah Elnaugh" }
// ];

export default class SelectLanguage extends Component {
  state = { searchTerm: "", data: [] };
  componentDidMount() {
    const url = `${BACKEND_URL}/api/languages`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        console.log("here", responseJson.data);
        //Successful response from the API Call
        this.setState({
          data: [...responseJson.data]

          //adding the new data in Data Source of the SearchableDropdown
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  render() {
    const { navigate } = this.props.navigation;
    let { sContainer, sSearchBar, sTextItem } = styles;
    return (
      <View style={sContainer}>
        <TextInput
          placeholder={"Search"}
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
                  navigate("cardimage", {
                    Languages_ID: item.Languages_ID
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
    height: 50,
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18
  },
  sSearchBar: {
    paddingHorizontal: 10,
    margin: 10,
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 18
  }
});
