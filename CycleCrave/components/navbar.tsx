import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import {
  FontAwesome,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Dashboard from "../pages/dashboard";
import Sleep from "../pages/sleep";
import Hydration from "../pages/hydration";
import Nutrition from "../pages/nutrition";
import Period from "../pages/period";

const BottomTab = createBottomTabNavigator();

const BottomTabNav: React.FC = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#FF898D",
        tabBarIcon: ({ color, size, focused }) => {
          let iconComponent;

          if (route.name === "Dashboard") {
            iconComponent = (
              <FontAwesome
                name="home"
                size={size}
                color={focused ? "#FF898D" : color}
                style={styles.icon}
              />
            );
          } else if (route.name === "Sleep") {
            iconComponent = (
              <FontAwesome
                name="bed"
                size={size}
                color={focused ? "#FF898D" : color}
                style={styles.icon}
              />
            );
          } else if (route.name === "Hydration") {
            iconComponent = (
              <FontAwesome6
                name="glass-water"
                size={20}
                color={focused ? "#FF898D" : color}
                style={styles.icon}
              />
            );
          } else if (route.name === "Period") {
            iconComponent = (
              <Ionicons
                name="water-sharp"
                size={26}
                color={focused ? "#FF898D" : color}
                style={styles.icon}
              />
            );
          } else if (route.name === "Nutrition") {
            iconComponent = (
              <MaterialCommunityIcons
                name="food-apple"
                size={28}
                color={focused ? "#FF898D" : color}
                style={styles.icon}
              />
            );
          }

          return iconComponent;
        },
        tabBarStyle: {
          backgroundColor: "#FFDAD7",
          borderRadius: 25,
          height: 60,
          position: "absolute",
          bottom: 25,
          left: 15,
          right: 15,
          paddingBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
        },
      })}
    >
      <BottomTab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      ></BottomTab.Screen>
      <BottomTab.Screen
        name="Sleep"
        component={Sleep}
        options={{ headerShown: false }}
      ></BottomTab.Screen>
      <BottomTab.Screen
        name="Hydration"
        component={Hydration}
        options={{ headerShown: false }}
      ></BottomTab.Screen>
      <BottomTab.Screen
        name="Period"
        component={Period}
        options={{ headerShown: false }}
      ></BottomTab.Screen>
      <BottomTab.Screen
        name="Nutrition"
        component={Nutrition}
        options={{ headerShown: false }}
      ></BottomTab.Screen>
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginTop: 7,
  },
});

export default BottomTabNav;
