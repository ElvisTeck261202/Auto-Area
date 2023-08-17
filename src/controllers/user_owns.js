const {connect} = require('../utilities/database');

const addOwn = async (req, res) => {
    const connection = await connect();
    const {id_u, id_v} = req.body

    try{
        const [rows] = await connection.query(`INSERT INTO USER_OWNS VALUES (NULL, ${id_u}, ${id_v})`);
        res.json({id:rows.id, ... req.body});
    }
    catch(e){
        res.json(e);
    }
}

const getOwn = async (req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`SELECT U.ID_USER, V.NAME, V.BRANCH, V.YEAR FROM USER_OWNS U INNER JOIN VEHICLES V ON U.ID_USER = ? AND U.ID_VEHICLE = V.ID;`, [req.params.id]);
        res.json(rows[0])
    }
    catch(e){
        res.json(e);
    }
}

module.exports = {addOwn, getOwn}