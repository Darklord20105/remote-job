"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MENU_ITEMS = [
    { name: 'Home', href: '/' },
    { name: 'Login', href: '/login' },
    { name: "Register", href: '/register' },
    { name: 'User Account', href: '/user' },
]

function MenuItem({ name, href }) {
    const currentPath = usePathname();
    return (
        <li>
            <Link
                className={currentPath === href ? 'border-b text-black' : 'text-red hover:border-b'}
                href={href}
            >
                {name}
            </Link>
        </li>
    )
}

function Menu({ className }) {
    return (
        <ul className={className}>
            {MENU_ITEMS.map((link) => (
                <MenuItem key={link.name} href={link.href} name={link.name} />
            ))}
        </ul>
    )
}

export default Menu

