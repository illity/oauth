import dotenv from 'dotenv';
dotenv.config();
const salt = process.env.salt;
const jwtSecret = process.env.jwtSecret as string;
console.log(salt)

import {createHash, createHmac} from 'crypto';

import express from 'express';
type Request = express.Request;
type Response = express.Response;
import { Router } from 'express';
const authRouter = Router();

import User from './models/userModel';

authRouter.get('/authorize', (req: Request, res: Response) => {
  res.json({ message: "here's is your token good man" });
});

const verifyPassword = (username: string, password: string) => {
  return User.findOne({username}).then(user => {
    const hashedPassword = user?.password;
    return HashedPassword(username + password) === hashedPassword;
  });
}

const base64UrlEncode = (str: string) => 
(btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
)
const base64UrlDecode = (str: string) => 
(atob(
    str.replace(/\-/g, '+')
    .replace(/_/g, '/')
))

const generateJWT = (sub: string) => {
  const header = {
    "alg": "HS256",
    "typ": "JWT"
  };
  const payload = {
    "sub": sub,
    "iss": "me, I swear",
    "iat": Date.now(),
    "exp": Date.now() + 20 * 60 * 1000 // "all that pain for 20 minutes" Noximilian
  };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const message = encodedHeader + '.' + encodedPayload
  const signature = createHmac('sha256', jwtSecret)
              .update(message)
              .digest('base64')
              .replace(/\+/g, '-')
              .replace(/\//g, '_')
              .replace(/=+$/, '');
  return message + '.' + signature;
}

const verifyJWT = (jwt: string) => {
  const match = jwt.match(/(.*)\.(.*)\.(.*)/);
  if (!match) return null;
  const [_, encodedHeader, encodedPayload, signature] = match;
  const message = encodedHeader + '.' + encodedPayload;
  const correctSignature = createHmac('sha256', jwtSecret)
              .update(message)
              .digest('base64')
              .replace(/\+/g, '-')
              .replace(/\//g, '_')
              .replace(/=+$/, '');
  if (signature !== correctSignature) return null;
  return JSON.parse(base64UrlDecode(encodedPayload));
}

authRouter.post('/authenticate', (req: Request, res: Response) => {
  const username = req.headers.username as string;
  const password = req.headers.password as string;

  verifyPassword(username, password).then( isPasswordCorrect => {
    if (isPasswordCorrect)
      return res.status(200).json({ jwt: generateJWT(username)})
      return res.status(401).json({ message: "you shall not pass"});
  });
});

authRouter.post('/verifyJwt', (req: Request, res: Response) => {
  const jwt = req.headers.jwt as string;
  res.status(200).json(verifyJWT(jwt));
})

const HashedPassword = (password: string) => {
  const hash = createHash('sha256');
  hash.update(salt + password);
  return hash.digest('hex');
}

authRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    const hashedPassword = HashedPassword(username+password);
    const user = new User({ username, password: hashedPassword, email });
    await user.save();
    res.status(201).json({ message: 'User created', user });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default authRouter;