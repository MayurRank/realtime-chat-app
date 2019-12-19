import { Request, Response, NextFunction, Router } from "express";
const router = Router();
export default router;
import { users } from '../../data/users';
const getUsers = (req: Request, res: Response) => {
  return res.send(users);
};

router.get('/getUsers', getUsers)