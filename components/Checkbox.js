import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";

const Checkbox = ({ id, text, isCompleted, isToday, hour }) => {
  return isToday ? (
    <TouchableOpacity style={isCompleted ? styles.checked : styles.unChecked}>
      {isCompleted && <Entypo name="check" size={16} color="FAFAFA" />}
    </TouchableOpacity>
  ) : (
    <View style={styles.isToday} />
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  checked: {
    width: 20,
    height: 20,
    marginRight: 13,
    borderRadius: 6,
    backgroundColor: "#262626",
    alignItems: 'center',
    marginLeft: 15
  },
  unChecked: {
    // Define styles for unchecked checkbox
    width: 20,
    height: 20,
    marginRight: 13,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#262626",
    alignItems: 'center',
    marginLeft: 15
  },
  isToday: {
    // Define styles for isToday indicator
    width: 10,
    height: 10,
    marginRight: 13,
    borderRadius: 5,
    backgroundColor: "#262626",
    marginLeft: 15
  },
});
