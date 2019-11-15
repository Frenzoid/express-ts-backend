import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import * as favicon from 'express-favicon';
import * as express_fileupload from 'express-fileupload';
import * as logger from 'morgan';
import * as path from 'path';
import * as passport from 'passport';

// Import configs.
import { DbConnector } from './config/dbcon';
import { fileuploadOptions } from './config/fileuploadOptions';
import { TokenManagement } from './utils/tokenManager';
import { whitelist } from './config/const';
import { ResponseModel as RM } from './config/response';
import { DefTagsData } from './defaultData/DbConnInsert';

// Imports the routers.
import userRouter from './routes/userRouter';

class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.middleware();
  }

  private async middleware(): Promise<any> {

    // Connect with the server
    DbConnector.connection.connect().then((result: any) => {
      if (result.isConnected) console.log('DB: Connection with database established!.');
      DbConnector.connection.synchronize(true).then(() => {
        DefTagsData();                                                        // Insert default data.
      }).catch((err: string) => {
        console.error(`but interaction with the db failed. Error: ${err}`);
      });                                                                     // Force tables to recreate (clear out) on load.
    }).catch((err: string) => {
      console.error(`Error syncing database: ${err}`);
    });

    // Initializating the libraries and the express config.
    this.app.use(cors());                                                     // Allows Control Acess Protol to work outside of a localhost.
    this.app.use(compression());                                              // Compresses the requests.
    this.app.use(logger('dev'));                                              // Logs the activity to the console.
    this.app.use(bodyParser.json({ limit: '100mb' }));                        // Parses automaticallythe requests, and adds a limit.
    this.app.use(bodyParser.urlencoded({ extended: false, limit: '100mb' })); // Manages the encoded urls, and adds a limit.
    this.app.use(express_fileupload(fileuploadOptions));                      // Manages the file uploads and adds a limit.
    this.app.use('/api/v1/static', express.static(path.join(__dirname, '/public'))); // Exposes a static folder to the exterior.
    this.app.use(favicon(`${__dirname}/public/coffe.png`));
    passport.use(TokenManagement.getStrategy());                              // Initializes and gets the JWT strategy.

    /*
    // DenyAll Policy: Denies access to protected paths, unless its on the "whiteList".
    this.app.use((req, res, next) => {
      const reply = new RM();
      passport.authenticate('jwt', (err, user, info) => {
        if ((err || !user) && !whitelist.find(url => req.url.startsWith(url))) {
          reply.addError('User unauthorized.');
          return res.status(401).end(JSON.stringify(reply));
        }
        next();
      })(req, res, next);
    });

    // token interceptor. Sends a renewed token on each petition if user is logged in.
    this.app.use(async (req, res, next) => {
      const reply = new RM();
      if (req.get('authorization')) {
        const newToken = await TokenManagement.renovarToken(
          req.get('authorization'),
        ).catch((err) => {
          reply.addError(err);
          res.status(401).json(reply);
          next();
        });
        res.setHeader('Authorization', newToken as string);
      }
      res.setHeader('access-control-expose-headers', 'Authorization');
      next();
    });*/

    // Routers
    this.app.use('/api/v1/users', userRouter);
  }
}

export default new App().app;
