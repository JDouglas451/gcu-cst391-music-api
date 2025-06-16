import { Request, RequestHandler, Response } from 'express';
import * as ArtistDAO from './artists.dao';

export const readArtists: RequestHandler = async (req: Request, res: Response) => {
    try {
        // read artists
        const artists = await ArtistDAO.readArtists();

        // send artists in 200 response (OK)
        res.status(200).json(artists);
    } catch (err) {
        console.error('[artists.controller][readArtists][Error] ', err);

        // send 500 response (Internal Server Error)
        res.status(500).json({
            message: 'There was an error when fetching artists'
        });
    }
};
