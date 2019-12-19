import { Request, Response, NextFunction } from "express";
import SocketIO from 'socket.io';
import ResponseHelper from './response.helper';
import MakeRequest from './request.helper';
import { verifyToken } from "./jwt-token.helper";
import _ from 'lodash';

const getUser = (token: any) => {
  return MakeRequest(token).get('http://api-liber.cohora.com/v1/user')
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  let token = null;
  if (req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
      token = req.headers.authorization.split(" ")[1];
  }
  if (token) {
    try {
      const data = verifyToken(token);
      getUser(token).then((response) => {
        if (response && response.data && response.data.activated) {
          next();
        } else {
          ResponseHelper(res, 403, false, "Your account has been deactivated");
        }
      }).catch((error) => {
        ResponseHelper(res, 401, false, "Unauthorized");
      });
    } catch(err) {
      ResponseHelper(res, 401, false, "Unauthorized");
    }
  } else ResponseHelper(res, 401, false, "Unauthorized");
};

export const isIoAuthenticated = (socket: SocketIO.Socket | any, next: any) => {
  let token = null;
  if (socket.handshake.query.authorization && socket.handshake.query.authorization.split(' ')[0] === 'Bearer') {
      token = socket.handshake.query.authorization.split(' ')[1];
  }
  // decode token
  if (token) {
    try {
      const data = verifyToken(token);
      getUser(token).then((response) => {
        if (response && response.data && response.data.result) {
          socket.x_user = _.pick(response.data.result, ['_id', 'first_name', 'last_name', 'followers', 'following']);
          next(null);
        } else {
          next("Your account has been deactivated");
        }
      }).catch((error) => {
        next("Unauthorized");
      });
    } catch(err) {
      next("Unauthorized");
    }
  } else {
    next("Unauthorized");
  }
}