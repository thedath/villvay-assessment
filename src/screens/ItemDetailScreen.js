import React, { useState } from "react";
import * as PropTypes from "prop-types";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Appbar, ProgressBar } from "react-native-paper";

import Container from "../components/Container";
import useClassified from "../redux/hooks/useClassified";

const ItemDetailScreen = ({ navigation, route }) => {
  const { classifiedProcessing, changeBookmarkStatus } = useClassified();
  const [classified, setClassified] = useState(route.params.classified);
  const { width } = useWindowDimensions();

  const getBookmarkIconProps = () =>
    classified.bookmarked
      ? { name: "bookmark", color: "red" }
      : { name: "bookmark", color: "white" };

  const onBookmarkPressed = () => {
    changeBookmarkStatus(classified.time);
    setClassified({
      ...classified,
      bookmarked: !classified.bookmarked,
    });
  };

  return (
    <Container>
      <Appbar.Header style={styles.header}>
        <Appbar.Action
          animated={false}
          icon={() => <Ionicons name="md-arrow-back" size={24} color="black" />}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
        />
        <Appbar.Content title={classified.title} color="black" />
        <Appbar.Action
          animated={false}
          icon={() => (
            <FontAwesome
              style={styles.bookmark}
              {...getBookmarkIconProps()}
              size={24}
            />
          )}
          onPress={onBookmarkPressed}
        />
      </Appbar.Header>
      <View style={styles.rootContainer}>
        <Image
          style={{ width, height: (width / 4) * 3 }}
          source={{ uri: classified.imageURI }}
        />
        <ProgressBar indeterminate={true} visible={classifiedProcessing} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.category}>{classified.category}</Text>
        <Text style={styles.title}>{classified.title}</Text>
      </View>
      <ScrollView
        style={styles.descriptionContainer}
        showsVerticalScrollIndicator={false}
        horizontal={false}
      >
        <Text style={styles.description}>
          {classified.description}
          {classified.description}
          {classified.description}
          {classified.description}
        </Text>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  rootContainer: {},
  header: {},
  textContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  descriptionContainer: {
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  category: {
    fontSize: 14,
    color: "grey",
  },
  description: {
    fontSize: 16,
  },
});

ItemDetailScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      classified: PropTypes.object.isRequired,
    }),
  }),
};

export default ItemDetailScreen;
