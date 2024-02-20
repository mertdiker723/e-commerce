"use client"
import { useEffect, useRef } from "react";

// Next
import Image from "next/image";
// Styles
import "./Style.scss";
import Hamburger from "../../assets/icons/Hamburger/index.svg"
import Link from "next/link";

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
        <nav ref={navRef} className="navbar-container">
            <div>
                <Image
                    src="https://www.pngfind.com/pngs/m/29-290389_e-commerce-website-logo-png-download-e-commerce.png"
                    width={70}
                    height={70}
                    alt="picture"
                />
            </div>
            <div className="contents-web">
                <div className="link-container">
                    <div className="link"><Link href="/">Home</Link></div>
                    <div className="link"><Link href="/brand">Brand</Link></div>
                    <div className="link"><Link href="/category">Category</Link></div>
                    <div className="link"><Link href="/product">Product</Link></div>
                    <div className="link"><Link href="/login">Login</Link></div>
                </div>
            </div>
            <div className="contents-mobile">
                <Image
                    src={Hamburger}
                    width={30}
                    height={30}
                    alt="picture"
                    className="hamburger-menu"
                />
            </div>
        </nav>
    )
}

export default Navbar