import { DB_NAME } from "../config";

export const albumQueries = {
    // CREATE
    createAlbum: `
    INSERT INTO ${DB_NAME}.albums (
        title, artist, description, year, image
    )
    VALUES (
        ?, ?, ?, ?, ?
    )
    `,

    // READ
    readAlbums: `
    SELECT
        id AS albumID,
        title,
        artist,
        description,
        year,
        image
    FROM ${DB_NAME}.albums;
    `,
    readAlbumsByArtist: `
    SELECT
        id AS albumID,
        title,
        artist,
        description,
        year,
        image
    FROM ${DB_NAME}.albums
    WHERE ${DB_NAME}.albums.artist = ?
    `,
    readAlbumsByArtistSearch: `
    SELECT
        id AS albumID,
        title,
        artist,
        description,
        year,
        image
    FROM ${DB_NAME}.albums
    WHERE ${DB_NAME}.albums.artist LIKE ?
    `,
    readAlbumsByDescriptionSearch: `
    SELECT
        id AS albumID,
        title,
        artist,
        description,
        year,
        image
    FROM ${DB_NAME}.albums
    WHERE ${DB_NAME}.albums.description LIKE ?
    `,
    readAlbumsByAlbumID: `
    SELECT
        id AS albumID,
        title,
        artist,
        description,
        year,
        image
    FROM ${DB_NAME}.albums
    WHERE ${DB_NAME}.albums.id = ?
    `,

    // UPDATE
    updateAlbum: `
    UPDATE ${DB_NAME}.albums
    SET title = ?, artist = ?, description = ?, year = ?, image = ?
    WHERE ${DB_NAME}.albums.id = ?
    `,

    // DELETE
    deleteAlbum: `
    DELETE FROM ${DB_NAME}.albums
    WHERE ${DB_NAME}.albums.id = ?
    `,
};
