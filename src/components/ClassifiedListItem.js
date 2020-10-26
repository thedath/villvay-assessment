import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useClassified from "../redux/hooks/useClassified";
import * as PropTypes from "prop-types";

const ClassifiedListItem = ({ classified, isLastItem }) => {
  let marginBottom = 5;
  if (isLastItem) {
    marginBottom = 20;
  }
  const {
    changeBookmarkStatus,
  } = useClassified();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const getBookmarkIconProps = () =>
    classified.bookmarked
      ? { name: "bookmark", color: "#ff6e6e" }
      : { name: "bookmark", color: "white" };

  const onItemPressed = () => {
    navigation.navigate("ItemDetailScreen", {
      classified
    });
  }

  const onBookmarkPressed = () => {
    changeBookmarkStatus(classified.time);
  }

  return (
    <TouchableOpacity style={{...styles.container, marginBottom }} onPress={onItemPressed}>
      <View style={styles.textItemContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{classified.title}</Text>
        <Text style={styles.category}>{classified.category}</Text>
        <Text style={styles.description} numberOfLines={5} ellipsizeMode="tail">
          {classified.description}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={{ ...styles.image, width: width / 4, height: width / 4 }}
          source={{ uri: classified.imageURI }}
        />
        <FontAwesome
          style={styles.bookmark}
          {...getBookmarkIconProps()}
          size={24}
          onPress={onBookmarkPressed}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 5,
    padding: 10,
    borderRadius: 3,
    backgroundColor: "white",
    elevation: 5,
  },
  textItemContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  category: {
    fontSize: 11,
    color: "grey",
  },
  description: {
    fontSize: 12,
    marginTop: 5,
  },
  imageContainer: {},
  image: {
    marginLeft: 10,
    borderRadius: 5,
  },
  bookmark: {
    position: "absolute",
    alignSelf: "flex-end",
    top: 5,
    right: 5,
  },
});

ClassifiedListItem.propTypes = {
  classified: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    imageURI: PropTypes.string.isRequired,
    bookmarked: PropTypes.bool.isRequired,
    time: PropTypes.number.isRequired,
  }),
  isLastItem: PropTypes.bool.isRequired,
};

export default ClassifiedListItem;
