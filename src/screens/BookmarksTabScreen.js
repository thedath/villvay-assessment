import React from "react";
import { StyleSheet, FlatList } from "react-native";

import Container from "../components/Container";
import ClassifiedListItem from "../components/ClassifiedListItem";
import useClassified from "../redux/hooks/useClassified";
import { Appbar, ProgressBar } from "react-native-paper";

const BookmarksTabScreen = () => {
  const { classifiedList, classifiedProcessing } = useClassified();

  const filterBookmarkedClassifieds = () =>
    classifiedList.filter((classified) => classified.bookmarked);

  const renderClassifiedList = ({ item, index }) => {
    return <ClassifiedListItem classified={item} isLastItem={index === classifiedList.length - 1} />;
  };

  return (
    <Container>
      <Appbar.Header>
        <Appbar.Content title="Bookmarks" />
      </Appbar.Header>
      <ProgressBar indeterminate={true} visible={classifiedProcessing} />
      <FlatList
        style={styles.classifiedList}
        data={filterBookmarkedClassifieds()}
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

export default BookmarksTabScreen;
