"use client"

import { useEffect, useState } from "react";

// Styles
import "./Style.scss";

const Navbar = () => {
    const [isSticky, setIsSticky] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 70) {
                setIsSticky(true);
                return;
            }
            setIsSticky(false);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`navbar-container ${isSticky ? ' sticky' : ''}`}>Navbar</nav>
    )
}

export default Navbar