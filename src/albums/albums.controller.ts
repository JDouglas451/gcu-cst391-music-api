import { Request, RequestHandler, Response } from 'express';
import * as AlbumDAO from './albums.dao';
import * as TrackDAO from '../tracks/tracks.dao';
import { OkPacket } from 'mysql';
import { Album } from './albums.model';
import { Track } from '../tracks/tracks.model';

async function readTracks(albums: Album[], res: Response<any, Record<string, any>>) {
    for (let i = 0; i < albums.length; i++) {
        try {
            // read album's tracks
            const tracks = await TrackDAO.readTracks(albums[i].albumID);

            // add tracks to Album object
            albums[i].tracks = tracks;
        } catch (err) {
            console.error('[albums.controller][readTracks][Error] ', err);

            // send 500 response (Internal Server Error)
            res.status(500).json({
                message: 'There was an error when writing album tracks'
            });
        }
    }
}

// CREATE

export const createAlbum: RequestHandler = async (req: Request, res: Response) => {
    try {
        // create album
        const okPacket: OkPacket = await AlbumDAO.createAlbum(req.body);

        console.log('req.body', req.body);
        console.log('album', okPacket);

        // create album tracks
        req.body.tracks.foreach(async (track: Track, index: number) => {
            try {
                await TrackDAO.createTrack(track, index, okPacket.insertId);
            } catch (err) {
                console.error('[albums.controller][createAlbum][Error] ', err);

                // send 500 response (Internal Server Error)
                res.status(500).json({
                    message: 'There was an error when writing album tracks'
                });
            }
        });

        // send OK packet in 200 response (OK)
        res.status(200).json(okPacket);
    } catch (err) {
        console.error('[albums.controller][createAlbum][Error] ', err);

        // send 500 response (Internal Server Error)
        res.status(500).json({
            message: 'There was an error when writing albums'
        });
    }
};

// READ

export const readAlbums: RequestHandler = async (req: Request, res: Response) => {
    try {
        let albums;
        let albumID = parseInt(req.query.albumID as string);

        console.log('albumID', albumID);

        // read all albums or search by ID
        if (Number.isNaN(albumID)) {
            albums = await AlbumDAO.readAlbums();
        } else {
            albums = await AlbumDAO.readAlbumsByAlbumID(albumID);
        }

        // read and add tracks to each Album object
        await readTracks(albums, res);

        // send albums in 200 response (OK)
        res.status(200).json(albums);
    } catch (err) {
        console.error('[albums.controller][readAlbums][Error] ', err);

        // send 500 response (internal server error)
        res.status(500).json({
            message: 'There was an error when fetching albums'
        });
    }
};

export const readAlbumsByArtist: RequestHandler = async (req: Request, res: Response) => {
    try {
        // read albums by exact artist
        const albums = await AlbumDAO.readAlbumsByArtist(req.params.artist);
        
        // read and add tracks to each Album object
        await readTracks(albums, res);

        // send albums in 200 response (OK)
        res.status(200).json(albums);
    } catch (err) {
        console.error('[albums.controller][readAlbumsByArtist][Error] ', err);

        // send 500 response (internal server error)
        res.status(500).json({
            message: 'There was an error when fetching albums'
        });
    }
};

export const readAlbumsByArtistSearch: RequestHandler = async (req: Request, res: Response) => {
    try {
        const search = req.params.search as string;
        console.log('search ', search);

        // read albums by partial artist
        const albums = await AlbumDAO.readAlbumsByArtistSearch(search);

        // read and add tracks to each Album object
        await readTracks(albums, res);

        // send albums in 200 response (OK)
        res.status(200).json(albums);
    } catch (err) {
        console.error('[albums.controller][readAlbumsByArtistSearch][Error] ', err);

        // send 500 response (internal server error)
        res.status(500).json({
            message: 'There was an error when fetching albums'
        });
    }
};

export const readAlbumsByDescriptionSearch: RequestHandler = async (req: Request, res: Response) => {
    try {
        const search = req.params.search as string;
        console.log('search ', search);

        // read albums by partial description
        const albums = await AlbumDAO.readAlbumsByDescriptionSearch(search);

        // read and add tracks to each Album object
        await readTracks(albums, res);

        // send albums in 200 response (OK)
        res.status(200).json(albums);
    } catch (err) {
        console.error('[albums.controller][readAlbumsByDescriptionSearch][Error] ', err);

        // send 500 response (internal server error)
        res.status(500).json({
            message: 'There was an error when fetching albums'
        });
    }
};

// UPDATE

export const updateAlbum: RequestHandler = async (req: Request, res: Response) => {
    try {
        // update album
        const okPacket: OkPacket = await AlbumDAO.updateAlbum(req.body);

        console.log('req.body', req.body);
        console.log('album', okPacket);

        // update album tracks
        req.body.tracks.foreach(async (track: Track, index: number) => {
            try {
                await TrackDAO.updateTrack(track);
            } catch (err) {
                console.error('[albums.controller][updateAlbum][Error] ', err);

                // send 500 response (internal server error)
                res.status(500).json({
                    message: 'There was an error when updating album tracks'
                });
            }
        });

        // send OK packet in 200 response (OK)
        res.status(200).json(okPacket);
    } catch (err) {
        console.error('[albums.controller][updateAlbum][Error] ', err);

        // send 500 response (internal server error)
        res.status(500).json({
            message: 'There was an error when updating albums'
        });
    }
};

// DELETE

export const deleteAlbum: RequestHandler = async (req: Request, res: Response) => {
    try {
        const albumID = parseInt(req.params.albumID as string);

        console.log('albumID', albumID);

        // check for valid ID
        if (Number.isNaN(albumID)) {
            throw new Error('Integer expected for albumID');
        }

        // delete album
        const response = await AlbumDAO.deleteAlbum(albumID);

        // send OK packet in 200 response (OK)
        res.status(200).json(response);
    } catch (err) {
        console.error('[albums.controller][deleteAlbum][Error] ', err);

        // send 500 response (internal server error)
        res.status(500).json({
            message: 'There was an error when deleting albums'
        });
    }
};
