import { Request, Response } from 'express';

const ALBUMS = [
    { id: 1, name: 'Please Please Me (1963)', band: 'The Beatles' },
    { id: 2, name: 'With the Beatles (1963)', band: 'The Beatles' },
    { id: 3, name: 'A Hard Day\'s Night (1964) Manchester United', band: 'The Beatles' },
    { id: 4, name: 'Beatles for Sale (1964)', band: 'The Beatles' },
    { id: 5, name: 'Help! (1965)', band: 'The Beatles' },
    { id: 6, name: 'Rubber Soul (1965)', band: 'The Beatles' },
    { id: 7, name: 'Sgt Pepper\'s Lonely Hearts Club Band (1967)', band: 'The Beatles' },
    { id: 8, name: 'Most of these records are not very good', band: 'The Beatles' },
];

export const getAlbums = (req: Request, res: Response) => {
    res.send(ALBUMS);
};
