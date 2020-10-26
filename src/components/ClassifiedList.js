import React from "react";
import * as PropTypes from "prop-types";
import { StyleSheet, FlatList } from "react-native";

import ClassifiedListItem from "../components/ClassifiedListItem";

const ClassifiedList = ({ classifiedList }) => {
  
  const renderClassifiedList = ({ item, index }) => {
    return (
      <ClassifiedListItem
        classified={item}
        isLastItem={index === classifiedList.length - 1}
      />
    );
  };

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
