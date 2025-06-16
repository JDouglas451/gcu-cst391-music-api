import { Router } from 'express';
import * as AlbumsController from './albums.controller';

const router = Router();

// CREATE
router.route('/albums').post(AlbumsController.createAlbum);

// READ
router.route('/albums').get(AlbumsController.readAlbums);
router.route('/albums/:artist').get(AlbumsController.readAlbumsByArtist);
router.route('/albums/search/artist/:search').get(AlbumsController.readAlbumsByArtistSearch);
router.route('/albums/search/description/:search').get(AlbumsController.readAlbumsByDescriptionSearch);

// UPDATE
router.route('/albums').put(AlbumsController.updateAlbum);

// DELETE
router.route('/albums').delete(AlbumsController.deleteAlbum);

export default router;
