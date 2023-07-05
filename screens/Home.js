import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

const Home = () => {
  const [localData, setLocalData] = useState(
    todosData.sort((a, b) => {
      return a.isCompleted - b.isCompleted;
    })
  );

  const [isHidden, setIsHidden] = useState(false);
  const navigation = useNavigation();

  const handleHidePress = () => {
    if (isHidden) {
      setIsHidden(false);
      setLocalData(
        todosData.sort((a, b) => {
          return a.isCompleted - b.isCompleted;
        })
      );
      return;
    }
    setIsHidden(!isHidden);
    setLocalData(localData.filter((todo) => !todo.isCompleted));
  };


  return (
    <View style={styles.container}>
      <Image
       source={{ uri: ''}}
       style={styles.pic}
       />
       <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'space-between'}}>
            <Text style={styles.title}>Today</Text>
            <TouchableOpacity onPress={handleHidePress}>
                <Text style={{color:'#3478f6'}}>{isHidden ? "Show Compleated" : "Hide Compleated"}</Text>
            </TouchableOpacity>
       </View>
       <TodoList todosData={localData.filter(todo => todo.isToday)} />
       
       <Text style={styles.title}>Tomorrow</Text>
       <TodoList todosData={localData.filter(todo => !todo.isToday)} />
       <TouchableOpacity onPress={() => navigation.navigate("Add")} style={styles.button}>
        <Text style={styles.plus}>+</Text>
       </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 70,
        paddingHorizontal: 15,
    },
    pic:{
        width: 42,
    }
});
