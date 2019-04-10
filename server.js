const express = require ( 'express' );
const mysql = require ('mysql');
const bodyParser = require ( 'body-parser' );
const app = express();
//const database = "pinguin"
app.use(bodyParser.urlencoded({ extended: true }));

var db = mysql.createConnection({
	host: "mypinguindb.cjpzl5rcji3m.eu-west-3.rds.amazonaws.com",
	user: "pinguin",
	password : "darkcookie",
	database : "pinguin",
	port : "3306"

});

require('./route')(app, db);

app.listen( 9000 , function () {
db.connect( function (err) {
if (err) throw err;
console.log( 'Connection to database successful!' );
});
console.log( 'Example app listening on port 9000!' );
});
process.on('uncaughtException', function (err) {
    console.log(err);
}); 