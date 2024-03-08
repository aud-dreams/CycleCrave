import { onValue, ref } from "firebase/database";
import { auth, db } from "../firebaseConfig";
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
  let symptoms = {};
  let cravings = {};
  const cravingsRef = ref(db, `cravings/${uid}`);
  const symptomsRef = ref(db, `symptoms/${uid}`);

  // Fetch the most recent cravings
  const fetchCravings = new Promise((resolve) => {
    onValue(cravingsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const timestamps = Object.keys(data);
        const mostRecentTimestamp = Math.max(...timestamps.map(Number));
        cravings = data[mostRecentTimestamp];
      }
      resolve(cravings);
    });
  });

  // Fetch the most recent symptoms
  const fetchSymptoms = new Promise((resolve) => {
    onValue(symptomsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const timestamps = Object.keys(data);
        const mostRecentTimestamp = Math.max(...timestamps.map(Number));
        symptoms = data[mostRecentTimestamp];
      }
      resolve(symptoms);
    });
  });

  await Promise.all([fetchCravings, fetchSymptoms]);

  let recommendations = [];

  for (const [foodName, foodDetail] of Object.entries(foodData)) {
    const { tags, benefits, image } = foodDetail;

    const trueSymptoms = Object.keys(symptoms).filter(
      (symptom) => symptoms[symptom]
    );
    const trueCravings = Object.keys(cravings).filter(
      (craving) => cravings[craving]
    );

    const isRecommended = tags.some(
      (tag) => trueSymptoms.includes(tag) || trueCravings.includes(tag)
    );

    if (isRecommended) {
      recommendations.push({ foodName, benefits, image });
    }
  }

  return recommendations;
};
