import { firebase_app } from "../data/config";
import "firebase/storage";

export const loginUser = async (email, pass) => {
  const currentUser = await firebase_app
    .auth()
    .signInWithEmailAndPassword(email, pass);
  const uid = currentUser.user.uid;
  return uid;
};
