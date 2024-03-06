import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { NavigationProp } from "@react-navigation/native";

interface RouterProps {
  navigation: NavigationProp<any, any>;
}

const Landing = ({ navigation }: RouterProps) => {
  const logo = require("../assets/CycleCraveLogo.png");

  return (
    <View style={styles.container}>
      <Image source={logo} resizeMode="contain" style={styles.logo}></Image>
      <Text style={styles.name}>CycleCrave</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.text}>Sign up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={styles.text}>Sign in</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={styles.text}>Dash</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#FFF4F3",
  },
  name: {
    fontSize: 40,
    color: "#FF898D",
    fontFamily: "Cormorant_700Bold",
  },
  button: {
    width: "45%",
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: "#FEDBD5",
    borderColor: "#FF898D",
    marginTop: 30,
  },
  logo: {
    maxHeight: 150,
    maxWidth: 150,
    marginBottom: 30,
  },
  text: {
    fontSize: 16,
  },
});

export default Landing;
