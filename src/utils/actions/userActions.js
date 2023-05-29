import { getDatabase, child, ref, get } from "firebase/database";
import { getFirebaseApp } from "../firebaseHelper";

export const getUserData = async (userId) => {
  try {
    const app = getFirebaseApp();
    const dbref = ref(getDatabase(app));
    const userRef = child(dbref, `users/${userId}`);

    const snapshot = get(userRef);
    return snapshot.val();
  } catch (error) {
    console.log("error", error);
  }
};
