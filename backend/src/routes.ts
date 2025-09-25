import { Router} from "express";
import { Request, Response } from 'express';
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserControlller";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryContorller";

import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { DetailsProductController } from "./controllers/product/DetailsProductController";
import { AddOrUpdateIngredientToProductController } from "./controllers/product/AddOrUpdateIngredientToProductService";


import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";

import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";

import { ListOrderController } from "./controllers/order/ListOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";

import { DetailTableController } from "./controllers/table/DetailTableController";
import { CreateTableController } from "./controllers/table/CreateTableController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import uploadConfig from './config/multer'

// -- Imports dos Controladores de Ingredientes --
import { CreateIngredientController } from "./controllers/ingredients/CreateIngredientControler";
import { ListIngredientController } from "./controllers/ingredients/ListIngredientController";
import { ListIngredientsByProductController } from "./controllers/ingredients/ListIngredientsByProductController";
import { SumOrderController } from "./controllers/order/SumOrderController";
import { ListExtraIngredientController } from "./controllers/ingredients/ListExtraIngredientController";
import { SetExtraIngredientController } from "./controllers/ingredients/SetExtraIngredientController";

import { Pix } from './services/payment/PixPayment'; 

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))


const asyncWrapper = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// -- ROTAS USER -- 
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)

// -- ROTAS CATEGORY --
router.post('/category', isAuthenticated, new CreateCategoryController().handle) 

router.get('/category', new ListCategoryController().handle.bind(new ListCategoryController()))

// -- ROTAS PRODUCT --
// router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.post('/product', isAuthenticated, new CreateProductController().handle)
router.get('/category/product', new ListByCategoryController().handle)
router.get('/details/product', new DetailsProductController().handle)

// ROTAS ORDER

router.post('/order', new CreateOrderController().handle)
router.delete('/order', new RemoveOrderController().handle)

router.post('/order/add', new AddItemController().handle)
router.delete('/order/remove', new RemoveItemController().handle)
router.put('/order/send', new SendOrderController().handle)

router.get('/orders', isAuthenticated, new ListOrderController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle)

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)
router.get('/order/sum', new SumOrderController().handle)

// ROTAS TABLE

router.get('/table/detail', new DetailTableController().handle)
router.post('/table', new CreateTableController().handle)

// ROTAS INGREDIENTS
router.post('/ingredient', isAuthenticated, asyncWrapper(new CreateIngredientController().handle));
router.get('/ingredients', asyncWrapper(new ListIngredientController().handle));
router.post('/product/ingredient', asyncWrapper(new AddOrUpdateIngredientToProductController().handle));
router.get('/products/:product_id/ingredients', asyncWrapper(new ListIngredientsByProductController().handle) );
router.get('/ingredients/extra', new ListExtraIngredientController().handle);
router.put('/ingredient/extra' , new SetExtraIngredientController().handle);
  
// ROTAS PAYMENT

export { router };