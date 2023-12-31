const {Router} = require('express');
const fileUpload = require('express-fileupload');
const {SignUp} = require('../controllers/signup');
const {Login} = require('../controllers/login');
const {getSupplier, getSuppliers, AddSupplier, UpdateSupplier, DeleteSupplier} = require('../controllers/supplier');
const {AddBranch, getBranch, getBranches, UpdateBranch, DeleteBranch} = require('../controllers/branches');
const {AddCategory, getCategory, getCategories, UpdateCategory, DeleteCategory} = require('../controllers/category');
const {getUser, UpdateUser, DeleteUser} = require('../controllers/user');
const {addProduct, getProducts, deleteProduct, getProduct, updateProduct} = require('../controllers/products');
const {addPurchase, getPurchase} = require('../controllers/purchases');
const {addVehicle, getVehicle, getVehicles, updateVehicle, deleteVehicle} = require('../controllers/vehicle');
const {addOwn, getOwn} = require('../controllers/user_owns');
const {addCard, getCard, getCards, updateCard, deleteCard} = require('../controllers/cards');
const {addFavorite, getFavorites, deleteFavorite} = require('../controllers/favorites');
const {addCompatibility, getCompatibility, updateCompatibility, deleteCompatibility} = require('../controllers/compatible_with');
const {addP_product, getP_product} = require('../controllers/purchases_products');
const {addCart, getCart, deleteCart} = require('../controllers/cart');

const router = Router();

//Rutas para Login y Signup
router.post('/signup', SignUp);
router.post('/', Login);

//Rutas para los Proovedores
router.get('/supplier/:id', getSupplier);
router.get('/supplier', getSuppliers);
router.post('/supplier', AddSupplier);
router.put('/supplier/:id', UpdateSupplier);
router.delete('/supplier/:id', DeleteSupplier);

//Rutas para las Marcas
router.get('/branch', getBranches);
router.get('/branch/:id', getBranch);
router.post('/branch', AddBranch);
router.put('/branch/:id', UpdateBranch);
router.delete('/branch/:id', DeleteBranch);

//Rutas para las categorias
router.get('/category', getCategories);
router.get('/category/:id', getCategory);
router.post('/category', AddCategory);
router.put('/category/:id', UpdateCategory);
router.delete('/category/:id', DeleteCategory);

//Rutas para los usuarios
router.get('/user/:id', getUser);
router.put('/user/:id', UpdateUser);
router.delete('/user/:id', DeleteUser);

//Rutas para los productos
router.get('/product', getProducts);
router.post('/product',fileUpload({useTempFiles : true,tempFileDir: './uploads'}), addProduct);
router.delete('/product/:id', deleteProduct);
router.get('/product/:id', getProduct);
router.put('/product/:id', updateProduct);

//Rutas para las compras 
router.post('/purchase', addPurchase);
router.get('/purchase/:id', getPurchase);

//Rutas para los vehiculos
router.get('/vehicle/:id', getVehicle);
router.get('/vehicle', getVehicles);
router.post('/vehicle', addVehicle);
router.put('/vehicle/:id', updateVehicle);
router.delete('/vehicle/:id', deleteVehicle)

//Rutas para las propiedades de usuario
router.post('/own', addOwn);
router.get('/own/:id', getOwn);

//Rutas para las tarjetas
router.post('/card', addCard);
router.get('/card/:id', getCards);
router.get('/card/:id_u/:id', getCard);
router.put('/card/:id', updateCard);
router.delete('/card/:id', deleteCard);

//Rutas para los favoritos
router.post('/fav', addFavorite);
router.get('/fav/:id', getFavorites);
router.delete('/fav/:id', deleteFavorite);

//Rutas para las compatibilidades
router.post('/compatible', addCompatibility);
router.get('/compatible/:id', getCompatibility);
router.put('/compatible/:id', updateCompatibility);
router.delete('/compatible/:id', deleteCompatibility);

//Rutas para el historial de compras
router.post('/history', addP_product);
router.get('/history/:id', getP_product);

//Rutas para el carrito de compras
router.post('/cart', addCart);
router.get('/cart/:id', getCart);
router.delete('/cart/:id', deleteCart);

module.exports = router;