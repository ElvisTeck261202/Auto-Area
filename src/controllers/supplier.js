const {connect} = require('../utilities/database');

//Funcion para agregar un proovedor
const AddSupplier = async (req, res) => {
    const connection = await connect();
    const {name, residence, rfc} = req.body

    try{
        const [rows] = await connection.query(`INSERT INTO SUPPLIERS VALUES (NULL, "${name}", "${residence}", "${rfc}")`);
        res.json({
            id: rows.id , ... req.body
        });
    }
    catch(e){
        res.json(e);
    }
}

//Funcion para actualizar un proovedor
const UpdateSupplier = async(req, res) => {
    const connection = await connect();
    const {name, residence} = req.body

    try{
        const[rows] = await connection.query(`UPDATE SUPPLIERS SET NAME = "${name}", RESIDENCE = "${residence}" WHERE ID = ?`, [req.params.id]);
        if(rows.length == 0){
            res.json({msg: 'NULL'});
        }
        else{
            res.json({
                id:rows.id , ... req.body
            });
        }
    }
    catch(e){
        res.json(e);
    }
}

//Funcion para obtener un solo proovedor
const getSupplier = async (req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query('SELECT * FROM SUPPLIERS WHERE ID = ?', [req.params.id]);
        res.json(rows[0]);
    }
    catch(e){
        res.json(e);
    }
}

//Funcion para obtener a todos los proovedores
const getSuppliers = async (req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`SELECT * FROM SUPPLIERS`);
        res.json(rows);
    }
    catch(e){
        res.json(e);
    }
}

const DeleteSupplier = async (req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`DELETE FROM SUPPLIERS WHERE ID = ?`, [req.params.id]);
        res.json(rows);
    }
    catch(e){
        res.json(e);
    }
}

module.exports = {AddSupplier, UpdateSupplier, getSupplier, getSuppliers, DeleteSupplier}