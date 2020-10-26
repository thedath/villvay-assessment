import React from "react";
import * as PropTypes from "prop-types";
import { StyleSheet, FlatList } from "react-native";

import ClassifiedListItem from "../components/ClassifiedListItem";

// reusable component for displaying a given list of
// classifieds
const ClassifiedList = ({ classifiedList }) => {
  // callback function to be called when rendering
  // each of the classified object in the classified
  // list of data
  const renderClassifiedList = ({ item, index }) => (
    <ClassifiedListItem
      classified={item}
      isLastItem={index === classifiedList.length - 1}
    />
  );

  return (
    <FlatList
      style={styles.classifiedList}
      data={classifiedList}
      keyExtractor={(classified) => `list-item-${classified.time}`}
      renderItem={renderClassifiedList}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  classifiedList: {
    flex: 1,
    padding: 5,
  },
});

ClassifiedList.propTypes = {
  classifiedList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      imageURI: PropTypes.string.isRequired,
      bookmarked: PropTypes.bool.isRequired,
      time: PropTypes.number.isRequired,
    })
  ),
};

export default ClassifiedList;
