import { Router } from 'express';
import { auth } from '../services/auth';
import { upload } from "../middleware/multer";
import express from 'express';


import * as sitesController from '../controllers/adminControllers/sitesController';
import * as sectionController from '../controllers/adminControllers/sectionController';
import * as imageController from '../controllers/adminControllers/imagesController';
import * as stripeController  from '../controllers/adminControllers/stripeController';
import * as userInfosController from '../controllers/adminControllers/userInfosController';
const router = Router();

//ROTAS DO SITE
router.post('/:id/site', auth, sitesController.createSite);
router.put('/:id_user/site/:id', auth, sitesController.editSite);
router.get('/:id_user/site', auth, sitesController.getSitesByUserId);
router.get('/:id_user/site/:id', auth, sitesController.getSiteByUserIdAndSiteId);
router.delete('/:id_user/site/:id', auth, sitesController.deleteSite);

//ROTAS DAS SESSOES DO SITE
router.post('/:id_user/site/:id/section', auth, sectionController.createSection);
router.put('/:id_user/site/:id_site/section/:id', auth, sectionController.updateSection);
router.get('/:id_user/site/:id_site/section', auth, sectionController.getSectionsBySiteId);
router.get('/:id_user/site/:id_site/section/:id', auth, sectionController.getSectionById);
router.delete('/:id_user/site/:id_site/section/:id', auth, sectionController.deleteSection);

//ROTAS DAS IMAGENS
//AQUI O MULTER INTERCEPTA O ENVIO DA IMAGEM
router.post('/:id_user/image', auth, upload.single('image'),imageController.createImage);
router.get('/:id_user/image', auth,imageController.getImagesByIdUser);
router.delete('/:id_user/image/:id', auth,imageController.deleteImage);

//rota de pagamentos stripe
router.post('/create-checkout-session', auth, stripeController.createChekout);
router.put('/change-user', auth, stripeController.updateUser);

//rota pra pegar userInfos 
router.get('/:id_user/user-info', auth, userInfosController.getInfoUser);

export default router;