import AsyncStorage from "@react-native-community/async-storage";

export const CLASSIFIED_SET_LIST = "classified-list";
export const CLASSIFIED_SET_ERROR = "classified-error";
export const CLASSIFIED_SET_PROCESSING = "classified-progress";
export const CLASSIFIED_RESET_STATE = "classified-reset";

export const saveClassified = (
  title,
  description,
  category,
  imageURI
) => async (dispatch) => {
  dispatch({ type: CLASSIFIED_SET_PROCESSING });
  try {
    await AsyncStorage.getItem("classifiedsJSON")
      .then(async (storedClassifiedsJSON) => {
        let storedClassifieds = JSON.parse(storedClassifiedsJSON);
        let classifieds = [];
        if (Array.isArray(storedClassifieds)) {
          classifieds = storedClassifieds;
        }
        classifieds.push({
          title,
          description,
          category,
          imageURI,
          time: (new Date()).getTime(),
        });
        await AsyncStorage.setItem(
          "classifiedsJSON",
          JSON.stringify(classifieds)
        )
          .then(() => {
            dispatch({
              type: CLASSIFIED_SET_LIST,
              payload: classifieds,
            });
          })
          .catch((error) => {
            dispatch({
              type: CLASSIFIED_SET_ERROR,
              payload: error,
            });
          });
      })
      .catch((error) => {
        dispatch({
          type: CLASSIFIED_SET_ERROR,
          payload: error,
        });
      });
  } catch (error) {
    dispatch({
      type: CLASSIFIED_SET_ERROR,
      payload: "Classified saving failed",
    });
  }
};

export const loadClassifiedsFromStorage = () => async (dispatch) => {
  dispatch({ type: CLASSIFIED_SET_PROCESSING });
  try {
    await AsyncStorage.getItem("classifiedsJSON")
      .then(async (storedClassifiedsJSON) => {
        let storedClassifieds = JSON.parse(storedClassifiedsJSON);
        let classifieds = [];
        if (Array.isArray(storedClassifieds)) {
          classifieds = storedClassifieds;
        }
        dispatch({
          type: CLASSIFIED_SET_LIST,
          payload: classifieds,
        });
      })
      .catch((error) => {
        dispatch({
          type: CLASSIFIED_SET_ERROR,
          payload: error,
        });
      });
  } catch (error) {
    dispatch({
      type: CLASSIFIED_SET_ERROR,
      payload: "Classified fetching failed",
    });
  }
}
