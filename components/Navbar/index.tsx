"use client"
import { useEffect, useRef } from "react";

// Styles
import "./Style.scss";

const Navbar = () => {
    const navRef = useRef<HTMLElement>(null);
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const { classList } = navRef.current ?? {};
            if (scrollTop > 70) {
                classList?.add("sticky");
            } else {
                classList?.remove("sticky");
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {

            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav ref={navRef} className="navbar-container">Navbar</nav>
    )
}

export default Navbar