import * as React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { ref, update } from "firebase/database";
import { auth, db } from "../firebaseConfig";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Goals = ({ navigation }: RouterProps) => {
  const [sleepGoal, setSleepGoal] = useState("");
  const [hydrationGoal, setHydrationGoal] = useState("");

  const submitGoals = () => {
    const user = auth.currentUser;
    const uid = user.uid;
    update(ref(db, `users/${user.uid}`), {
      hydrationGoal: hydrationGoal,
      sleepGoal: sleepGoal,
    });

    navigation.navigate("BottomTabNav");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Set a Sleep Goal"
        value={sleepGoal}
        onChangeText={setSleepGoal}
      />
      <TextInput
        style={styles.input}
        placeholder="Set a Hydration Goal"
        value={hydrationGoal}
        onChangeText={setHydrationGoal}
      />
      <TouchableOpacity style={styles.button} onPress={submitGoals}>
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF4F3",
  },
  name: {
    fontSize: 40,
    color: "#FF898D",
    fontFamily: "Cormorant_700Bold",
  },
  subheader: {
    fontSize: 20,
    color: "black",
    fontFamily: "Cormorant_700Bold",
  },
  input: {
    width: "80%",
    height: 40,
    padding: 10,
    borderWidth: 1,
    marginBottom: 30,
    borderRadius: 10,
    backgroundColor: "#FEDBD5",
    borderColor: "#FF898D",
  },
  logo: {
    maxHeight: 150,
    maxWidth: 150,
    marginBottom: 30,
  },
  button: {
    width: "45%",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#FEDBD5",
    borderColor: "#FF898D",
    marginTop: 20,
  },
  text: {
    fontSize: 16,
  },
});

export default Goals;
