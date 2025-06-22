import { OkPacket } from "mysql";
import { execute } from "../services/mysql.connector";
import { Album } from "./albums.model";
import { albumQueries } from "./albums.queries";

// CREATE
export const createAlbum = async (album: Album) => {
    return execute<OkPacket>(
        albumQueries.createAlbum,
        [album.title, album.artist, album.description, album.year, album.image]
    );
};

// READ
export const readAlbums = async () => {
    return execute<Album[]>(
        albumQueries.readAlbums,
        []
    );
};

export const readAlbumsByArtist = async (artist: string) => {
    return execute<Album[]>(
        albumQueries.readAlbumsByArtist,
        [artist]
    );
};

export const readAlbumsByArtistSearch = async (search: string) => {
    return execute<Album[]>(
        albumQueries.readAlbumsByArtistSearch,
        ['%' + search + '%']
    );
};

export const readAlbumsByDescriptionSearch = async (search: string) => {
    return execute<Album[]>(
        albumQueries.readAlbumsByDescriptionSearch,
        ['%' + search + '%']
    );
};

export const readAlbumsByAlbumID = async (id: number) => {
    return execute<Album[]>(
        albumQueries.readAlbumsByAlbumID,
        [id]
    );
};

// UPDATE
export const updateAlbum = async (album: Album) => {
    return execute<OkPacket>(
        albumQueries.updateAlbum,
        [album.title, album.artist, album.description, album.year, album.image, album.albumID]
    );
};

// DELETE
export const deleteAlbum = async (albumID: number) => {
    return execute<OkPacket>(
        albumQueries.deleteAlbum,
        [albumID]
    );
};
