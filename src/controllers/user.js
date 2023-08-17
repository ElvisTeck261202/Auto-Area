const {connect} = require('../utilities/database');

const getUser = async(req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`SELECT * FROM USERS WHERE ID = ?`, [req.params.id]);
        res.json(rows[0]);
    }
    catch(e){
        res.json(e);
    }
}

const UpdateUser = async(req, res) => {
    const connection = await connect();
    const {name, street, ZIP, email, phone} = req.body

    try{
        const [rows] = await connection.query(`UPDATE USERS SET NAME = "${name}", STREET = "${street}", ZIP = ${ZIP}, EMAIL = "${email}", PHONE = ${phone} WHERE ID = ?`, [req.params.id]);
        if(rows.length == 0){
            res.json({msg:'NULL'})
        }
        else{
            res.json({id:rows.id, ... req.body})
        }
    }
    catch(e){
        res.json(e);
    }
}

const DeleteUser = async(req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`DELETE FROM USERS WHERE ID = ?`, [req.params.id]);
        res.json(rows)
    }
    catch(e){
        res.json(e);
    }
}

module.exports = {getUser, UpdateUser, DeleteUser};