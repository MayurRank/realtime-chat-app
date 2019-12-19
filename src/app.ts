import express from "express";
import compression from "compression";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { MONGODB_URI } from './util/secrets';
// import session from "./util/session";
import logger from 'morgan';
import cors from "cors";

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl: any = MONGODB_URI;
mongoose.Promise = global.Promise;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true } ).then(
  () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ console.log("MongoDB Connected") },
).catch((err: any) => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  if(err) throw err;
  // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session);
app.use(cors());
app.use(logger('dev'))

import userController from './modules/user/user.routes';
import messageController from './modules/message/message.routes';
import { isAuthenticated } from "./util/auth.helper";
app.use("/users", userController);
app.use("/messages", isAuthenticated, messageController);

app.get('/', (req, res) => res.send('Chat server is running on 3000'))

export default app;
