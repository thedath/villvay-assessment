import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import BottomNavigation from "./BottomNavigation";
import CreateItemScreen from "../screens/CreateItemScreen";
import CategoryResultScreen from "../screens/CategoryResultScreen";
import ItemDetailScreen from "../screens/ItemDetailScreen";

const MainNavigation = () => {
  // creating the main stack navigation components
  // made it as a seperate component so that when 
  // customizing the bottom navigation, only this file
  // grow and will make the code clean and more readable
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="InitialScreen" headerMode="none">
    <Stack.Screen name="InitialScreen" component={BottomNavigation} />
    <Stack.Screen name="CreateItemScreen" component={CreateItemScreen} />
    <Stack.Screen
      name="CategoryResultScreen"
      component={CategoryResultScreen}
    />
    <Stack.Screen name="ItemDetailScreen" component={ItemDetailScreen} />
  </Stack.Navigator>
  )
}

export default MainNavigation;
