"use client"

import Link from 'next/link'
import style from './sideBar.module.css'
import GithubLoginMenuItem from '../github-login/GithubLoginMenuItem'
import { useRef } from 'react'

const SideBar = () => {
    const sidebarRoutes = [
        { name: 'Home', route: '/' },
        { name: 'Login', route: '/login' },
        { name: 'Workboard', route: '/workboard' },
        { name: 'About', route: '/about' },
    ]

    const sideBar = useRef<HTMLElement | null>(null)

    function showHideSideBar() {
        if (!sideBar.current)
            return
        
        if (sideBar.current.classList.contains(style.show)) {
            window.removeEventListener('click', outsideClicksListener, true)
            sideBar.current.classList.remove(style.show)
        }
        else {
            window.addEventListener('click', outsideClicksListener, true)
            sideBar.current.classList.add(style.show)
        }
    }

    function outsideClicksListener(event: MouseEvent) {
        if (!event.target || !(event.target instanceof Node))
            return
        
        if (event.target !== sideBar.current && !sideBar.current?.contains(event.target)) {
            sideBar.current?.classList.remove(style.show)
            window.removeEventListener('click', outsideClicksListener, true)
        }
    }


    return (
        <nav className={style.sideBar} ref={sideBar}>
            <div className={style.burguer} onClick={showHideSideBar}>
                <svg strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#FFFFFF">
                    <path d="M3 5h18M3 12h18M3 19h18" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </div>
            <menu>
                {sidebarRoutes.map(r =>
                    <li key={r.route}>
                        <Link href={r.route} onClick={showHideSideBar}>{r.name}</Link>
                    </li>
                )}
            </menu>
        </nav>
    )
}

export default SideBar