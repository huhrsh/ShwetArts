// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { browserLocalPersistence, getAuth, setPersistence, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_api_key,
  authDomain: process.env.REACT_APP_auth_domain,
  projectId: process.env.REACT_APP_project_id,
  storageBucket: process.env.REACT_APP_storage_bucket,
  messagingSenderId: process.env.REACT_APP_messaging_sender_id,
  appId: process.env.REACT_APP_app_id,
  measurementId: process.env.REACT_APP_measurement_id
};

console.log(firebaseConfig)

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage=getStorage(app)
setPersistence(auth, browserLocalPersistence);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();

export { auth, db,provider,storage }