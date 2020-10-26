import React, { useState } from "react";
import { Appbar, ProgressBar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import * as PropTypes from "prop-types";

import ClassifiedList from "../components/ClassifiedList";
import Container from "../components/Container";
import useClassified from "../redux/hooks/useClassified";
import CategorySelector from "../components/CategorySelector";

const ExploreTabScreen = ({ navigation }) => {
  // using the classified hook to listen for the
  // classified list state so that whenever item being
  // changed, list gets changed accordingly
  const { classifiedList, classifiedProcessing } = useClassified();

  // state for notifying whether category selector should
  // be visible or not
  const [categorySelectorVisible, setCategorSelectorVisible] = useState(false);
  
  // callback function to be called when category selection dialog being dismissed
  const hideCategorySelector = (category) => {
    // hiding category selection dialog
    setCategorSelectorVisible(false);
    if (category) {
      // navigating to category result screen
      // only if category is being selected by the user
      navigation.navigate("CategoryResultScreen", {
        category,
      });
    }
  };

  return (
    <Container>
      <Appbar.Header title="asdasd">
        <Appbar.Action
          animated={false}
          icon={() => <AntDesign name="pluscircleo" size={24} color="black" />}
          onPress={() => {
            navigation.navigate("CreateItemScreen");
          }}
        />
        <Appbar.Content title="Explore" />
        <Appbar.Action
          animated={false}
          icon={() => <AntDesign name="filter" size={24} color="black" />}
          onPress={() => setCategorSelectorVisible(true)}
        />
      </Appbar.Header>
      <ProgressBar indeterminate={true} visible={classifiedProcessing} color="#ff6e6e" />
      <ClassifiedList classifiedList={classifiedList} />
      <CategorySelector
        visible={categorySelectorVisible}
        onDismiss={hideCategorySelector}
      />
    </Container>
  );
};

ExploreTabScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

export default ExploreTabScreen;
