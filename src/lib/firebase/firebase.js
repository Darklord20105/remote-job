// Import the functions you need from the SDKs you need
import firebase  from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const analytics = getAnalytics(app);

export const auth = firebase.auth();
export const firestore = firebase.firestore()
