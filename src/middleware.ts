import { NextRequest } from "next/server";
import jwksClient from "jwks-rsa";
import bcrypt from 'bcrypt'
import * as jose from 'jose'


export const Middlewares = async (req: NextRequest) => {

    const client = jwksClient({
        jwksUri: '/.well-known',
        cache: true,
        rateLimit: true
    })

    const getCookie = req.cookies.get('authorization')?.value

    const verifyCookie = await jose.jwtVerify(getCookie, client)


}

export const config = {
    matcher: ['/dashboard']
}