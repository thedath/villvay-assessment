import React, { useState } from "react";
import { Appbar, ProgressBar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import * as PropTypes from "prop-types";

import ClassifiedList from "../components/ClassifiedList";
import Container from "../components/Container";
import useClassified from "../redux/hooks/useClassified";
import CategorySelector from "../components/CategorySelector";

const ExploreTabScreen = ({ navigation }) => {
  const { classifiedList, classifiedProcessing } = useClassified();

  const [categorySelectorVisible, setCategorSelectorVisible] = useState(false);
  const hideCategorySelector = (category) => {
    setCategorSelectorVisible(false);
    if (category) {
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
