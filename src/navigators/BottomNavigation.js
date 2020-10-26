import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as PropTypes from "prop-types";

import ExploreTabScreen from "../screens/ExploreTabScreen";
import BookmarksTabScreen from "../screens/BookmarksTabScreen";

const onExploreTabIconRender = ({ color, size }) => (
  <Ionicons name="ios-list-box" size={size} color={color} />
);

const onBookmarkTabIconRender = ({ color, size }) => (
  <MaterialIcons name="collections-bookmark" size={size} color={color} />
);

const BottomNavigation = () => {
  // creating the bottom navigation components
  // made it as a seperate component so that when 
  // customizing the bottom navigation, only this file
  // grow and will make the code clean and more readable
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="ExploreTabScreen"
        component={ExploreTabScreen}
        options={{
          title: "Explore",
          tabBarIcon: (props) => onExploreTabIconRender(props),
        }}
      />
      <Tab.Screen
        name="BookmarksTabScreen"
        component={BookmarksTabScreen}
        options={{
          title: "Bookmarks",
          tabBarIcon: (props) => onBookmarkTabIconRender(props),
        }}
      />
    </Tab.Navigator>
  );
};

onExploreTabIconRender.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

onBookmarkTabIconRender.propTypes = {
  color: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

export default BottomNavigation;
