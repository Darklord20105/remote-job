'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import {
	signInWithGoogle,
	signOut,
	onAuthStateChanged
} from "../../../lib/firebase/auth";
import { useRouter } from "next/navigation";
import { firebaseConfig } from '../../../lib/firebase/firebaseConfig';

export function useUserSession(initialUser) {
	// The initialUser comes from the server via a server component
	const [user, setUser] = useState(initialUser);
	const router = useRouter();

	// Register the service worker that sends auth state back to server
	// The service worker is built with npm run build-service-worker
	useEffect(() => {
		if ("serviceWorker" in navigator) {
			const serializedFirebaseConfig = encodeURIComponent(JSON.stringify(firebaseConfig));
			const serviceWorkerUrl = `http://localhost:3000/auth-service-worker.js?firebaseConfig=${serializedFirebaseConfig}`

		  navigator.serviceWorker
			.register(serviceWorkerUrl, {scope: 'http://localhost:3000' })
			.then((registration) => {
			  console.log('success')
			}).catch(err => console.log(err.message, 'xxxxxxxxxxx') );
		}
	  }, []);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged((authUser) => {
			setUser(authUser)
		})

		return () => unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		onAuthStateChanged((authUser) => {
			if (user === undefined) return

			// refresh when user changed to ease testing
			if (user?.email !== authUser?.email) {
				router.refresh()
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

	return user;
}
