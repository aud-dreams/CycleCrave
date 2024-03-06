import { onValue, ref } from "firebase/database";
import { auth, db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import foodData from "./foodData.json";

export interface FoodDetail {
  tags: string[];
  benefits: string;
  image: string;
}

export const useRecommendFoods = () => {
  const [recommendations, setRecommendations] = useState<
    Array<{ foodName: string; benefits: string; image: string }>
  >([]);

  // Function to fetch most recent cravings and symptoms from the database
  useEffect(() => {
    const fetchRecentData = async () => {
      const user = auth.currentUser;

      if (user) {
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

        // create recommendations
        let reccList = [];
        for (const [foodName, foodDetail] of Object.entries(
          foodData as Record<string, FoodDetail>
        )) {
          const { tags, benefits, image } = foodDetail;

          const trueSymptoms: string[] = Object.entries(symptoms)
            .filter(([symptom, value]) => value)
            .map(([symptom, value]) => symptom);
          const trueCravings: string[] = Object.entries(cravings)
            .filter(([symptom, value]) => value)
            .map(([symptom, value]) => symptom);

          for (const tag in tags) {
            if (trueSymptoms.includes(tag) || trueCravings.includes(tag)) {
              reccList.push({ foodName, benefits, image });
              break;
            }
          }
        }
        setRecommendations(reccList);
      }
    };

    fetchRecentData();
  }, []);

  return recommendations;
};
