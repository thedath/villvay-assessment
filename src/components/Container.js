import React from "react";
import { View, StyleSheet } from "react-native";
import { PropTypes } from "prop-types";

const Container = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
