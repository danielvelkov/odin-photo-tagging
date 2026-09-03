import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  addDoc,
  collection,
  doc,
  getDocs,
  where,
  query,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

import { config } from './config.js';
import { thoughts } from './data.js';
import { formatDurationBetweenDates } from '../helpers.js';

const app = initializeApp(config);
const db = getFirestore(app);

const auth = getAuth();
// Sign in silently in the background
signInAnonymously(auth)
  .then(() => {
    console.log('Logged in anonymously');
  })
  .catch((error) => {
    console.error('Anonymous auth failed', error);
  });

export async function getLeaderboard() {
  const q = query(collection(db, 'scores'), where('endTime', '!=', null));
  const scoreSnap = await getDocs(q);

  // 1. Check if the query returned any documents using .empty firebase method
  if (scoreSnap.empty) {
    console.log('No such documents!');
    return [];
  }

  // 2. Map through the document results to extract data + document IDs
  const scores = scoreSnap.docs.map((doc) => {
    const data = doc.data();
    const start = data.startTime.toDate(); // firebase method for converting to date
    const end = data.endTime.toDate();

    const time = formatDurationBetweenDates(start, end);
    return {
      id: doc.id,
      name: data.name,
      time,
      duration: data.endTime.seconds - data.startTime.seconds,
    };
  });

  scores.sort((prev, next) => prev.duration > next.duration);
  return scores;
}

export async function getThoughts() {
  return new Promise((resolve) => resolve(thoughts));
}

export async function startGameSession(name) {
  try {
    const gameSession = {
      name,
      startTime: new Date(),
      endTime: null,
    };
    const docRef = await addDoc(collection(db, 'scores'), gameSession);
    return { ...gameSession, id: docRef.id };
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function endGameSession(id) {
  try {
    const endTime = new Date();
    const docRef = doc(db, 'scores', id);
    await updateDoc(docRef, {
      endTime,
    });
    const updatedSnap = await getDoc(docRef);
    const data = updatedSnap.data();

    // Return the data with the ID included
    return {
      id: updatedSnap.id,
      ...data,
    };
  } catch (e) {
    console.error('Error updating document: ', e);
  }
}
