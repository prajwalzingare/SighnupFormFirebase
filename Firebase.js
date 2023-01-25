import firebase from "firebase/app";
import "firebase/auth";
const app = firebase.initializeApp({
  apiKey: process.env.FIRE_BASE_API_KEY,
  authDomain: process.env.FIRE_BASE_AUTH_DOMAIN,
  projectId: process.env.FIRE_BASE_PROJECT_ID,
  storageBucket: process.env.FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIRE_BASE_MESSAGING_SENDER_ID,
  appId: FIRE_BASE_APP_ID,
});

export const auth = app.auth();
export default app;
