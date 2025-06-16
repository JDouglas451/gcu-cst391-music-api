import { DB_NAME } from "../config";

export const trackQueries = {
    // CREATE
    createTrack: `
    INSERT INTO tracks (
        album_id, title, number, video_url
    )
    VALUES (
        ?, ?, ?, ?
    );
    `,

    // READ
    readTracks: `
    SELECT
        title,
        video_url as video,
        lyrics
    FROM ${DB_NAME}.tracks
    WHERE album_id = ?;
    `,

    // UPDATE
    updateTrack: `
    UPDATE ${DB_NAME}.tracks
    SET
        title = ?,
        number = ?,
        video_url = ?,
        lyrics = ?
    WHERE id = ?;
    `,
};
