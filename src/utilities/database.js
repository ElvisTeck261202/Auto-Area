const mysql = require('mysql2/promise');
const {config} = require('./config');

const connect = async() => {
    return await mysql.createConnection(config);
}

module.exports = {connect};