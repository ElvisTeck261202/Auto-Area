const {connect} = require("../utilities/database");

const addCard = async (req, res) => {
    const connection = await connect();
    const {id_u, name, ccv, number, date, residence} = req.body

    try{
        const [rows] = await connection.query(`INSERT INTO CARDS VALUES (NULL, "${id_u}", "${name}", ${ccv}, "${number}", "${date}", "${residence}")`)
        res.json({id:rows.id , ... req.body});
    }
    catch(e){
        res.json(e);
    }
}

const getCards = async (req, res) => {
    const connection = await connect();
    
    try{
        const [rows] = await connection.query(`SELECT * FROM CARDS WHERE ID_USER = ?`, [req.params.id]);
        res.json(rows);
    } 
    catch(e){
        res.json(e);
    }
}

const getCard = async (req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`SELECT * FROM CARDS WHERE ID_USER = ? AND ID = ?`, [req.params.id_u, req.params.id]);
        res.json(rows[0]);
    }
    catch(e){
        res.json(e);
    }
}

const updateCard = async (req, res) => {
    const connection = await connect();
    const {name, ccv, number, date, residence} = req.body

    try{
        const [rows] = await connection.query(`UPDATE CARDS SET NAME = "${name}", CVV = ${ccv}, NUMBER = "${number}", DATE = "${date}", RESIDENCE = "${residence}" WHERE ID = ?`, [req.params.id]);
        res.json({id: rows.id , ... req.body});
    }
    catch(e){
        res.json(e);
    }
}

const deleteCard = async (req, res) => {
    const connection = await connect();

    try{
        const[rows] = await connection.query(`DELETE FROM CARDS WHERE ID = ?`, [req.params.id]);
        res.json(rows);
    }
    catch(e){
        res.json(e);
    }
}

module.exports = {addCard, getCard, getCards, updateCard, deleteCard};