import React, { useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { Appbar, ProgressBar } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import * as PropTypes from "prop-types";

import ClassifiedListItem from "../components/ClassifiedListItem";
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

  const renderClassifiedList = ({ item }) => {
    return <ClassifiedListItem classified={item} />;
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
      <ProgressBar indeterminate={true} visible={classifiedProcessing} />
      <FlatList
        style={styles.classifiedList}
        data={classifiedList}
        keyExtractor={(classified) => `list-item-${classified.time}`}
        renderItem={renderClassifiedList}
        showsVerticalScrollIndicator={false}
      />
      <CategorySelector
        visible={categorySelectorVisible}
        onDismiss={hideCategorySelector}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  classifiedList: {
    padding: 5,
  },
});

ExploreTabScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }),
};

export default ExploreTabScreen;
