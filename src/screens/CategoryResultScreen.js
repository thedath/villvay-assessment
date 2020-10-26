import React from "react";
import { Appbar, ProgressBar } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as PropTypes from "prop-types";

import Container from "../components/Container";
import useClassified from "../redux/hooks/useClassified";
import ClassifiedList from "../components/ClassifiedList";

const CategoryResultScreen = ({ route }) => {
  // using the classified hook to listen for the
  // classified list state so that whenever item being
  // changed, list gets changed accordingly
  const { classifiedList, classifiedProcessing } = useClassified();
  // fetching the category user selected on 
  // category selection dialog screen
  const { category } = route.params;
  const navigation = useNavigation();
  // filter classified list by user selected category
  const filterClassifiedsByCategory = () =>
    classifiedList.filter((classified) => classified.category === category);

  return (
    <Container>
      <Appbar.Header>
        <Appbar.Action
          icon={() => <Ionicons name="md-arrow-back" size={24} color="black" />}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
          animated={false}
        />
        <Appbar.Content title={category} />
      </Appbar.Header>
      <ProgressBar indeterminate={true} visible={classifiedProcessing} color="#ff6e6e" />
      <ClassifiedList classifiedList={filterClassifiedsByCategory()} />
    </Container>
  );
};

CategoryResultScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object.isRequired,
  })
}

export default CategoryResultScreen;
