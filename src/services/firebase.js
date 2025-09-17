import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA1-HfNDHExuZFy02P9JYfyijSNr0bQoJQ",
    authDomain: "flirtify-4afc9.firebaseapp.com",
    projectId: "flirtify-4afc9",
    storageBucket: "flirtify-4afc9.firebasestorage.app",
    messagingSenderId: "254862521296",
    appId: "1:254862521296:web:a7096cd7a7f77df62b3fd5",
    measurementId: "G-5LG74VFW6W"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const saveUserSession = async (walletAddress, profileData) => {
  try {
    const userRef = doc(db, "users", walletAddress);
    await setDoc(userRef, {
      lastLogin: new Date().toISOString(),
      walletAddress: walletAddress,
      profile: profileData,
    }, { merge: true });
    console.log("User session and profile saved to Firebase:", walletAddress);
  } catch (error) {
    console.error("Error saving user session:", error);
  }
};

export const checkIfUserExists = async (walletAddress) => {
    try {
        const userRef = doc(db, "users", walletAddress);
        const userSnap = await getDoc(userRef);
        return userSnap.exists();
    } catch (error) {
        console.error("Error checking user existence:", error);
        return false;
    }
};

// New function to get user profile data
export const getUserProfile = async (walletAddress) => {
  try {
    const userRef = doc(db, "users", walletAddress);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      return userSnap.data().profile;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};