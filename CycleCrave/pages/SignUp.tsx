import * as React from "react";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from "firebase/database";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const SignUp = ({ navigation }: RouterProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            set(ref(db, `users/${user.uid}`), {
              name: name,
              nutritionplans: ["hello"],
              hydrationGoal: 1,
              sleepGoal: 0,
              symptomScore: 3,
              sleepScore: 3,
              hydrationScore: 3,
            });

            navigation.navigate("Goals");
          })
          .catch((error) => {
            // Handle error updating profile
            console.error("Error updating profile:", error);
          });

        navigation.navigate("Goals");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    console.log("Email:", email, "Password:", password);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.text}>Create Account</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Landing")}
      >
        <Text style={styles.text}>Back</Text>
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

export default SignUp;
