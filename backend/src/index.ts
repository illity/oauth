import express from 'express';

const app = express();
type Request = express.Request;
type Response = express.Response;
import { Router } from 'express';
const route = Router()

app.use(express.json())

route.get('/health', (req: Request, res: Response) => {
  res.json({ message: 'everything is fine (got my shinigami eyes on)' })
})

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'that\'s a 200 :D' })
})

app.use(route)


app.listen(3333, () => 'server running on port 3333')
