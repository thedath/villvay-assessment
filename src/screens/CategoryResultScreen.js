import React from "react";
import { Appbar, ProgressBar } from "react-native-paper";
import { StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as PropTypes from "prop-types";

import Container from "../components/Container";
import useClassified from "../redux/hooks/useClassified";
import ClassifiedListItem from "../components/ClassifiedListItem";

const CategoryResultScreen = ({ route }) => {
  const { category } = route.params;
  const navigation = useNavigation();
  const { classifiedList, classifiedProcessing } = useClassified();


  const filterClassifiedsByCategory = () =>
    classifiedList.filter((classified) => classified.category === category);

  const renderClassifiedList = ({ item }) => {
    return <ClassifiedListItem classified={item} />;
  };

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
      <ProgressBar indeterminate={true} visible={classifiedProcessing} />
      <FlatList
        style={styles.classifiedList}
        data={filterClassifiedsByCategory()}
        keyExtractor={(classified) => `list-item-${classified.time}`}
        renderItem={renderClassifiedList}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  classifiedList: {
    padding: 5,
  },
});

CategoryResultScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.object.isRequired,
  })
}

export default CategoryResultScreen;
