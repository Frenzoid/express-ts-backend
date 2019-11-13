import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import * as favicon from 'express-favicon';
import * as express_fileupload from 'express-fileupload';
import * as logger from 'morgan';
import * as path from 'path';
import { DbConnector } from './config/dbcon';
import userRouter from './routes/userRouter';
class App {
    constructor() {
        this.async = middleware();
        this.app = express();
        this.middleware();
    }
    Promise() {
        // Connect with the server
        DbConnector.connection.connect().then((result) => {
            DbConnector.connection.synchronize(true); // Force tables to recreate (whipe out) on load.
            console.log("DB connectionected.");
        }).catch((err) => {
            console.error(`Error syncing database: ${err}`);
        });
        // initializating the libraries and the express config.
        this.app.use(cors()); // Allows Control Acess Protol to work outside of a localhost.
        this.app.use(compression()); // Compresses the requests.
        this.app.use(logger('dev')); // Logs the activity to the console. (It can be configured to write it to a file).
        this.app.use(bodyParser.json({ limit: '100mb' })); // Parses automaticallythe requests, and adds a limit.
        this.app.use(bodyParser.urlencoded({ extended: false, limit: '100mb' })); // Manages the encoded urls, and adds a limit.
        this.app.use(express_fileupload({
            debug: true,
            abortOnLimit: true,
            preserveExtension: true,
            useTempFiles: true,
            tempFileDir: './tmp/'
        })); // Manages the file uploads and adds a limit.
        this.app.use('/api/v1/static', express.static(path.join(__dirname, '/public'))); // Exposes a static folder to the exterior.
        this.app.use(favicon(`${__dirname}/public/coffe.png`));
        // Routers
        this.app.use('/api/v1/users', userRouter);
    }
}
export default new App().app;
//# sourceMappingURL=app.js.map