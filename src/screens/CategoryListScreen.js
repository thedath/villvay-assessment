import React from "react";
import { Appbar } from "react-native-paper";
import { Text } from "react-native";
import Container from "../components/Container";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useClassified from "../redux/hooks/useClassified";

const CategoryListScreen = () => {
  const {
    classifiedList
  } = useClassified();
  const navigation = useNavigation();
  return (
    <Container>
      {console.log({ classifiedList })}
      <Appbar.Header color="red">
        <Appbar.Action
          icon={() => <Ionicons name="md-arrow-back" size={24} color="black" />}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
        />
        <Appbar.Content title="Categories" />
      </Appbar.Header>
      <Text>CategoryListScreen</Text>
    </Container>
  );
};

export default CategoryListScreen;
