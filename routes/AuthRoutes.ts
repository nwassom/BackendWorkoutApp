import { Router } from 'express';
import { signup, login } from '../controllers/AuthController';
//import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;