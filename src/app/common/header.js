'use client'
import { SiteLogo } from './svg';
import Link from 'next/link';
import { useUserSession } from './hooks/useUserSession';
import {
  signInWithGoogle,
  signOut,
  onAuthStateChanged
} from "../../lib/firebase/auth";

/*function UserInfo = () => {
  return
}*/

export default function Header({ initialUser }) {
  const user = useUserSession(initialUser);
  const handleSignOut = event => {
    event.preventDefault();
    signOut();
  };

  const handleSignIn = event => {
    event.preventDefault();
    signInWithGoogle();
  };

  return (
    <header className="relative py-6">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="relative flex items-center justify-between">
          <h1 className="m-0 text-xl font-bold uppercase leading-none">
            <Link href="/" className="flex items-center gap-2 no-underline">
              <SiteLogo />
              <span>title remote spaim</span>
            </Link>
          </h1>
        </div>
        <div>
          {user ?
            <div>
              <h1>{user.displayName}</h1>
              <a href='#' onClick={handleSignOut}> log out </a>
            </div>
            : <a href='#' onClick={handleSignIn}> login </a>}
        </div>
      </div>
    </header>
  )
}
