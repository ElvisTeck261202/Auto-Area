const {connect} = require('../utilities/database');

const addVehicle = async (req, res) => {
    const connection = await connect();
    const {name, branch, year} = req. body

    try{
        const [rows] = await connection.query(`INSERT INTO VEHICLES VALUES (NULL, "${name}", "${branch}", ${year})`);
        res.json({id:rows.id , ... req.body});
    }
    catch(e){
        res.json(e);
    }
}

const getVehicle = async (req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`SELECT * FROM VEHICLES WHERE ID = ?`, [req.params.id]);
        res.json(rows[0]);
    }
    catch(e){
        res.json(e)
    }
}

const updateVehicle = async (req, res) => {
    const connection = await connect();
    const {name, branch, year} = req.body

    try{
        const [rows] = await connection.query(`UPDATE VEHICLES SET NAME = "${name}", BRANCH = "${branch}", YEAR = ${year} WHERE ID = ?`, [req.params.id]);
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

const deleteVehicle = async (req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`DELETE FROM VEHICLES WHERE ID = ?`, [req.params.id]);
        res.json(rows);
    }
    catch(e){
        res.json(e);
    }
}

module.exports = {addVehicle, getVehicle, updateVehicle, deleteVehicle};