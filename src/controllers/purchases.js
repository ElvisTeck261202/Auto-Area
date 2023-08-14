const {connect} = require('../utilities/database');

const addPurchase = async(req, res) => {
    const connection = await connect();
    const {id_u, subtotal} = req.body
    var iva = subtotal * 0.16
    var total = subtotal + iva

    try{
        const [rows] = await connection.query(`INSERT INTO PURCHASES VALUES(NULL, ${id_u}, ${subtotal}, ${total}, ${iva}, CURRENT_DATE())`);
        res.json({id:rows.id, ... req.body});
    }
    catch(e){
        res.json(e)
    }
}

const getPurchase = async(req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`SELECT * FROM PURCHASES WHERE ID = ?`, [req.params.id]);
        res.json(rows);
    }
    catch(e){
        res.json(e);
    }
}

module.exports = {addPurchase, getPurchase};