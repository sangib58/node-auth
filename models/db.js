const mysql=require('mysql');
const util=require('util');
const config=require('../config/config.js');

const Connection=mysql.createConnection({
    host:config.db_host,
    user:config.db_user,
    password:config.db_password,
    database:config.db_name,
    multipleStatements:true
});

Connection.connect(error=>{
    if(error) throw error;
    console.log('Successfully connected to database!');
});

Connection.query=util.promisify(Connection.query);
module.exports=Connection;