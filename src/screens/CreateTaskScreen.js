import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const CreateTaskScreen = ({ navigate }) => {
  const navigation = useNavigation();
  const [task, setTask] = useState();
  const [error, setError] = useState(null);

  const handleAddTask = async () => {
    if (task.trim() === "") {
      setError("Task cannot be empty");
      return;
    }

    try {
      const response = await fetch("http://192.168.43.176:3000/api/v1/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: task.toString(),
          completed: false,
        }),
      });
      const data = await response.json();
      console.log("Response:", response);
      console.log("Data:", data);
      if (response.ok) {
        Alert.alert("Success", "Task added successfully");
        setTask("");
        setError(null);
      } else if (task.length > 12) {
        Alert.alert("Words must not be more than 12 character");
        setError("Words must not be more than 12 character");
      } else {
        console.log("Error message:", data.msg);
        Alert.alert("Error", "Failed to add task");
        setError(
          typeof data.msg === "string" ? data.msg : JSON.stringify(data.msg)
        );
      }
    } catch (error) {
      console.log(error);
      console.log("Network error:", error);
      Alert.alert("Error", "Failed to add task");
      setError("Network error. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Text style={[styles.title, styles.spacer]}>Task Manager</Text>
        <View>
          <View style={styles.input}>
            <TextInput
              placeholder="Insert your task..."
              value={task}
              onChangeText={setTask}
            />
          </View>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <View style={[styles.center, styles.spacer]}>
            <TouchableOpacity style={styles.btn} onPress={handleAddTask}>
              <Text>Create Task</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.center]}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate("taskdetails")}
            >
              <Text>View Tasks</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateTaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 17,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    height: 40,
    width: wp("60%"),
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  btn: {
    backgroundColor: "#6aabd9",
    alignItems: "center",
    width: wp("40%"),
    height: hp("5%"),
    borderRadius: 5,
    justifyContent: "center",
  },
  spacer: {
    marginVertical: hp("2%"),
  },
  center: {
    alignItems: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 5,
  },
});
