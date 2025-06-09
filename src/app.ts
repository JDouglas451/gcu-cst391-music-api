import dotenv from 'dotenv';
import express, { Request, Response } from 'express';

// import custom routers
import albumsRouter from './albums/albums.routes';
import artistsRouter from './artists/artists.routes';

// initialize environment
dotenv.config();
const PORT = process.env.PORT;

// initialize express server
const app = express();

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
