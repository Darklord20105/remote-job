'use client'
import React, { useState } from 'react';
import { SiteLogo } from './svg';
import Link from 'next/link';
import { useUserSession } from './hooks/useUserSession';
import {
  signInWithGoogle,
  signOut,
  onAuthStateChanged
} from "../../lib/firebase/auth";

//   https://tailwindflex.com/@anonymous/quora-reddit?utm_source=fullscreen-preview&utm_medium=footer

const Logo = () => (
  <div className="flex flex-shrink-0 items-center">
    <a href="/">
      <img className="block h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=rose&shade=500" alt="Your Company" />
    </a>
  </div>
);

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${searchTerm}`);
    // Add your search logic here
  };

  return (
    <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
      <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
        <div className="w-full">
          <form onSubmit={handleSearchSubmit}>
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                id="search"
                name="search"
                className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-rose-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-rose-500 sm:text-sm"
                placeholder="Search"
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const MobileMenuButton = ({ open, setOpen }) => (
  <div className="flex items-center md:absolute md:inset-y-0 md:right-0 lg:hidden">
    <button
      type="button"
      className="-mx-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
      onClick={() => setOpen(!open)}
      aria-expanded={open}
    >
      <span className="sr-only">Open menu</span>
      <svg className={`h-6 w-6 ${open ? 'hidden' : 'block'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
      <svg className={`h-6 w-6 ${open ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
);

const MobileMenu = ({ open, handleSignIn, handleSignOut, user }) => (
  <nav className={`lg:hidden ${open ? 'block' : 'hidden'}`} aria-label="Global">
    <div className="mx-auto max-w-3xl space-y-1 px-2 pt-2 pb-3 sm:px-4">
      <a href="#" className="bg-gray-100 text-gray-900 block rounded-md py-2 px-3 text-base font-medium">Home</a>
      <a href="#" className="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium">Popular</a>
      <a href="#" className="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium">Communities</a>
      <a href="#" className="hover:bg-gray-50 block rounded-md py-2 px-3 text-base font-medium">Trending</a>
    </div>

    <div className="border-t border-gray-200 pt-4">
	{user ? <>
      <div className="mx-auto flex max-w-3xl items-center px-4 sm:px-6">
        <div className="flex-shrink-0">
          <img className="h-10 w-10 rounded-full" src="https://via.placeholder.com/40" alt="User" />
        </div>
        <div className="ml-3">
          <div className="text-base font-medium text-gray-800">{user.displayName}</div>
          <div className="text-sm font-medium text-gray-500">{user.email}</div>
        </div>
      </div>
      <div className="mx-auto mt-3 max-w-3xl space-y-1 px-2 sm:px-4">
        <a href={"/user/"+user.uid} className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">Your Profile</a>
        <a href="#" className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">Settings</a>
        <a href="#" className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900" onClick={handleSignOut}>Sign out</a>
      </div>
	</>
	: 
	<div className="mx-auto max-w-3xl space-y-1 px-2 sm:px-4">.
	  <a href="#" className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900" onClick={handleSignIn}>login</a> </div>}
    </div>

    <div className="mx-auto mt-6 max-w-3xl px-4 sm:px-6">
      <a href="#" className="flex w-full items-center justify-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-rose-700">New Post</a>
    </div>
  </nav>
);

const DesktopDropdownMenu = ({ open, setOpen, user, handleSignOut }) => (
  <div className={`absolute right-0 mt-2 w-48 bg-white shadow-lg ring-1 ring-black ring-opacity-5 ${open ? 'block' : 'hidden'}`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
    <div className="p-2">
      <a href={"/user"+user.uid} className="flex items-center rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
        <svg className="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg">
	  <g transform="translate(0 -1028.4)">
	    <path d="m12 0c-0.405 0-0.805 0.060326-1.188 0.15625-0.224 0.05678-0.44 0.13135-0.656 0.21875-0.083 0.03401-0.1679 0.05534-0.2498 0.09375-0.034 0.01583-0.06 0.04594-0.0937 0.0625-0.2032 0.10058-0.4021 0.21704-0.5937 0.34375-0.027 0.0174-0.0671 0.01339-0.0938 0.03125-0.0563 0.03864-0.101 0.08419-0.1562 0.12495-0.1569 0.1126-0.3216 0.216-0.4688 0.3438-0.1342 0.1207-0.2494 0.2724-0.375 0.4062-0.4251 0.4359-0.7936 0.8971-1.0938 1.4376-0.5154 0.9034-0.9002 1.9205-1.0624 2.9687-0.0783-0.0165-0.1501-0.0224-0.2188 0-0.5251 0.171-0.6545 1.1685-0.3125 2.2187 0.2007 0.6163 0.5346 1.1015 0.875 1.375 0.4573 1.7778 1.4257 3.2598 2.6875 4.1878v1.031l-1 1-2 1c-1.6173 0.801-3.2284 1.605-4.8438 2.406-0.89513 0.54-1.2415 1.6-1.1562 2.594 0.041664 0.626-0.18448 1.427 0.4375 1.844 0.5909 0.304 1.2959 0.106 1.9375 0.156 1.8766-0.001 3.7484 0 5.625 0 2.669 0.001 5.331 0 8 0 2.367 0 4.727 0.004 7.094 0 0.768-0.054 0.981-0.865 0.906-1.5 0.014-0.932 0.069-1.976-0.656-2.688-0.592-0.602-1.434-0.84-2.156-1.25-1.061-0.525-2.128-1.037-3.188-1.562l-2-1-1-1v-1.031c1.262-0.928 2.23-2.41 2.688-4.1878 0.34-0.2736 0.674-0.7588 0.874-1.375 0.342-1.0502 0.213-2.0477-0.312-2.2187-0.069-0.0224-0.14-0.0165-0.219 0-0.162-1.0482-0.547-2.0653-1.062-2.9687-0.3-0.5405-0.669-1.0017-1.094-1.4376-0.126-0.1338-0.241-0.2855-0.375-0.4062-0.006-0.0055-0.025 0.0055-0.031 0-0.392-0.3499-0.827-0.61894-1.281-0.84375-0.115-0.05622-0.227-0.10854-0.344-0.15625-0.084-0.03401-0.165-0.06426-0.25-0.09375-0.255-0.08848-0.516-0.17356-0.782-0.21875-0.02-0.003405-0.042 0.003148-0.062 0-0.249-0.039144-0.495-0.06525-0.75-0.0625z" fill="#34495e" transform="translate(0 1028.4)" />
	    <path d="m0 1051.4c0.026419 0.3 0.12651 0.6 0.4375 0.8 0.5909 0.3 1.2959 0.1 1.9375 0.2h5.625 8 7.094c0.576-0.1 0.842-0.5 0.906-1h-24z" fill="#2c3e50" />
	</g>
	</svg>
        Your Profile
      </a>
      <a href="#" className="flex items-center rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
        <svg className="h-6 w-6 mr-2" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title /><desc /><defs /><g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1"><g fill="#000000" id="Core" transform="translate(-464.000000, -380.000000)"><g id="settings" transform="translate(464.000000, 380.000000)"><path d="M17.4,11 C17.4,10.7 17.5,10.4 17.5,10 C17.5,9.6 17.5,9.3 17.4,9 L19.5,7.3 C19.7,7.1 19.7,6.9 19.6,6.7 L17.6,3.2 C17.5,3.1 17.3,3 17,3.1 L14.5,4.1 C14,3.7 13.4,3.4 12.8,3.1 L12.4,0.5 C12.5,0.2 12.2,0 12,0 L8,0 C7.8,0 7.5,0.2 7.5,0.4 L7.1,3.1 C6.5,3.3 6,3.7 5.4,4.1 L3,3.1 C2.7,3 2.5,3.1 2.3,3.3 L0.3,6.8 C0.2,6.9 0.3,7.2 0.5,7.4 L2.6,9 C2.6,9.3 2.5,9.6 2.5,10 C2.5,10.4 2.5,10.7 2.6,11 L0.5,12.7 C0.3,12.9 0.3,13.1 0.4,13.3 L2.4,16.8 C2.5,16.9 2.7,17 3,16.9 L5.5,15.9 C6,16.3 6.6,16.6 7.2,16.9 L7.6,19.5 C7.6,19.7 7.8,19.9 8.1,19.9 L12.1,19.9 C12.3,19.9 12.6,19.7 12.6,19.5 L13,16.9 C13.6,16.6 14.2,16.3 14.7,15.9 L17.2,16.9 C17.4,17 17.7,16.9 17.8,16.7 L19.8,13.2 C19.9,13 19.9,12.7 19.7,12.6 L17.4,11 L17.4,11 Z M10,13.5 C8.1,13.5 6.5,11.9 6.5,10 C6.5,8.1 8.1,6.5 10,6.5 C11.9,6.5 13.5,8.1 13.5,10 C13.5,11.9 11.9,13.5 10,13.5 L10,13.5 Z" id="Shape" /></g></g></g></svg>
        Settings
      </a>
      <a href="#" className="flex items-center rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900" onClick={handleSignOut}>
        <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke="#374151" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </svg>
        Sign out
      </a>
    </div>
  </div>
);


const DesktopMenu = ({ 
  dropdownOpen,
  setDropdownOpen,
  handleSignIn, 
  handleSignOut,
  user 
}) => {
  const handleDropdownToggle = () => {
    setDropdownOpen(prev => !prev);
  };

  return (
    <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
      {/* <a href="#" class="text-sm font-medium text-gray-900 hover:underline">Go Premium</a> */}
      {user ? (
        <>
          <a href="#" className="ml-5 flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2">
            <span className="sr-only">View notifications</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </a>
          <div className="relative ml-5 flex-shrink-0">
            <button
              type="button"
              className="flex rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              onClick={handleDropdownToggle}
            >
              <span className="sr-only">Open user menu</span>
              <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80" alt="User" />
            </button>
            <DesktopDropdownMenu 
	      open={dropdownOpen} 
	      setOpen={setDropdownOpen} 
	      user={user}
	      handleSignOut={handleSignOut}
	    />
          </div>
          <a href="#" className="ml-6 inline-flex items-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2">New Post</a>
          <a
            href="#"
            className="ml-5 flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
            onClick={handleSignOut}
            title="Logout"
          >
            <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8" stroke="#374151" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            </svg>
          </a>
        </>
      ) : (
        <>
          <a href="#" onClick={handleSignIn} className="ml-6 inline-flex items-center rounded-md border border-transparent bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2">Login</a>
        </>
      )}
    </div>
  );
};


export default function Header({ initialUser }) {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const user = useUserSession(initialUser);
  console.log(user);

  const handleSignOut = event => {
    event.preventDefault();
    signOut();
  };

  const handleSignIn = event => {
    event.preventDefault();
    signInWithGoogle();
  };

  return (
    <header className="bg-white shadow-sm lg:static lg:overflow-y-visible">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between lg:gap-8 xl:grid xl:grid-cols-12">
          <Logo />
          <SearchBar />
          <DesktopMenu
            dropdownOpen={dropdownOpen}
            setDropdownOpen={setDropdownOpen}
            handleSignIn={handleSignIn}
            handleSignOut={handleSignOut}
            user={user}
          />
          <MobileMenuButton open={open} setOpen={setOpen} />
        </div>
      </div>
      <MobileMenu 
	open={open}
	handleSignIn={handleSignIn}
	handleSignOut={handleSignOut}
	user={user}
      />
    </header>
  );
};
