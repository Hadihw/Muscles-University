'use client'

import { useEffect, useLayoutEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaBars } from 'react-icons/fa'
import { FaXmark } from 'react-icons/fa6'

const NavigationBar = () => {
    const [transformHeader, setTransformHeader] = useState(false)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        if (pathname !== '/') {
            setTransformHeader(true)
        }
    }, [pathname])

    const handleScroll = () => {
        const shouldTransform = window.scrollY > 75
        if (transformHeader !== shouldTransform) {
            setTransformHeader(shouldTransform)
        }
    }

    useLayoutEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [transformHeader])

    const Drawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
        useEffect(() => {
            if (isOpen) {
                document.body.style.overflow = 'hidden'
            } else {
                document.body.style.overflow = ''
            }
        }, [isOpen])

        return (
            <div className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-40 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out flex md:hidden`}>
                <div className="flex flex-col w-64 h-full bg-white overflow-y-auto">
                    <div className="flex justify-end p-2">
                        <FaXmark onClick={onClose} className="text-black cursor-pointer"/>
                    </div>
                    <div className="flex flex-col items-center">
                        <Link href="/" className="cursor-pointer font-axiom text-dark mb-2">Home</Link>
                        <Link href="/preauth/about" className="cursor-pointer font-axiom text-dark mb-2">About</Link>
                        <Link href="/preauth/faqs" className="cursor-pointer font-axiom text-dark mb-2">FAQs</Link>
                        <Link href="/preauth/contactus" className="cursor-pointer font-axiom text-dark mb-2">Contact Us</Link>
                        <Link href="/preauth/login" className="mx-5 my-2 px-4 py-2 font-axiom text-dark">Login</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <header className={`header-transition z-50 flex fixed justify-center md:justify-between items-center w-full top-0 ${transformHeader ? 'bg-white text-gray-800 shadow-lg py-2' : 'text-white py-4'}`}>
            <FaBars className={`absolute top-5 left-5 text-lg ${transformHeader ? 'text-black' : 'text-white'} lg:hidden`} onClick={() => setIsDrawerOpen(true)} />
            <Link href="/">
                <img src="/assets/images/logo(500x500).png" alt="Logo" className={`${transformHeader ? 'w-20 h-20' : 'w-28 h-28'} cursor-pointer mx-5`} />
            </Link>
            <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
            <nav className="hidden md:flex space-x-6">
                <Link href="/" className={`${transformHeader ? 'text-black border-transparent hover:opacity-80 hover:border-black' : 'text-white border-transparent hover:opacity-80 hover:border-light'} border-b-2 cursor-pointer font-axiom`}>Home</Link>
                <Link href="/preauth/about" className={`${transformHeader ? 'text-black border-transparent hover:opacity-80 hover:border-black' : 'text-white border-transparent hover:opacity-80 hover:border-light'} border-b-2 cursor-pointer font-axiom `}>About</Link>
                <Link href="/preauth/faqs" className={`${transformHeader ? 'text-black border-transparent hover:opacity-80 hover:border-black' : 'text-white border-transparent hover:opacity-80 hover:border-light'} border-b-2 cursor-pointer font-axiom `}>FAQs</Link>
                <Link href="/preauth/contactus" className={`${transformHeader ? 'text-black border-transparent hover:opacity-80 hover:border-black' : 'text-white border-transparent hover:opacity-80 hover:border-light'} border-b-2 cursor-pointer font-axiom `}>Contact Us</Link>
            </nav>
            <Link href="/preauth/login" className={`hidden btn-light mx-5 w-32 md:block ${transformHeader ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                Login
            </Link>
        </header>
    )
}

export default NavigationBar


