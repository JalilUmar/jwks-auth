import fs from 'fs'
import rsaPemToJWK from 'rsa-pem-to-jwk'
import crypto from 'crypto'

const privateKeyBuffer = fs.readFileSync('./src/certs/private.pem')
const privatekey = crypto.createPrivateKey(privateKeyBuffer)
console.log(privatekey)

const privateKeyMaterial = privatekey.export({
    format: 'pem',
    type: 'pkcs1'
})
const jwk = rsaPemToJWK(privateKeyMaterial, { use: 'sig' }, 'public')

console.log(jwk)
