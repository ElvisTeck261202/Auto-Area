const {connect} = require('../utilities/database');

//Funcion para agregar una categoria
const AddCategory = async (req, res) => {
    const connection = await connect();
    const {name} = req.body

    try{
        const [rows] = await connection.query(`INSERT INTO CATEGORIES VALUES (NULL, "${name}")`);
        res.json(
            {id:rows.id , ... req.body}
        );
    }
    catch(e){
        res.json(e);
    }
}

//Funcion para obtener todas las categorias
const getCategories = async (req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`SELECT * FROM CATEGORIES`);
        res.json(rows);
    }
    catch(e){
        res.json(e);
    }
}

//Funcion para obtener una sola categoria
const getCategory = async (req, res) => {
    const connection = await connect();

    try{
        const[rows] = await connection.query(`SELECT * FROM CATEGORIES WHERE ID = ?`, [req.params.id]);
        res.json(rows[0]);
    }
    catch(e){
        res.json(e);
    }
}

//Funcion para actualizar una categoria
const UpdateCategory = async (req, res) => {
    const connection = await connect();

    const {name} = req.body

    try{
        const [rows] = await connection.query(`UPDATE CATEGORIES SET NAME = "${name}" WHERE ID = ?`, [req.params.id]);
        if(rows.length == 0){
            res.json({msg:'NULL'});
        }
        else{
            res.json({id:rows.id, ... req.body});
        }
    }
    catch(e){
        res.json(e);
    }
}

const DeleteCategory = async (req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`DELETE FROM CATEGORIES WHERE ID = ?`, [req.params.id]);
        res.json(rows)
    }
    catch(e){
        res.json(e);
    }
}

module.exports = {AddCategory, getCategories, getCategory, UpdateCategory, DeleteCategory}