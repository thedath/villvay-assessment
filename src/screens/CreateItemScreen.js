import React, { useState } from "react";
import { Appbar, HelperText, TextInput, ProgressBar } from "react-native-paper";
import Container from "../components/Container";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import CategorySelector from "../components/CategorySelector";
import ImageUploadLabel from "../../assets/click-to-upload-photo.png";
import * as ImagePicker from "expo-image-picker";
import useClassified from "../redux/hooks/useClassified";

const CreateIconScreen = () => {
  const {
    classifiedErrorMessage,
    classifiedProcessing,
    saveClassified
  } = useClassified();
  const navigation = useNavigation();
  // gettig device width for dynamic styling
  const { width } = useWindowDimensions();

  // title state management
  const [title, setTitle] = useState("");
  // state to identify whether title is being changed or not
  const [titleChanged, setTitleChanged] = useState(false);
  // gets error of title if any
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
  // title is error full only after
  // it's being offred to changed
  const hasTitleError = () => {
    return titleChanged && getTitleError();
  };

  // description state management
  const [description, setDescription] = useState("");
  // state to identify whether description is being changed or not
  const [descriptionChanged, setDescriptionChanged] = useState(false);
  // gets error of description if any
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
  // description is error full only after
  // it's being offred to changed
  const hasDescriptionError = () => {
    return descriptionChanged && getDescriptionError();
  };

  // category state management
  const [category, setCategory] = useState("");
  // state to identify whether category is being changed or not
  const [categoryChanged, setCategoryChanged] = useState(false);
  // state to figure out whether category selection dialog
  // should be set to visible or not
  const [categorySelectorVisible, setCategorSelectorVisible] = useState(false);
  // callback function to be called when category selection
  // dialog get dissmissed
  const hideCategorySelector = (category) => {
    // user intend to change the category
    setCategorSelectorVisible(false);
    if (category) {
      // changing the current category only
      // there's been a new category selection
      setCategory(category);
    }
  };
  // gets error of category if any
  const getCategoryError = () => {
    if (category === "") {
      return "Category must be selected";
    } else {
      return false;
    }
  };
  // category is error full only after
  // it's being offred to changed
  const hasCategoryError = () => {
    return categoryChanged && getCategoryError();
  };

  const defaultImageURI = Image.resolveAssetSource(ImageUploadLabel).uri;

  // image state management
  const [image, setImage] = useState(defaultImageURI);
  // state to identify whether image is being changed or not
  const [imageChanged, setImageChanged] = useState(false);
  // state to figure out whether camera rool permissions
  // been granted or not
  const [storageAccessStatus, setStorageAccessStatus] = useState("denied");
  // helper method for triggering the request of camera roll permissions
  const requestCameraRollPermission = async () => {
    // user intend to change the image
    setImageChanged(true);
    const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
    // sets the status of the permisson request
    setStorageAccessStatus(status);
    return status;
  };
  // gets error of image if any
  const getImageError = () => {
    if (storageAccessStatus !== "granted") {
      return "Camera roll permission needs to be granted";
    } else if (image === "" || image === defaultImageURI) {
      return "An image needs to be selected";
    } else {
      return false;
    }
  };
  // image is error full only after
  // it's being offred to changed
  const hasImageError = () => {
    return imageChanged && getImageError();
  };

  // callback function to be run when
  // title input text being changed by the user
  const onTitleChanged = (text) => {
    setTitleChanged(true);
    setTitle(text);
  };

  // callback function to be run when
  // description input text being changed by the user
  const onDescriptionChanged = (text) => {
    setDescriptionChanged(true);
    setDescription(text);
  };

  // callback function to be run when
  // user clicks on the category text placeholder
  const onCategoryChanged = () => {
    setCategorSelectorVisible(true);
    setCategoryChanged(true);
  };

  // callback function to be run when
  // user clicks on image upload placeholder
  const onImageChange = async () => {
    // gets the stauts of the camera roll access permission
    const status = await requestCameraRollPermission();
    if (status === "granted") {
      // if access has been granted, calls on image picker
      // to select an image from device storage
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      // sets the newly selected image's uri
      // only if there's a new selection
      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
  };

  // callback function to be called when user 
  // clicks on back button of the header
  const onBackPressed = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  // callback function to be called
  // wehn user clicks on save header button
  const onSavePressed = async () => {
    // checks for any error on user inputs
    if (
      getTitleError() ||
      getCategoryError() ||
      getDescriptionError() ||
      getImageError()
    ) {
      // if there's an error in any of the
      // input fileds, notifiying that they have changed
      // so that all the error messages gets rendered
      // on the screen
      setTitleChanged(true);
      setCategoryChanged(true);
      setDescriptionChanged(true);
      setImageChanged(true);
    } else {
      await saveClassified(title, description, category, image);
      navigation.goBack();
    }
  };

  return (
    <Container>
      <Appbar.Header color="red">
        <Appbar.Action
          animated={false}
          icon={() => <Ionicons name="md-arrow-back" size={24} color="black" />}
          onPress={onBackPressed}
        />
        <Appbar.Content title="New Classified" />
        <Appbar.Action
          animated={false}
          icon={() => <Feather name="save" size={24} color="black" />}
          onPress={onSavePressed}
        />
      </Appbar.Header>
      <ProgressBar indeterminate={true} visible={classifiedProcessing} />
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
            onChangeText={(text) => onTitleChanged(text)}
          />
          <HelperText type="error" visible={hasTitleError()}>
            {getTitleError()}
          </HelperText>
        </View>
        <View style={styles.descriptionContainer}>
          <TextInput
            style={styles.descriptionInput}
            label="Description"
            value={description}
            onChangeText={(text) => onDescriptionChanged(text)}
            multiline={true}
          />
          <HelperText type="error" visible={hasDescriptionError()}>
            {getDescriptionError()}
          </HelperText>
        </View>
        <View style={styles.categorySelectOuterContainer}>
          <TouchableOpacity
            style={styles.categorySelectInnerContainer}
            onPress={onCategoryChanged}
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
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={onImageChange}>
            <Image
              style={{ ...styles.image, width: width - 20, height: ((width - 20) / 4) * 3 }}
              source={{ uri: image }}
            />
          </TouchableOpacity>
          <HelperText type="error" visible={hasImageError()}>
            {classifiedErrorMessage !== "" ? classifiedErrorMessage : getImageError()}
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
  titleContainer: {},
  titleInput: {
    backgroundColor: "transparent",
  },
  categorySelectOuterContainer: {
    marginBottom: 10,
  },
  categorySelectInnerContainer: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
  },
  categoryLabel: {
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
    fontSize: 15,
  },
  categorySelect: {
    flex: 1,
    fontSize: 15,
  },
  descriptionContainer: {
    marginBottom: 10,
  },
  descriptionInput: {
    backgroundColor: "transparent",
  },
  image: {
    borderWidth: 0.75,
    borderColor: "black",
  },
  imageContainer: {
    marginBottom: 20,
  }
});

export default CreateIconScreen;
