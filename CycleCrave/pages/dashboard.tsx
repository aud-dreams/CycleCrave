import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import Icon from "react-native-vector-icons/FontAwesome";

const Dashboard = () => {
  const [symptoms, setSymptoms] = useState(2);
  const [water, setWater] = useState(4);
  const [sleep, setSleep] = useState(3);
  const [nutrition, setNutrition] = useState(1);

  const renderHearts = (count) => {
    let hearts = [];
    for (let i = 0; i < 5; i++) {
      hearts.push(<Icon key={i} name="heart" size={30} color="#FF69B4" />);
    }
    return hearts;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi, Audrey</Text>
      <Calendar
      // ...any props you want to pass to the calendar
      />
      <View style={styles.category}>
        <Text style={styles.categoryTitle}>SYMPTOMS</Text>
        <View style={styles.heartsContainer}>{renderHearts(symptoms)}</View>
      </View>
      <View style={styles.category}>
        <Text style={styles.categoryTitle}>WATER</Text>
        <View style={styles.heartsContainer}>{renderHearts(water)}</View>
      </View>
      <View style={styles.category}>
        <Text style={styles.categoryTitle}>SLEEP</Text>
        <View style={styles.heartsContainer}>{renderHearts(sleep)}</View>
      </View>
      <View style={styles.category}>
        <Text style={styles.categoryTitle}>NUTRITION</Text>
        <View style={styles.heartsContainer}>{renderHearts(nutrition)}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  category: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
    padding: 10,
    borderRadius: 15,
    backgroundColor: "#ffe4e1",
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  heartsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
});

export default Dashboard;
