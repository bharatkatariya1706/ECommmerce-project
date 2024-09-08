import express from 'express';
import { createProductController, deleteProductController, getAllProductsController, getProductPhotoController, getSingleProductController, updateProductController } from '../controllers/productController.js';
import {requireSignIn , isAdmin} from '../middlewares/authMiddleware.js'
import formidable from 'express-formidable';

const router =express.Router();

//routes
router.post('/create-product' , requireSignIn , isAdmin ,formidable(), createProductController)

//get products
router.get('/get-product' , getAllProductsController)

//single product
router.get('/get-product/:slug' , getSingleProductController)

//get photo
router.get('/product-photo/:pid' , getProductPhotoController)

//delete product
router.delete('/delete-product/:pid' , requireSignIn , isAdmin , deleteProductController)

//update product
router.put('/update-product/:pid' , requireSignIn , isAdmin ,formidable(), updateProductController)

export default router 