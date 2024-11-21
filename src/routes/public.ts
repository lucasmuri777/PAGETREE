import { Router } from 'express';
import { auth } from '../services/auth';

import * as userController from '../controllers/publicControllers/userController';
import * as siteController from '../controllers/publicControllers/siteController';

const router = Router();

router.get('/ping', auth, (req, res) => {
    res.json({
        pong: true,
    })
});

router.post('/login', userController.login);
router.get('/site/:id', siteController.getSite);
export default router;