import React, { useState, useEffect } from "react";
import { onValue, get, update, child, ref } from "firebase/database";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { getRecommendFoods } from "../recommendations/nutritionRecc";
import { auth, db } from "../firebaseConfig";

type FoodRecommendation = {
  foodName: string;
  benefits: string;
  image: string;
};

const imageMap = {
  "../images/almonds.jpg": require("../images/almonds.jpg"),
  "../images/cheese.jpg": require("../images/cheese.jpg"),
  "../images/egg_yolks.jpg": require("../images/egg_yolk.jpg"),
  "../images/mushrooms.jpg": require("../images/mushroom.jpg"),
  "../images/saffron.jpg": require("../images/saffron.jpg.webp"),
  "../images/tomatoes.jpg": require("../images/tomatoes.jpg"),
  "../images/beef.jpg": require("../images/beef.jpg"),
  "../images/chia_seeds.jpg": require("../images/chia_seeds.jpg"),
  "../images/fenugreek_seed.jpg": require("../images/fenugreek_seeds.jpg"),
  "../images/oysters.jpg": require("../images/oysters.jpg"),
  "../images/salmon.jpg": require("../images/salmon.jpg"),
  "../images/walnuts.jpg": require("../images/walnuts.jpg"),
  "../images/broccoli.jpg": require("../images/broccoli.jpg"),
  "../images/chicken.jpg": require("../images/chicken.jpg"),
  "../images/ginger.jpg": require("../images/ginger.jpg"),
  "../images/pumpkin_seeds.jpg": require("../images/pumpkin_seeds.jpg"),
  "../images/spinach.jpg": require("../images/spinach.jpg"),
  "../images/whole_wheat.jpg": require("../images/whole_wheat.jpg"),
  "../images/brown_rice.jpg": require("../images/brown_rice.jpg"),
  "../images/cinnamon.jpg": require("../images/cinnamon.jpg"),
  "../images/milk.jpg": require("../images/milk.jpg"),
  "../images/quinoa.jpg": require("../images/quinoa.jpg"),
  "../images/st_john's_wort.jpg": require("../images/st_johns_wort.jpg"),
  "../images/yogurt.jpg": require("../images/yogurt.jpg"),
};

const Nutrition: React.FC = () => {
  // get nutrition plan from user
  const [plan, setPlan] = useState<FoodRecommendation[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const uid = user.uid;
      const userRef = ref(db, `users/${uid}`);
      const unsubscribe = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data["nutritionplans"]) {
          setPlan(data["nutritionplans"]);
        }
      });
      return () => unsubscribe();
    }
  }, []);

  console.log(plan);

  const NewCard: React.FC<FoodRecommendation> = ({
    foodName,
    benefits,
    image,
  }) => {
    return (
      <View style={[styles.card_template]}>
        <View style={styles.imageHolder}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={imageMap[image]}
          />
        </View>
        <Text style={styles.section_title}>{foodName}</Text>
        <Text style={styles.section_text}>{benefits}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Nutrition </Text>

      <ScrollView
        contentContainerStyle={styles.cardContainer}
        style={styles.scrollView}
      >
        {plan.map((recc, i) => (
          <NewCard
            key={i}
            foodName={recc.foodName}
            benefits={recc.benefits}
            image={recc.image}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Center items vertically
    alignItems: "center", // Center items horizontally
    backgroundColor: "#FFF4F3",
    padding: 10,
  },
  header: {
    fontWeight: "bold",
    marginVertical: 20,
    fontSize: 35,
    fontFamily: "Cormorant_700Bold",
    marginTop: 50,
  },
  cardContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card_template: {
    width: 350,
    height: 300,
    backgroundColor: "#D5ECD5",
    borderRadius: 10,
    justifyContent: "center", // Center content vertically
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    // box shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    padding: 10,
  },
  photo_template: {
    width: 300,
    height: 100,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    justifyContent: "center", // Center content vertically
    marginBottom: 10,
  },
  section_title: {
    fontWeight: "bold",
    paddingLeft: 15,
    fontSize: 20,
  },
  scrollView: {
    maxHeight: 700, // Adjust the maximum height as needed
  },
  section_text: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    paddingTop: 10,
  },
  image: {
    width: 315, // Adjust the width as needed
    height: 150, // Adjust the height as needed
    borderRadius: 5, // Add b
  },
  imageHolder: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    overflow: 'hidden',
  }
});

export default Nutrition;
