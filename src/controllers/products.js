const {connect} = require('../utilities/database');
const {uploadImage, deleteImage} = require('../utilities/cloudinary');
const fs = require('fs-extra');


//Funcion para agregar un producto
const addProduct = async (req, res) => {
    const connection = await connect();

    const {name, id_s, id_b, id_c, quantity, description, price} = req.body
    try{
        //Constante donde se almacena la funcion para subir imagenes a cloudinary
        const image = await uploadImage(req.files.image.tempFilePath);
        //Constantes donde se almacenan el url de la imagen ya subida y el public_id de la misma imagen
        const image_url = image.secure_url
        const image_public_id = image.public_id
        const [rows] = await connection.query(`INSERT INTO PRODUCTS VALUES (NULL, "${name}", ${id_s}, ${id_b}, ${id_c}, ${quantity}, ${price}, "${description}", "${image_url}", "${image_public_id}")`);
        res.json({id: rows.id, ... req.body});
        await fs.unlink(req.files.image.tempFilePath);
    }
    catch(e){
        res.json(e);
    }
}

//Funcion para obtener todos los productos
const getProducts = async (req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`SELECT * FROM PRODUCTS`);
        res.json(rows);
    }
    catch(e){
        res.json(e);
    }
}

//Funcion para borrar un objeto
const deleteProduct = async (req, res) => {
    const connection = await connect();

    try{
        //Constante donde se almacena el public_id del producto para despues borrarlo de la nube en cloudinary
        const [public_id] = await connection.query(`SELECT IMAGE_PUBLIC_ID FROM PRODUCTS WHERE ID = ?`, [req.params.id]);
        const pid = Object.values(public_id[0]);
        //Constante donde se llama la funcion de borrado de cloudinary
        const result = await deleteImage(pid[0]);
        console.log(result);
        const [rows] = await connection.query(`DELETE FROM PRODUCTS WHERE ID = ?`, [req.params.id]);
        res.json(rows)
    }
    catch(e){
        res.json(e);
    }
}

//Funcion para obtener un solo objeto por su id
const getProduct = async (req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`SELECT * FROM PRODUCTS WHERE ID = ?`, [req.params.id]);
        res.json(rows)
    }
    catch(e){
        res.json(e)
    }
}

//Funcion para actualizar un producto
const updateProduct = async (req, res) => {
    const connection = await connect();

    const {name, id_s, id_b, id_c, quantity, description, price} = req.body

    try{
        const [rows] = await connection.query(`UPDATE PRODUCTS SET NAME = "${name}", ID_SUPPLIER = ${id_s}, ID_BRANCH = ${id_b}, ID_CATEGORY = ${id_c}, QUANTITY = ${quantity}, DESCRIPTION = "${description}", PRICE = ${price} WHERE ID = ?`, [req.params.id])
        if(rows.length == 0){
            res.json({msg:'NULL'});
        }
        else{
            res.json({id: rows.id, ... req.body});
        }
    }
    catch(e){
        res.json(e)
    }
}

module.exports = {addProduct, getProducts, deleteProduct, getProduct, updateProduct};