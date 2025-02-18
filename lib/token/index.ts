import jwt from "jsonwebtoken";

import { jwtDecode } from "jwt-decode";


export const tokenCreation = (id: string, email: string, password: string) => {
    const token = jwt.sign(
        { userId: id, email, password },
        process.env.NEXT_PUBLIC_JWT_SECRET as string,
        { expiresIn: '1h' }
    );
    return token;
}



export const isTokenValid = (token: string): boolean => {
    try {
        const decoded: { exp?: number } = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (!decoded || !decoded.exp) {
            return false;
        }

        return decoded.exp > currentTime;
    } catch (error) {
        return false;
    }
};

export const isTokenValidJwt = (token: string): boolean => {
    try {
        // Token'ı doğrulama işlemi
        jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string);
        return true;
    } catch (error) {
        // Token geçersizse veya doğrulama başarısız olursa false döner
        return false;
    }
};
