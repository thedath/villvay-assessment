import React from "react";
import { View, StyleSheet } from "react-native";
import { PropTypes } from "prop-types";

// reusable wrapper component to act as the root
// component of a screen
const Container = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
