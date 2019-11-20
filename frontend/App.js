import React from "react";
import ScreenNavigator from "./navigation/ScreenNavigator";
import { createAppContainer } from "react-navigation";
import HomeScreen from "./Screens/HomeScreen";
const AppContainer = createAppContainer(ScreenNavigator);


export default function App() {
  
   

  return <AppContainer />;

}

