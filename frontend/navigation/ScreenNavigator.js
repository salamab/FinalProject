import { createStackNavigator } from "react-navigation-stack";
// import HomeScreen from "../Screens/HomeScreen";
// import Selection from "../Screens/Selection";

// // import flName from "../Screens/flName";
// // import logInpage from "../Screens/logInpage";
// // import test from "../Screens/test";
// // import Register from "../Screens/Register";

// import AddNewUser from "../Screens/AddNewUser";
// import Certifications from "../Screens/Certifications";
// import SelectLanguage from "../Screens/SelectLanguage";
// import SelectTeacher from "../Screens/SelectTeacher";
import Cardimage from "../Screens/Card";

const ScreenNavigator = createStackNavigator({
  // home: HomeScreen,
  // selection: Selection,
  // addnewuser: AddNewUser,
  // certifications: Certifications,
  // selectlanguage: SelectLanguage,
  // selectteacher: SelectTeacher,
  cardimage: Cardimage
});

export default ScreenNavigator;
