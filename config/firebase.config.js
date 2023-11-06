import firebase from "firebase-admin";
import config from "./serviceAccountKey.json" assert { type: "json" };
firebase.initializeApp({
  credential: firebase.credential.cert(config)
});
export default firebase;
