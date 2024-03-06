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
import { auth } from "../firebaseConfig";
import {
  EmailAuthCredential,
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
} from "firebase/auth";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const SignIn = ({ navigation }: RouterProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const logo = require("../assets/CycleCraveLogo.png");

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;

        // ...

        navigation.navigate("BottomTabNav");
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
      {/* <Image source={logo} resizeMode="contain" style={styles.logo}></Image>
      <Text style={styles.name}>CycleCrave</Text> */}
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
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.text}>Sign In</Text>
      </TouchableOpacity>
      <Text onPress={() => navigation.navigate("Landing")}>Back to home</Text>
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

export default SignIn;
