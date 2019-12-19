import session from "express-session";
import mongo from "connect-mongo";
import { MONGODB_URI, SESSION_SECRET } from './secrets';
const MongoStore = mongo(session);
const mongoUrl: any = MONGODB_URI;

/**
 * Initialize Session
 * Uses MongoDB-based session store
 *
 */
var init = function () {
	if(process.env.NODE_ENV === 'production') {
		return session({
			secret: SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			unset: 'destroy',
			store: new MongoStore({ url: mongoUrl, autoReconnect: true })
		});
	} else {
		return session({
			secret: SESSION_SECRET,
			resave: false,
			unset: 'destroy',
			saveUninitialized: true
		});
	}
}

export default init();