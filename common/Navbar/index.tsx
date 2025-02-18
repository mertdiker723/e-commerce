"use client"
import { useEffect, useRef, useState } from "react";
import { usePathname } from 'next/navigation'
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from 'next/navigation'

// Next
import Image from "next/image";

// Components
import DropdownLink from "../DropdownLink";

// Models
import ProductType from "@/models/product";
// Styles
import "./Style.scss";
import axios from "axios";

type RootState = {
    cartReducer: {
        cart: (ProductType & { itemCount: number })[];
    };
};
const Navbar = () => {
    const navRef = useRef<HTMLElement>(null);
    const route = useRouter();
    const dispatch = useDispatch();
    const params = usePathname();
    const { cart } = useSelector((state: RootState) => state.cartReducer);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [userItemId, setItemId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTotalItems(cart.reduce((total, item) => total + item.itemCount, 0));
    }, [cart])
    const isHiddenRoute = (params: string | undefined): boolean => {
        const hiddenRoutes = ["login", "register", "forgot-password"];
        const firstParam = params?.split("/")[1];
        return firstParam ? hiddenRoutes.includes(firstParam) : false;
    };
    useEffect(() => {
        if (isHiddenRoute(params)) return;
        axios.get("/api/users").then((res) => {
            setItemId(res?.data?.user?.userId)
        }).catch((err) => { }).finally(() => {
            setLoading(false)
        })
    }, [params])

    const handleLogout = () => {
        axios.get('/api/users/logout').then((res) => {
            if (res.status === 200) {
                route.push("/login");
            }
        }).catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err.response.data);
        })
    }

    useEffect(() => {
        if (isHiddenRoute(params)) return;
        axios.get("/api/cart").then((res) => {
            const data = res?.data as { product: ProductType, itemCount: number }[];
            dispatch({
                type: 'CART_GET_ALL', payload: data.map(({ product, itemCount }) => ({ ...product, itemCount }))

            });
        })
    }, [dispatch, params])

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

    const loginLogoutButton = () => {
        if (loading) return <button>Loading...</button>
        if (userItemId) return <button onClick={handleLogout}>Logout</button>
        return <Link href="/login">Login</Link>
    }
    if (isHiddenRoute(params)) return;
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
                    <div className="link">
                        <Link href="/cart">
                            <div className="flex">
                                <Image
                                    src="/assets/images/cart/cart-icon.svg"
                                    width={20}
                                    height={20}
                                    alt="picture"
                                />
                                ({totalItems > 0 ? <span>{totalItems}</span> : 0})
                            </div>
                        </Link>
                    </div>
                    <div className="link">
                        {loginLogoutButton()}
                    </div>
                </div>
            </div>
            <div className="contents-mobile">
                <Image
                    src="/assets/icons/Hamburger/index.svg"
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