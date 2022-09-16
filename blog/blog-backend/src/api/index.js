import Router from 'koa-router';
import posts from './posts';
import auth from "./auth";
import post from "../models/post";

const api = new Router();

api.use('/auth', auth.routes());
api.use('/posts', posts.routes());

export default api;