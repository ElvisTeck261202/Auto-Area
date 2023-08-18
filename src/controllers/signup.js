const {connect} = require('../utilities/database');

const SignUp = async(req, res) => {
    const connection = await connect();

    const {name, street, ZIP, email, pass, phone} = req.body
    try{
        const[rows] = await connection.query(`INSERT INTO Users VALUES(NULL, "${name}", "${street}", "${ZIP}", "${email}", "${pass}", ${phone})`);
        res.json({
            id:rows.id, ...req.body
        });
    }
    catch(e){
        res.json(e)
    }
}

module.exports = {SignUp}