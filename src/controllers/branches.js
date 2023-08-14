const {connect} = require('../utilities/database');

//Funcion para agregar una marca
const AddBranch = async (req, res) => {
    const connection = await connect();

    const {name} = req.body

    try{
    const [rows] = await connection.query(`INSERT INTO BRANCHES VALUES (NULL, "${name}")`);
    res.json(
        {id:rows.id, ... req.body}
    );
    }
    catch(e){
        res.json(e);
    }
}

//Funcion para obtener todas las marcas
const getBranches = async (req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`SELECT * FROM BRANCHES`);
        res.json(rows);
    }
    catch(e){
        res.json(e);
    }
}

//Funcion para obtener una sola marca
const getBranch = async (req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`SELECT * FROM BRANCHES WHERE ID = ?`, [req.params.id]);
        res.json(rows);
    }
    catch(e){
        res.json(e);
    }
}

//Funcion para actualizar una marca
const UpdateBranch = async (req, res) => {
    const connection = await connect();

    const {name} = req.body

    try{
        const [rows] = await connection.query(`UPDATE BRANCHES SET NAME = "${name}" WHERE ID = ?`, [req.params.id]);
        if(rows.length == 0 ){
            res.json({msg:'NULL'})
        }
        else{
            res.json(
                {id: rows.id , ... req.body}
            );
        }
    }
    catch(e){
        res.json(e);
    }
}

//Funcion para borrar una marca
const DeleteBranch = async (req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`DELETE FROM BRANCHES WHERE ID = ?`, [req.params.id]);
        res.json(rows)
    }
    catch(e){
        res.json(e)
    }
}

module.exports = {AddBranch, getBranch, getBranches, UpdateBranch, DeleteBranch};