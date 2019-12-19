import errorHandler from "errorhandler";

import app from "./app";
import { init } from './socket';

/**
 * Error Handler.
 */
app.use(errorHandler());


const server = init(app);
server.listen(app.get("port"));
server.on('listening', () => {
    console.log('listening on port '+app.get("port"));
});

export default server;
