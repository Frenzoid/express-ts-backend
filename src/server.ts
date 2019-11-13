import * as dotenv from 'dotenv';
dotenv.config({ path: 'env' });

import app from './app';
export const expressServer = app.listen(process.env.PORT);