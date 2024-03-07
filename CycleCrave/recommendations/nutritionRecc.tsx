import { DataSnapshot, onValue, ref } from "firebase/database";
import { auth, db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import foodData from "./foodData.json";

export interface FoodDetail {
  tags: string[];
  benefits: string;
  image: string;
}

export const getRecommendFoods = async () => {
  const user = auth.currentUser;
  if (!user) return []; // If user is not authenticated, return an empty array

  const uid = user.uid;
  const cravingsRef = ref(db, `cravings/${uid}`);
  const symptomsRef = ref(db, `symptoms/${uid}`);

  // Fetch the most recent cravings
  const cravingsSnapshot = await new Promise<DataSnapshot>((resolve) => {
    onValue(cravingsRef, (snapshot) => {
      resolve(snapshot);
    });
  });

  // Fetch the most recent symptoms
  const symptomsSnapshot = await new Promise<DataSnapshot>((resolve) => {
    onValue(symptomsRef, (snapshot) => {
      resolve(snapshot);
    });
  });

  const cravings = cravingsSnapshot.val() as Record<string, any> || {};
  const symptoms = symptomsSnapshot.val() as Record<string, any> || {};

  let recommendations = [];

  for (const [foodName, foodDetail] of Object.entries(foodData)) {
    const { tags, benefits, image } = foodDetail;

    const trueSymptoms = Object.keys(symptoms).filter(symptom => symptoms[symptom]);
    const trueCravings = Object.keys(cravings).filter(craving => cravings[craving]);

    tags.forEach(tag => {
      if (trueSymptoms.includes(tag) || trueCravings.includes(tag)) {
        recommendations.push({ foodName, benefits, image });
      }
    });
  }

  return recommendations;
};