import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose'
import * as fs from 'fs';
import * as path from 'path';
import { cookies } from 'next/headers'
import crypto from 'crypto'
import bcrypt from 'bcrypt'



export const GET = async (req: NextRequest) => {
    try {
        return NextResponse.json({
            message: 'To login enter id, email and password'
        })
    } catch (error) {

    }
}

export const POST = async (req: NextRequest) => {
    let { id, email, password } = await req.json()
    try {
        if (id && email && password) {

            const filename = 'private.pem'
            const filePath = path.resolve('./src/certs', filename)
            const privateKeyBuffer = fs.readFileSync(filePath)
            const plainPrivateKey = crypto.createPrivateKey(privateKeyBuffer)

            id = await bcrypt.hash(id, 12)
            const token = await new jose.SignJWT({ id })
                .setProtectedHeader({ alg: 'RS256' })
                .setIssuedAt()
                .setExpirationTime('1m')
                .sign(plainPrivateKey)



            cookies().set('authorization', token, {
                maxAge: 10 * 1000
            })

            return NextResponse.json({
                mesage: 'You are logged in'
            })
        }
    } catch (error) {
        console.log((error as { message: string }).message)
        return NextResponse.json({
            error: (error as { message: string }).message
        })
    }

}
