const {connect} = require('../utilities/database');

const addCompatibility = async (req, res) => {
    const connection = await connect();
    const {id_v, id_p} = req.body

    try{
        const [rows] = await connection.query(`INSERT INTO COMPATIBLE_WITH VALUES (NULL, ${id_v}, ${id_p})`);
        res.json({id:rows.id, ... req.body});
    }
    catch(e){
        res.json(e);
    }
}

const getCompatibility = async (req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`SELECT C.ID, V.NAME "VEHICLE", P.NAME "PRODUCT" FROM COMPATIBLE_WITH C JOIN VEHICLES V ON C.ID_VEHICLE = V.ID JOIN PRODUCTS P ON C.ID_PRODUCT = P.ID AND C.ID = ?`, [req.params.id]);
        res.json(rows[0]);
    }
    catch(e){
        res.json(e);
    }
}

const updateCompatibility = async (req, res) => {
    const connection = await connect();
    const {id_v, id_p} = req.body

    try{
        const [rows] = await connection.query(`UPDATE COMPATIBLE_WITH SET ID_VEHICLE = ${id_v}, ID_PRODUCT = ${id_p} WHERE ID = ?`, [req.params.id]);
        if(rows.length == 0){
            res.json({msg:'NULL'});
        }
        else{
            res.json({id: rows.id, ... req.body});
        }
    }
    catch(e){
        res.json(e);
    }
}

const deleteCompatibility = async (req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`DELETE FROM COMPATIBLE_WITH WHERE ID = ?`, [req.params.id]);
        res.json(rows);
    }
    catch(e){
        res.json(e);
    }
}

module.exports = {addCompatibility, getCompatibility, updateCompatibility, deleteCompatibility};