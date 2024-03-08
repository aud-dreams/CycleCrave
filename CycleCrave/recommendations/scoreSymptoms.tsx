import React, { useState, useEffect } from "react";
import { DataSnapshot, onValue, ref } from "firebase/database";
import { auth, db } from "../firebaseConfig";

export interface symtomsDetail {
  Bloating: boolean;
  Constipation: boolean;
  Headache: boolean;
  "Mood Swings": boolean;
  PMS: boolean;
  "Period Cramps": boolean;
}

export const scoreSymptoms = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const uid = user.uid;

  // calculate score for SYMPTOMS
  const userRef = ref(db, `users/${uid}`);
  const symptomsRef = ref(db, `symptoms/${uid}`);

  const symptomsSnapshot = await new Promise<DataSnapshot>((resolve) => {
    onValue(symptomsRef, (snapshot) => {
      resolve(snapshot);
    });
  });

  const userSnapshot = await new Promise<DataSnapshot>((resolve) => {
    onValue(userRef, (snapshot) => {
      resolve(snapshot);
    });
  });

  const allSymptoms = (symptomsSnapshot.val() as Record<string, any>) || {};
  let userData = (userSnapshot.val() as Record<string, any>) || {};

  let keys = Object.keys(allSymptoms);
  let currentSymptoms = allSymptoms[keys[keys.length - 1]];
  let previousSymptoms = allSymptoms[keys[keys.length - 2]];

  const currentTrueSymptoms = Object.keys(currentSymptoms).filter(
    (symptom) => currentSymptoms[symptom]
  );

  const previousTrueSymptoms = Object.keys(previousSymptoms).filter(
    (symptom) => previousSymptoms[symptom]
  );

  if (currentTrueSymptoms.length > previousTrueSymptoms.length) {
    if (userData.symptomScore != 0) {
      userData.symptomScore -= 1;
    }
  } else if (currentTrueSymptoms.length < previousTrueSymptoms.length) {
    if (userData.symptomScore != 5) {
      userData.symptomScore += 1;
    }
  }

  return userData.symptomScore;
};
