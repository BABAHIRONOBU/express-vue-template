import 'dotenv/config';
import config from 'config';

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import logger from 'morgan';
import history from 'connect-history-api-fallback';
import cors from 'cors';

import mongoose from 'mongoose';

import indexRouter from './routes/index';
import apiRouter from './routes/api';

const app = express();

// NoSQL 사용을 기본으로 전제
mongoose.connect(config.get('mongoDB.url'), config.get('mongoDB.options'));

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('Connected to mongod server');
});

app.use(cors({ origin: 'http://localhost:8080' })); // 개발 시 CORS 문제 해결용
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(config.get('session'))); // 세션 사용하지 않는다면 쓸 필요 없음

app.use('/', indexRouter);
app.use('/api', apiRouter);

app.use(history());
app.use(express.static(path.join(__dirname, '../public')));

export default app;
