const express = require ( 'express' );
const mysql = require ('mysql');
const bodyParser = require ( 'body-parser' );
const app = express();
const database = "pinguin"
app.use(bodyParser.urlencoded({ extended: true }));

var db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password : "",
	database : database,
	port : "3306"

});

require('./route')(app, database);

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