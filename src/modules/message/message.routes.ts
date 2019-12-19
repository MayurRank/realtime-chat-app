import { Request, Response, NextFunction, Router } from "express";
const router = Router();
export default router;

import { fetchMessages } from './message.controller';

router.get('/getMessages', fetchMessages)