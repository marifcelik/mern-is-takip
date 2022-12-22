import * as dotenv from 'dotenv';
import { resolve as pathResolve } from 'path';

dotenv.config({ path: pathResolve(new URL(import.meta.url).hostname, `${process.env.NODE_ENV}.env`), debug: true });

const PORT = process.env.PORT || 3005,
    HOST = process.env.HOST || 'localhost',
    DB_CONN_STR = process.env.DB_CONN_STR || 'mongodb://127.0.0.1:27017/is-takip',
    JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'jwtdev'

export { PORT, HOST, DB_CONN_STR, JWT_SECRET_KEY }
