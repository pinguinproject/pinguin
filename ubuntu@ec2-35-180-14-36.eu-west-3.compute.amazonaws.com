const express = require ( 'express' );
const mysql = require ('mysql');
const bodyParser = require ( 'body-parser' );
const app = express();
const database = "pinguin"
app.use(bodyParser.urlencoded({ extended: true }));

var db = mysql.createConnection({
	host: process.env.RDS_HOSTNAME,
	user: process.env.RDS_USERNAME,
	password : process.env.RDS_PASSWORD,
	database : process.env.RDS_DB_NAME,
	port : process.env.RDS_PORT

});

require('./route')(app, db);

app.listen( 3000 , function () {
db.connect( function (err) {
if (err) throw err;
console.log( 'Connection to database successful!' );
});
console.log( 'Example app listening on port 3000!' );
});
process.on('uncaughtException', function (err) {
    console.log(err);
}); 