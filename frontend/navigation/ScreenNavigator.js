import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "../Screens/HomeScreen";
// import Selection from "../Screens/Selection";
// import flName from "../Screens/flName";
// import logInpage from "../Screens/logInpage";
// import test from "../Screens/test";
// import SelectTeacher from "../Screens/SelectTeacher";
// import Register from "../Screens/Register";
import AddNewUser from "../Screens/AddNewUser";

const ScreenNavigator = createStackNavigator({
  Home: HomeScreen,
  // Selection: Selection,
  // flName: flName,
  // logInpage: logInpage,
  // test: test,
  // register: Register,
  // selectTeacher: SelectTeacher,
  addnewuser: AddNewUser
});

export default ScreenNavigator;
