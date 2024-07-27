"use client"
import { useRouter, useParams } from 'next/navigation';

export default function UserDetails() {
  const router = useParams();
  console.log(router)
  return <p>Post: {router.id}</p>
}

// https://tailwindcomponents.com/component/tailwind-css-alpinejs-profile-page
