import express from 'express';
import cors from 'cors';
import { UserRouter } from './users/userRouter';
import { PostRouter } from './posts/postRouter';

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('원티드 프리온보딩 백엔드 프로젝트');
});

app.use(UserRouter);
app.use(PostRouter);

export { app };
