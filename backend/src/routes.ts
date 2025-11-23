import { Router } from "express";
import { Request, Response,RequestHandler } from 'express';
import multer from "multer";

// Import UsersClient
import { CreateUserClientController } from "./controllers/UsersClient/CreateUserClientController";
import { AuthUserClientController } from "./controllers/UsersClient/AuthUserClientController";
import { DetailUserClientController } from "./controllers/UsersClient/DetailUserClientController";

// Import UsersEmployee
import { CreateUserEmployeeController } from "./controllers/UsersEmployee/CreateUserEmployeeController";
import { AuthUserEmployeeController } from "./controllers/UsersEmployee/AuthUserEmployeeControlller";
import { DetailUserEmployeeController } from "./controllers/UsersEmployee/DetailUserEmployeeController";


// Import Category
import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryContorller";


// Import Product
import { CreateProductController } from "./controllers/product/CreateProductController";
import { ListByCategoryController } from "./controllers/product/ListByCategoryController";
import { DetailsProductController } from "./controllers/product/DetailsProductController";
import { AddIngredientToProductController } from "./controllers/product/AddIngredientToProductController";
import { RemoveIngredientFromProductController } from "./controllers/product/RemoveIngredientFromProductController";

// Import Order
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { RemoveOrderController } from "./controllers/order/RemoveOrderController";
import { ListOrderController } from "./controllers/order/ListOrderController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";
import { SumOrderController } from "./controllers/order/SumOrderController";
import { AggregateOrderItemsController } from './controllers/order/AggregateOrderItemsController';

// Import Item
import { AddItemController } from "./controllers/order/AddItemController";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { SendOrderController } from "./controllers/order/SendOrderController";

// Import Table
import { DetailTableController } from "./controllers/table/DetailTableController";
import { CreateTableController } from "./controllers/table/CreateTableController";
import { ListTableActiveOrdersController } from "./controllers/table/ListTableActiveOrdersController";
import { GetOrderByTableController } from "./controllers/order/GetOrderByTableController";
import { GetTableByNumberController } from "./controllers/table/GetTableByNumberController";

// Import Autenticação
import { isAuthenticated } from "./middlewares/isAuthenticated";
import uploadConfig from './config/multer'

// Import Ingredientes
import { CreateIngredientController } from "./controllers/ingredients/CreateIngredientControler";
import { ListIngredientController } from "./controllers/ingredients/ListIngredientController";
import { ListIngredientsByProductController } from "./controllers/ingredients/ListIngredientsByProductController";
import { ListExtraIngredientController } from "./controllers/ingredients/ListExtraIngredientController";
import { SetExtraIngredientController } from "./controllers/ingredients/SetExtraIngredientController";
import { AddExtraIngredientController } from "./controllers/ingredients/AddExtraIngredinetController";
import { RemoveExtraIngredientController } from "./controllers/ingredients/RemoveExtraIngredientController";
import { AddTypeIngredientController } from "./controllers/ingredients/AddTypeIngredientController";
import { ListIngredientByTypeController } from "./controllers/ingredients/ListIngredientsByTypeController";
import { ListNonExtraIngredientController } from "./controllers/ingredients/ListNonExtraIngredientController";

// Import Payment
import { PaymentController } from "./controllers/payment/PaymentController";

// Import JobRole
import { CreateJobRoleController } from "./controllers/JobRole/CreateJobRoleController";
import { ListJobRoleController } from "./controllers/JobRole/ListJobRoleController";

// Import Favorites
import { AddFavoriteController } from "./controllers/favorites/AddFavoriteController";
import { RemoveFavoriteController } from "./controllers/favorites/RemoveFavoriteController";
import { ListFavoritesController } from "./controllers/favorites/ListFavoriteController";

//Import ITem Status Update
import { UpdateItemStatusController } from "./controllers/order/UpdateItemStatusController";


const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))

const asyncWrapper = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// ROTAS USERCLIENT  
router.post('/users/client', asyncWrapper(new CreateUserClientController().handle));
router.post('/session/client', asyncWrapper(new AuthUserClientController().handle));
router.get('/me/client', asyncWrapper(new DetailUserClientController().handle));



// ROTAS CATEGORY Gerente
router.post('/category', new CreateCategoryController().handle)

router.get('/category', new ListCategoryController().handle.bind(new ListCategoryController()))

// ROTAS PRODUCT 

router.post('/product', new CreateProductController().handle)//gerente
router.get('/category/product', new ListByCategoryController().handle)//garçom e cliente
router.get('/details/product', new DetailsProductController().handle)

// ROTAS ORDER Cliente e garçom
router.post('/order', new CreateOrderController().handle)
router.delete('/order', new RemoveOrderController().handle)

router.post('/order/add', new AddItemController().handle)
router.delete('/order/remove', new RemoveItemController().handle.bind(new RemoveItemController()))
router.put('/order/send', new SendOrderController().handle)

router.get('/orders', new ListOrderController().handle)
router.get('/order/detail', new DetailOrderController().handle)

router.put('/order/finish', new FinishOrderController().handle)
router.get('/order/sum', new SumOrderController().handle)

// ROTAS ITENS ORDER
const aggregateOrderItemsController = new AggregateOrderItemsController();
router.get('/order/items/aggregate', aggregateOrderItemsController.handle.bind(aggregateOrderItemsController));

const updateItemStatusController = new UpdateItemStatusController();
router.put('/order/item/status', updateItemStatusController.handle.bind(updateItemStatusController));

    // Rota Pedidos Ativos cliente cozinha e garçom
    const getOrderByTableController = new GetOrderByTableController();
    router.get(
        "/table/:table_id/orders",
        getOrderByTableController.handle.bind(getOrderByTableController)
    );
    const getTableByNumberController = new GetTableByNumberController()
    router.get("/table/number/:number", getTableByNumberController.handle.bind(getTableByNumberController));

// ROTAS TABLE
router.get('/table/detail', new DetailTableController().handle)
router.post('/table', new CreateTableController().handle) //gerente
router.get('/table/order', new ListTableActiveOrdersController().handle)

// ROTAS INGREDIENTS
router.post('/ingredient', asyncWrapper(new CreateIngredientController().handle));//gerente
router.delete('/product/ingredient/remove', new RemoveIngredientFromProductController().handle)//gerente
router.get('/ingredients', asyncWrapper(new ListIngredientController().handle));
router.post('/product/ingredient', asyncWrapper(new AddIngredientToProductController().handle));//gerente
router.get('/ingredients/product/:product_id', asyncWrapper(new ListIngredientsByProductController().handle));
router.get('/ingredients/extra', new ListExtraIngredientController().handle);
router.put('/ingredient/extra', new SetExtraIngredientController().handle);
router.post('/ingredient/extra', new AddExtraIngredientController().handle)
router.delete('/ingredient/extra', new RemoveExtraIngredientController().handle)
router.post('/ingredient/type', new AddTypeIngredientController().handle)// gerente
router.get('/ingredient/type', new ListIngredientByTypeController().handle)
router.get('/ingredients/non-extra', new ListNonExtraIngredientController().handle)

// ROTAS PAYMENT
router.post('/payment', asyncWrapper(new PaymentController().handle.bind(new PaymentController())));
export { router };


// ROTAS JOB ROLE
router.post('/jobrole', asyncWrapper(new CreateJobRoleController().handle));//gerente
router.get('/jobroles', asyncWrapper(new ListJobRoleController().handle));

// ROTAS USERSEMPLOYEE
router.post('/users/employee', asyncWrapper(new CreateUserEmployeeController().handle));//gerente
router.post('/session/employee', asyncWrapper(new AuthUserEmployeeController().handle));
router.get('/me/employee', asyncWrapper(new DetailUserEmployeeController().handle));

// ROTAS USERCLIENT  
router.post('/users/client', asyncWrapper(new CreateUserClientController().handle));
router.post('/session/client', asyncWrapper(new AuthUserClientController().handle));
router.get('/me/client', asyncWrapper(new DetailUserClientController().handle));

// ROTAS FAVORITE
router.post('/favorite', isAuthenticated, asyncWrapper(new AddFavoriteController().handle));
router.delete('/favorite', asyncWrapper(new RemoveFavoriteController().handle))
router.get('/favorites', asyncWrapper(new ListFavoritesController().handle))



