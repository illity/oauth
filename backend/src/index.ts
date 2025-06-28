import express from 'express';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/oauth', {}).then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});



const app = express();
type Request = express.Request;
type Response = express.Response;
import { Router } from 'express';
import authRouter from './authRoutes'; 
const route = Router()

app.use(express.json())

route.get('/health', (req: Request, res: Response) => {
  res.json({ message: 'everything is fine (got my shinigami eyes on)' })
})

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'that\'s a 200 :D' })
})

app.use(route)
app.use(authRouter)


app.listen(3333, () => {
  console.log('server running on port 3333')
})
