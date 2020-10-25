import React, { useState } from "react";
import { Appbar, HelperText, TextInput } from "react-native-paper";
import Container from "../components/Container";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CategorySelector from "../components/CategorySelector";

const CreateIconScreen = () => {
  const navigation = useNavigation();

  // title state management
  const [title, setTitle] = useState("");
  const [titleChanged, setTitleChanged] = useState(false);
  const getTitleError = () => {
    if (title === "") {
      return "Title cannot be empty";
    } else if (title.length < 10) {
      return "Title length should be at least 10 characters long";
    } else if (title.length > 40) {
      return "Title length should be less than 40 characters";
    } else {
      return false;
    }
  };
  const hasTitleError = () => {
    return titleChanged && getTitleError();
  };

  // category state management
  const [category, setCategory] = useState("");
  const [categoryChanged, setCategoryChanged] = useState(false);
  const [categorySelectorVisible, setCategorSelectorVisible] = useState(false);
  const hideCategorySelector = (category) => {
    setCategorSelectorVisible(false);
    if (category) {
      setCategory(category);
    }
  };
  const getCategoryError = () => {
    if (category === "") {
      return "Category must be selected";
    } else {
      return false;
    }
  };
  const hasCategoryError = () => {
    return categoryChanged && getCategoryError();
  };

  // description state management
  const [description, setDescription] = useState("");
  const [descriptionChanged, setDescriptionChanged] = useState(false);
  const getDescriptionError = () => {
    if (description === "") {
      return "Description cannot be empty";
    } else if (description.length < 10) {
      return "Description length should be at least 30 characters long";
    } else if (description.length > 500) {
      return "Description length should be less than 500 characters";
    } else {
      return false;
    }
  };
  const hasDescriptionError = () => {
    return descriptionChanged && getDescriptionError();
  };

  return (
    <Container>
      <Appbar.Header color="red">
        <Appbar.Action
          animated={false}
          icon={() => <Ionicons name="md-arrow-back" size={24} color="black" />}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            }
          }}
        />
        <Appbar.Content title="New Classified" />
        <Appbar.Action
          animated={false}
          icon={() => <Feather name="save" size={24} color="black" />}
          onPress={() => {
            if (
              getTitleError() ||
              getCategoryError() ||
              getDescriptionError()
            ) {
              setTitleChanged(true);
              setCategoryChanged(true);
              setDescriptionChanged(true);
            } else {
              navigation.goBack();
            }
          }}
        />
      </Appbar.Header>
      <ScrollView
        style={styles.rootContainer}
        horizontal={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleContainer}>
          <TextInput
            style={styles.titleInput}
            label="Title"
            value={title}
            onChangeText={(text) => {
              setTitleChanged(true);
              setTitle(text);
            }}
            onBlur={() => {}}
            onFocus={() => {}}
          />
          <HelperText type="error" visible={hasTitleError()}>
            {getTitleError()}
          </HelperText>
        </View>
        <View>
          <TouchableOpacity
            style={styles.categorySelectContainer}
            onPress={() => {
              setCategorSelectorVisible(true);
              setCategoryChanged(true);
            }}
          >
            <Text style={styles.categoryLabel}>Selected category</Text>
            <Text style={styles.categorySelect}>
              {category ? category : "Click to change"}
            </Text>
          </TouchableOpacity>
          <HelperText type="error" visible={hasCategoryError()}>
            {getCategoryError()}
          </HelperText>
          <CategorySelector
            visible={categorySelectorVisible}
            onDismiss={hideCategorySelector}
          />
        </View>
        <View style={styles.descriptionContainer}>
          <TextInput
            style={styles.descriptionInput}
            label="Description"
            value={description}
            onChangeText={(text) => {
              setDescriptionChanged(true);
              setDescription(text);
            }}
            multiline={true}
          />
          <HelperText type="error" visible={hasDescriptionError()}>
            {getDescriptionError()}
          </HelperText>
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    padding: 10,
  },
  titleContainer: {
    marginBottom: 10,
  },
  titleInput: {
    backgroundColor: "transparent",
  },
  categorySelectContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  categoryLabel: {
    fontWeight: "bold",
    marginLeft: 5,
    marginRight: 10,
    fontSize: 15,
  },
  categorySelect: {
    flex: 1,
    fontSize: 15,
  },
  descriptionContainer: {},
  descriptionInput: {
    backgroundColor: "transparent",
  },
});

export default CreateIconScreen;
