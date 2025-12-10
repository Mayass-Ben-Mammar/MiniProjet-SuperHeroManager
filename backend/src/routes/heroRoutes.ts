console.log('📌 CHEMIN DU CONTROLLER :', require.resolve('../controllers/heroController'));
import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { upload } from '../middleware/uploadMiddleware';
import {
  getAllHeroes,
  getHeroById,
  createHero,
  updateHero,
  deleteHero,
  getHeroByName,
  updateHeroByName,
  deleteHeroByName
} from '../controllers/heroController';
console.log({
  getAllHeroes,
  getHeroById,
  createHero,
  updateHero,
  deleteHero,
  getHeroByName,
  updateHeroByName,
  deleteHeroByName
});
const router = express.Router();

router.get('/', getAllHeroes);
router.get('/:id', getHeroById);
router.post('/', authMiddleware, upload.single('image'), createHero);
router.put('/:id', authMiddleware, upload.single('image'), updateHero);
router.delete('/:id', authMiddleware, deleteHero);

router.get('/name/:name', getHeroByName);
router.put('/name/:name', authMiddleware, upload.single('image'), updateHeroByName);
router.delete('/name/:name', authMiddleware, deleteHeroByName);
router.get('/name/:name', (req, res, next) => {
  console.log("📡 Route appelée : /api/heroes/name/" + req.params.name);
  next();
}, getHeroByName);
export default router;
