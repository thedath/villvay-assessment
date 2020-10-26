// make below line the first import of this file
import "react-native-gesture-handler";

// importing react base
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// importing screens
import ExploreTabScreen from "./screens/ExploreTabScreen";
import BookmarksTabScreen from "./screens/BookmarksTabScreen";
import CreateItemScreen from "./screens/CreateItemScreen";
import CategoryResultScreen from "./screens/CategoryResultScreen";
import ItemDetailScreen from "./screens/ItemDetailScreen";

// ui based imports
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import useClassified from "./redux/hooks/useClassified";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#5c5c5c",
    accent: "#5a70ed",
  },
};

const InitialScreen = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="ExploreTabScreen"
      component={ExploreTabScreen}
      options={{
        title: "Explore",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-list-box" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="BookmarksTabScreen"
      component={BookmarksTabScreen}
      options={{
        title: "Bookmarks",
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons
            name="collections-bookmark"
            size={size}
            color={color}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

const Main = () => {
  const { loadClassifiedsFromStorage } = useClassified();
  useEffect(() => {
    loadClassifiedsFromStorage();
  }, []);
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="InitialScreen" headerMode="none">
          <Stack.Screen name="InitialScreen" component={InitialScreen} />
          <Stack.Screen name="CreateItemScreen" component={CreateItemScreen} />
          <Stack.Screen
            name="CategoryResultScreen"
            component={CategoryResultScreen}
          />
          <Stack.Screen name="ItemDetailScreen" component={ItemDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Main;
