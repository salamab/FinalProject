// /*This is an Example of Searchable Dropdown*/
import React, { Component } from "react";
import { View, Text } from "react-native";
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
// export default class Certifications extends Component {
//   constructor() {
//     super();
//     this.state = {
//       serverData: []
//       //Data Source for the SearchableDropdown
//     };
//   }
//   componentDidMount() {
//     const url = "http://192.168.1.18:8000/api/languages";
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
//             //items container style yo// //import react in our projectu can pass maxHeight
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
// import component
// import React, { Component } from 'react';
// import { View } from 'react-native';
import MultiSelect from "react-native-multiple-select";
import { BACKEND_URL } from 'react-native-dotenv';

export default class Certifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItems: [],
      items: []
    };
  }
  componentDidMount() {
    // this.setState({ isLoading: true });
    // this.contacts();
    // console.log("params", this.props.navigation.state.params);
    const url = `${BACKEND_URL}/api/certification/`;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        console.log("here", responseJson.data);
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
  // state = {
  //   selectedItems: [],

  //   items: [
  //     {
  //       id: "92iijs7yta",
  //       name: "Ondo"
  //     },
  //     {
  //       id: "a0s0a8ssbsd",
  //       name: "Ogun"
  //     },
  //     {
  //       id: "16hbajsabsd",
  //       name: "Calabar"
  //     },
  //     {
  //       id: "nahs75a5sg",
  //       name: "Lagos"
  //     },
  //     {
  //       id: "667atsas",
  //       name: "Maiduguri"
  //     },
  //     {
  //       id: "hsyasajs",
  //       name: "Anambra"
  //     },
  //     {
  //       id: "djsjudksjd",
  //       name: "Benue"
  //     },
  //     {
  //       id: "sdhyaysdj",
  //       name: "Kaduna"
  //     },
  //     {
  //       id: "suudydjsjd",
  //       name: "Abuja"
  //     }
  //   ]
  // };

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

  render() {
    const { selectedItems } = this.state;
    console.log(selectedItems);
    return (
      <View style={{ flex: 1 }}>
        <MultiSelect
          hideTags
          items={this.state.items}
          uniqueKey="id"
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
          displayKey="Certification_Nam"
          searchInputStyle={{ color: "#CCC" }}
          submitButtonColor="#CCC"
          submitButtonText="Submit"
        />
        <View>
          {this.multiSelect &&
            this.multiSelect.getSelectedItemsExt(selectedItems)}
        </View>
      </View>
    );
  }
}
