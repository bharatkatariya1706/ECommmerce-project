import express from 'express';
import { braintreePaymentController, braintreeTokenController, createProductController, deleteProductController, getAllProductsController, getProductPhotoController, getSingleProductController, productCategoryController, productCountController, productFilterController, productListController, relatedProductController, searchProductController, updateProductController } from '../controllers/productController.js';
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

//filter products
router.post('/product-filter' , productFilterController);

//product-count
router.get('/product-count' , productCountController)

//products per page
router.get('/product-list/:page' , productListController)

//search product
router.get('/search/:keyword' , searchProductController)

//similar products ---
router.get('/related-product/:pid/:cid' , relatedProductController)

//category wise products
router.get('/product-category/:slug' , productCategoryController)

//payment gateway route
//token
router.get('/braintree/token' ,braintreeTokenController)

//payment
router.post('/braintree/payment',requireSignIn, braintreePaymentController)



export default router 