import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import CreateTaskScreen from "../screens/CreateTaskScreen";
import TaskDetailsScreen from "../screens/TaskDetailsScreen";
import EditTaskDetails from "../screens/EditTaskDetails";

const Stack = createStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        // initialRouteName="edittaskdetails"
      >
        <Stack.Screen name="createtask" component={CreateTaskScreen} />
        <Stack.Screen name="taskdetails" component={TaskDetailsScreen} />
        <Stack.Screen name="edittaskdetails" component={EditTaskDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
