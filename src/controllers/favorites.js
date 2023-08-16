const {connect} = require('../utilities/database');

const addFavorite = async (req, res) => {
    const connection = await connect();
    const {id_p, id_u} = req.body

    try{
        const [rows] = await connection.query(`INSERT INTO FAVORITES VALUES (NULL, ${id_p}, ${id_u})`);
        res.json({id: rows.id , ... req.body});
    }
    catch(e){
        res.json(e);
    }
}

const getFavorites = async (req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`SELECT P.NAME "PRODUCT", C.NAME "CATEGORY", P.IMAGE, P.PRICE FROM FAVORITES F JOIN PRODUCTS P ON ID_USER = ? AND P.ID = F.ID_PRODUCT JOIN CATEGORIES C  ON P.ID_CATEGORY = C.ID`, [req.params.id]);
        res.json(rows);
    }
    catch(e){
        res.json(e)
    }
}

const deleteFavorite = async (req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`DELETE FROM FAVORITES WHERE ID = ?`, [req.params.id]);
        res.json(rows);
    }
    catch(e){
        res.json(e);
    }
}

module.exports = {addFavorite, getFavorites, deleteFavorite};