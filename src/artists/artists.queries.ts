import { DB_NAME } from "../config";

export const artistQueries = {
    // READ
    readArtists: `
    SELECT DISTINCT
        artist
    FROM ${DB_NAME}.albums;
    `,
};
