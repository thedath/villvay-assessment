/* eslint-disable react/prop-types */
import React from "react";
import { Appbar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as PropTypes from "prop-types";

const MainHeader = ({ title }) => {
  const navigation = useNavigation();
  return (
    <Appbar.Header title="asdasd">
      <Appbar.Action
        animated={false}
        icon={() => <AntDesign name="pluscircleo" size={24} color="black" />}
        onPress={() => {
          navigation.navigate("CreateItemScreen");
        }}
      />
      <Appbar.Content title={title} />
      <Appbar.Action
        animated={false}
        icon={() => <AntDesign name="filter" size={24} color="black" />}
        onPress={() => {
          navigation.navigate("CategoryListScreen");
        }}
      />
    </Appbar.Header>
  );
};

MainHeader.prototype = {
  title: PropTypes.string.isRequired,
};

export default MainHeader;
