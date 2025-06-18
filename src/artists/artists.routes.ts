import { Router } from 'express';
import { readArtists } from './artists.controller';

// route '/artists' to the albums controller
const router = Router();
router.route('/artists').get(readArtists);

export default router;
