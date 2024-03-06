import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUp from "./pages/SignUp";
import Landing from "./pages/landing";
import Dashboard from "./pages/dashboard";
import { useFonts } from "expo-font";
import {
  Cormorant_400Regular,
  Cormorant_700Bold,
} from "@expo-google-fonts/cormorant";
import BottomTabNav from "./components/navbar";
import Hydration from "./pages/hydration";
import Nutrition from "./pages/nutrition";
import Period from "./pages/period";
import SignIn from "./pages/SignIn";
import Goals from "./pages/goals";

const Stack = createNativeStackNavigator();

function App() {
  let [fontsLoaded] = useFonts({
    Cormorant_400Regular,
    Cormorant_700Bold,
  });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="BottomTabNav"
          component={BottomTabNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Hydration"
          component={Hydration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Nutrition"
          component={Nutrition}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Period"
          component={Period}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Goals"
          component={Goals}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
