const {connect} = require('../utilities/database');

const Login = async(req, res) => {

    const connection = await connect();

    const {email, pass} = req.body

    try{
        const[rows] = await connection.query(`SELECT * FROM USERS WHERE EMAIL = "${email}" AND PASSWORD = "${pass}"`);
        if (rows.length == 0){
            res.json({msg: 'NULL'});
        }
        else{
            res.json({msg:'Ok', id: rows[0].id});
        }
    }
    catch(e){
        res.json(e);
    }
}

module.exports = {Login}