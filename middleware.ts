import { NextRequest, NextResponse } from 'next/server';
import { isTokenValid } from './lib/token';


export const middleware = async (req: NextRequest, res: NextResponse) => {
    const { value } = req.cookies.get("token") || {};
    const protectedPaths = ["/cart", "/product", "/productListing", "/brand", "/category", "/brandListing", "/categoryListing"];
    if (!value) {
        if (req.nextUrl.pathname === "/" || protectedPaths.some(path => req.nextUrl.pathname.includes(path))) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
        return NextResponse.next();
    }

    if (value && (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/register")) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    if (!isTokenValid(value) && req.nextUrl.pathname !== "/login" && req.nextUrl.pathname !== "/register") {
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.delete("token");
        return response;
    }


    const response = NextResponse.next();
    response.headers.set("Authorization", `Bearer ${value}`);

    return response;
}

export const config = {
    matcher: ["/((?!_next).*)"],
};