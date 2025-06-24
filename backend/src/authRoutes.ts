import dotenv from 'dotenv';
dotenv.config();
const salt = process.env.salt;
console.log(salt)

import {createHash} from 'crypto';

import express from 'express';
type Request = express.Request;
type Response = express.Response;
import { Router } from 'express';
const authRouter = Router();

import User from '../models/userModel.ts';
import { create } from 'domain';

authRouter.get('/authorize', (req: Request, res: Response) => {
  res.json({ message: "here's is your token good man" });
});

authRouter.get('/authenticate', (req: Request, res: Response) => {
  res.json({ message: 'you are authenticated, welcome!' });
});

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
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default authRouter;