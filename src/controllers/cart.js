const {connect} = require('../utilities/database');

const addCart = async (req, res) => {
    const connection = await connect();
    const {id_u, id_p, quantity} = req.body

    try{
        const [price] = await connection.query(`SELECT PRICE FROM PRODUCTS WHERE ID = ${id_p}`);
        var total = Object.values(price[0]) * quantity;
        const [rows] = await connection.query(`INSERT INTO CART VALUES (NULL, ${id_u}, ${id_p}, ${quantity}, ${total})`);
       res.json({id:rows.id, ... req.body});
    }
    catch(e){
        res.json(e)
    }
}

const getCart = async (req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`SELECT P.NAME "PRODUCT", P.PRICE, C.QUANTITY, C.TOTAL FROM CART C INNER JOIN PRODUCTS P ON C.ID_PRODUCT = P.ID AND C.ID_USER = ?`, [req.params.id]);
        res.json(rows);
    }
    catch(e){
        res.json(e);
    }
}

const deleteCart = async (req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`DELETE FROM CART WHERE ID = ?`, [req.params.id]);
        res.json(rows);
    }
    catch(e){
        res.json(e);
    }
}

module.exports = {addCart, getCart, deleteCart};