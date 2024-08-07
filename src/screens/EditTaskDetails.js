import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const EditTaskDetails = ({ route }) => {
  const { id } = route.params || {};
  const [editTasks, setEditTasks] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const handleEditTask = async () => {
    if (editTasks.trim() === "") {
      setError("Task cannot be empty");
      return;
    }
    try {
      const response = await fetch(
        `http://192.168.43.176:3000/api/v1/tasks/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editTasks,
            completed: true,
          }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        console.log(data.msg);
        console.log("Error");
      }
      if (response.ok) {
        setEditTasks("");
        setError("");
        console.log("Task Edited successfully", data);
        navigation.navigate("taskdetails");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Task ID: {id}</Text>
        <View style={styles.input}>
          <TextInput
            placeholder="Edit your task"
            value={editTasks}
            onChangeText={setEditTasks}
          />
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <View style={[styles.center, styles.spacer]}>
          <TouchableOpacity style={styles.btn} onPress={handleEditTask}>
            <Text>Edit Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditTaskDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
