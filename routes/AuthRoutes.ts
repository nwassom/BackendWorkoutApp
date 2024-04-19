import { Router } from 'express';
import { signup } from '../controllers/AuthController';
//import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

router.post('/signup', signup);

export default router;