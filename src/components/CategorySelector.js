import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Dialog, List, Portal, } from "react-native-paper";
import * as PropTypes from "prop-types";

import { CATEGORY_LIST } from "../constant";

// pop up dialog for selecting one classified category
const CategorySelector = ({ visible, onDismiss }) => {
  return (
    <Portal>
      <Dialog
        style={styles.contentWrapper}
        visible={visible}
        onDismiss={onDismiss}
      >
        <Dialog.Title>Select category</Dialog.Title>
        <Dialog.Content>
          <ScrollView horizontal={false} style={{ height: 300 }}>
            {CATEGORY_LIST.map((category, index) => (
              <List.Item
                key={`category-${index}`}
                style={styles.listItem}
                title={category}
                onPress={() => {
                  onDismiss(category);
                }}
              />
            ))}
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            color="black"
            onPress={() => {
              onDismiss();
            }}
          >
            Close
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  contentWrapper: {},
  listItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: "grey",
  }
});

CategorySelector.propTypes = {
  visible: PropTypes.bool.isRequired,
  onDismiss: PropTypes.func.isRequired,
}

export default CategorySelector;
