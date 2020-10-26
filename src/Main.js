// make below line the first import of this file
import "react-native-gesture-handler";

// importing react base
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

// importing navigation
import MainNavigation from "./navigators/MainNavigation";

// ui based imports
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

// classified hook
import useClassified from "./redux/hooks/useClassified";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#5c5c5c",
    accent: "#5a70ed",
  },
};

const Main = () => {
  // fetching the classifieds from local storage
  const { loadClassifiedsFromStorage } = useClassified();
  useEffect(() => {
    loadClassifiedsFromStorage();
  }, []);
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Main;
