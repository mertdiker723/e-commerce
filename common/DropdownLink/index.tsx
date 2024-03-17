import React, { useEffect, useRef } from "react";
import Link from "next/link";

// Styles
import "./Style.scss";

type DropdownLinkTypes = {
    buttonText: string;
    buttonClassName?: string;
    dropdownItems: {
        href: string;
        text: string;
        className: string;
    }[]
}
const DropdownLink = ({ buttonText, buttonClassName, dropdownItems }: DropdownLinkTypes) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (!dropdownRef.current?.contains(e.target as Node)) {
                dropdownRef.current?.classList.remove("show");
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const handleOnNavbar = () => {
        dropdownRef.current?.classList.toggle("show");
    };

    return (
        <div className="dropdown-container">
            <button onClick={handleOnNavbar} className={buttonClassName}>
                {buttonText}
            </button>

            <div ref={dropdownRef} className="dropdown-content">
                {dropdownItems.map((item, index) => (
                    <Link key={index} className={item.className} href={item.href} onClick={handleOnNavbar}>{item.text}</Link>
                ))}
            </div>

        </div>
    );
};

export default DropdownLink;