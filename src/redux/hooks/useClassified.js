import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as ClassifiedActions from "../actions/classifiedActions";

/**
 * Hook for handle classified related operations asynchonously. Redux related
 * operations (Ex: dispatching) are encapsulated so UIs will be more clean.
 */
const useClassified = () => {
  const dispatch = useDispatch();

  const { list, errorMessage, processing } = useSelector(
    (state) => state.classified
  );

  /**
   * Save a classified information in the local storage of the device and
   * in memory as well
   * 
   */
  const saveClassified = useCallback(
    async (title, description, category, imageURI) => {
      return await dispatch(
        ClassifiedActions.saveClassified(title, description, category, imageURI)
      );
    },
    [dispatch]
  );

  /**
   * Load all the classifieds from local storage 
   * of the device to memory as well
   * 
   */
  const loadClassifiedsFromStorage = useCallback(
    async () => {
      return await dispatch(
        ClassifiedActions.loadClassifiedsFromStorage()
      );
    },
    [dispatch]
  );

  // returning states of classified and async operations
  return {
    classifiedList: list,
    classifiedErrorMessage: errorMessage,
    classifiedProcessing: processing,
    saveClassified,
    loadClassifiedsFromStorage,
  };
};

export default useClassified;
