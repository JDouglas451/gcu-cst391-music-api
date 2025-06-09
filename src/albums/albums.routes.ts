import { Router } from 'express';
import { getAlbums } from './albums.controller';

// route '/albums' to the albums controller
const router = Router();
router.route('/albums').get(getAlbums);

export default router;
