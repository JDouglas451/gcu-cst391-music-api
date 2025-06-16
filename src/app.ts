import { NODE_ENV, PORT } from './config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// import middleware
import logger from './middleware/logger.middleware';

// import custom routers
import albumsRouter from './albums/albums.routes';
import artistsRouter from './artists/artists.routes';

// initialize express server
const app = express();

// enable Cross-Origin Resource Sharing (CORS) middleware
app.use(cors());

// enable security HTML header middleware
app.use(helmet());

// add development (logging) middleware
if (NODE_ENV == 'development') {
    app.use(logger);
    console.log('WARNING: Express server is running in development mode!');
};

// json body parsing middleware
app.use(express.json());

// URL encoded body parsing middleware
app.use(express.urlencoded({ extended: true }));

// register custom routers
app.use('/', [
    albumsRouter,
    artistsRouter
]);

// start the app
app.listen(PORT, () => {
    // log express server start
    console.log(`Example app listening at http://localhost:${PORT}`);
});
