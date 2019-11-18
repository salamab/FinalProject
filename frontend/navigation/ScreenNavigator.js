import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "../Screens/HomeScreen";
import Selection from "../Screens/Selection";
import AddNewUser from "../Screens/AddNewUser";
import Certifications from "../Screens/Certifications";
import SelectLanguage from "../Screens/SelectLanguage";
// import languageCourses from "../Screens/languageCourses";
import Cardimage from "../Screens/Card";
import BookAppointment from "../Screens/BookAppointment";

const ScreenNavigator = createStackNavigator({
  home: HomeScreen,
  selection: Selection,
  addnewuser: AddNewUser,
  certifications: Certifications,
  selectlanguage: SelectLanguage,
  // languagecourses: languageCourses,
  cardimage: Cardimage,
  bookappointment: BookAppointment
});

export default ScreenNavigator;
