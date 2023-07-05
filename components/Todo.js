import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Checkbox from "./Checkbox";
import moment from "moment";

const Todo = ({ id, text, isCompleted, isToday, hour }) => {
  return (
    <View style={styles.container}>
      <Checkbox
        id={id}
        text={text}
        isCompleted={isCompleted}
        isToday={isToday}
        hour={hour}
      />
      <View>
        <Text
          style={
            isCompleted
              ? [
                  styles.text,
                  { textDecorationLine: "line-through", color: "#7845" },
                ]
              : styles.text
          }
        >
          {text}
        </Text>
        <Text
          style={
            isCompleted
              ? [
                  styles.time,
                  { textDecorationLine: "line-through", color: "#7845" },
                ]
              : styles.time
          }
        >
          {hour}
        </Text>
      </View>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: "#737373",
  },
  time: {
    fontSize: 13,
    color: "#737373",
  },
});
