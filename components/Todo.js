import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Checkbox from "./Checkbox";

const Todo = ({ id, text, isCompleted, isToday, hour }) => {
  const [localHour, setLocalHour] = useState(new Date(hour));

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
                  { textDecorationLine: "line-through", color: "#737373" },
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
                  { textDecorationLine: "line-through", color: "#737373" },
                ]
              : styles.time
          }
        >
          {new Date(hour).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
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
    fontWeight: "500",
    color: "#737373",
  },
  time: {
    fontSize: 13,
    color: "#737373",
  },
});
