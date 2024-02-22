"use client"
import { useEffect, useRef } from "react";

// Next
import Image from "next/image";
// Styles
import "./Style.scss";
import Hamburger from "../../assets/icons/Hamburger/index.svg"
import Link from "next/link";
import DropdownLink from "../DropdownLink";

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

    const dropdownCategoryItems = [
        { href: "/category", text: "Category", className: "" },
        { href: "/categoryListing", text: "Category List", className: "mt-2" }
    ];

    const dropdownBrandItems = [
        { href: "/brand", text: "Brand", className: "" },
        { href: "/brandListing", text: "Brand List", className: "mt-2" }
    ];

    const dropdownProductItems = [
        { href: "/product", text: "Product", className: "" },
        { href: "/productListing", text: "Product List", className: "mt-2" }
    ];

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
                    <div className="link">
                        <DropdownLink
                            buttonText="Brand"
                            dropdownItems={dropdownBrandItems}
                        />
                    </div>
                    <div className="link">
                        <DropdownLink
                            buttonText="Category"
                            dropdownItems={dropdownCategoryItems}
                        />
                    </div>
                    <div className="link">
                        <DropdownLink
                            buttonText="Product"
                            dropdownItems={dropdownProductItems}
                        />
                    </div>
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