import { execute } from "../services/mysql.connector";
import { Artist } from "./artists.model";
import { artistQueries } from "./artists.queries";

// READ
export const readArtists = async () => {
    return execute<Artist[]>(
        artistQueries.readArtists, []
    );
};
