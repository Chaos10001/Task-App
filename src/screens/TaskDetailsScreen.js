import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const TaskDetailsScreen = () => {
  const [tasks, setTasks] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://${process.env.API_HOST}:3000/api/v1/tasks`);
        const data = await response.json();

        if (response.ok) {
          setTasks(data.tasks);
        } else {
          console.log(data.msg);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (isFocused) {
      fetchTask();
    }
  }, [isFocused]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://${process.env.API_HOST}:3000/api/v1/tasks/${id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== id));
        console.log("task deleted");
      } else {
        const data = await response.json();
        console.log("Error message:", data.msg);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {Array.isArray(tasks) ? (
          tasks.map((task) => (
            <View key={task._id} style={styles.content}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("edittaskdetails", { id: task._id })
                }
              >
                <View>
                  <Text
                    style={{
                      marginVertical: 3,
                      fontSize: 19,
                      fontWeight: "bold",
                    }}
                  >
                    {task.name}
                  </Text>
                  <Text style={{ color: "blue" }}>
                    Completed: {task.completed ? "Yes" : "No"}
                  </Text>
                </View>
              </TouchableOpacity>
              <View>
                <TouchableOpacity onPress={() => handleDelete(task._id)}>
                  <Text style={{ color: "red" }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text>No tasks available</Text>
        )}
      </View>
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => navigation.navigate("createtask")}
      >
        <Text style={{ color: "red" }}>+ Create New Task</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TaskDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    paddingHorizontal: 9,
    // justifyContent: "center",
  },
  content: {
    marginVertical: 8,
    marginHorizontal: 2,
    padding: 6,
    borderColor: "indigo",
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
