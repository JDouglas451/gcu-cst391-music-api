import { Router } from 'express';
import { getArtists } from './artists.controller';

// route '/artists' to the albums controller
const router = Router();
router.route('/artists').get(getArtists);

export default router;
