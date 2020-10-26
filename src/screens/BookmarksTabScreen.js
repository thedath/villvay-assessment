import React from "react";
import { Appbar, ProgressBar } from "react-native-paper";

import Container from "../components/Container";
import ClassifiedList from "../components/ClassifiedList";
import useClassified from "../redux/hooks/useClassified";

const BookmarksTabScreen = () => {
  // using the classified hook to listen for the
  // classified list state so that whenever item being
  // changed, list gets changed accordingly
  const { classifiedList, classifiedProcessing } = useClassified();

  // filtering the classified list by bookmarked status
  const filterBookmarkedClassifieds = () =>
    classifiedList.filter((classified) => classified.bookmarked);

  return (
    <Container>
      <Appbar.Header>
        <Appbar.Content title="Bookmarks" />
      </Appbar.Header>
      <ProgressBar indeterminate={true} visible={classifiedProcessing} color="#ff6e6e" />
      <ClassifiedList classifiedList={filterBookmarkedClassifieds()} />
    </Container>
  );
};

export default BookmarksTabScreen;
