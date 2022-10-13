import { Router } from 'express';
const router = Router();
import { apiRequest, checkUserAuth } from '../controller/api.controller';
import { authlogin } from '../middleware/authLogin';

router.get('/api/v1/randomquotes', authlogin, apiRequest);
router.post('/api/v1/user-auth', checkUserAuth);

export default router;
