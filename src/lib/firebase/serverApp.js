// this component is used only in server pages where you place use server at the top of the page
import "server-only";                                                       
import { headers } from "next/headers";

import { initializeApp, initializeServerApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from './firebaseConfig';
const app = initializeApp(firebaseConfig);

export async function getAuthenticatedAppForUser() {
  const idToken = headers().get("Authorization")?.split("Bearer ")[1];

  const firebaseServerApp = initializeServerApp(
    firebaseConfig,
    idToken ? { authIdToken: idToken, } : {}
  );

  const auth = getAuth(firebaseServerApp);
  await auth.authStateReady();

  return { firebaseServerApp, currentUser: auth.currentUser };
}


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

