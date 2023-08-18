const {connect} = require('../utilities/database');

const addP_product = async (req, res) => {
    const connection = await connect();
    const {id_pu, id_p, quantity} = req.body

    try{
        const [rows] = await connection.query(`INSERT INTO PURCHASE_PRODUCTS VALUES (NULL, ${id_pu}, ${id_p}, ${quantity})`);
        res.json({id:rows.id, ... req.body});
    }
    catch(e){
        res.json(e);
    }
}

const getP_product = async (req, res) => {
    const connection = await connect();

    try{
        const [rows] = await connection.query(`SELECT P.NAME "PRODUCT", P.IMAGE, PP.QUANTITY, PU.TOTAL, PU.DATE, PU.ID FROM PURCHASE_PRODUCTS PP JOIN PRODUCTS P ON PP.ID_PRODUCT = P.ID JOIN PURCHASES PU ON PU.ID = PP.ID_PURCHASES AND PU.ID_USER = ?`, [req.params.id]);
        const groupedData = {};
        rows.forEach(item => {
            const itemId = item.ID;
            if (!groupedData[itemId]) {
                groupedData[itemId] = [];
            }
            groupedData[itemId].push(item);
        });
        
        // Convert the grouped data into a response object
        const response = Object.entries(groupedData).map(([id, items]) => ({ [id]: items }));
        
        res.json(response);
    }
    catch(e){
        res.json(e);
    }
}

module.exports = {addP_product, getP_product};