import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../Screens/HomeScreen";
import Selection from "../Screens/Selection";
import AddNewUser from "../Screens/AddNewUser";
import Login from '../Screens/Login';
import Certifications from "../Screens/Certifications";
import SelectLanguage from "../Screens/SelectLanguage";
import Cardimage from "../Screens/Card";
// import BookAppointment from "../Screens/BookAppointment";
// import ProfileStudent from "../Screens/ProfileStudent";

const ScreenNavigator = createStackNavigator({
  home: HomeScreen,
  selection: Selection,
  addnewuser: AddNewUser,
  login: Login,
  certifications: Certifications,
  selectlanguage: SelectLanguage,
  cardimage: Cardimage,
  // bookappointment: BookAppointment,
  // profilestudent: ProfileStudent
});

export default ScreenNavigator;
