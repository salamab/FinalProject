import React from "react";
import ScreenNavigator from "./navigation/ScreenNavigator";
import { createAppContainer } from "react-navigation";
const AppContainer = createAppContainer(ScreenNavigator);


export default function App() {

  return <AppContainer />;

}

