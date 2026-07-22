import express, { type Express, type Request, type Response } from 'express';
import authRoutes from './src/routes/auth.routes';
import { errorHandler } from './src/middlewares/error.middleware';
const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Worldkk');
});

app.use('/auth', authRoutes);
app.use(errorHandler);
app.listen(3000);


// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });