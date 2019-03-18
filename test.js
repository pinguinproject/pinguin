const express = require ( 'express' );
const mysql = require ('mysql');
const bodyParser = require ( 'body-parser' );
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

var db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password : "",
	database : "pinguin",
	port : "3306"

});

//ROADS FOR INSERT
//In users table :
app.post('/users', function(req,res) {
	var Firstname = req.body.Firstname;
	var Lastname = req.body.Lastname;
	var Completename = req.body.Completename;
	var Birthdate = req.body.Birthdate;
	var Sex = req.body.Sex;
	var Mail = req.body.Mail;
	var Phone = req.body.Phone;
	//var Id = req.body.Id;
	var query = "INSERT INTO users (Firstname, Lastname, Completename, Birthdate, Sex, Mail, Phone) VALUES ('" + Firstname + "','" + Lastname + "','" + Completename +"','" +Birthdate+"'," +Sex+",'" +Mail+ "','" + Phone +"')"; 
	db.query(query, function(err, result, fields) {
		if (err) {
			res.send(JSON.stringify("Failed"));
		}
		else {
			res.send(JSON.stringify("Success"));
		}
	});
});

//ROADS FOR READ 
//For users : ALL DATA
app.get('/users', function(req, res) {     
	var query = "SELECT * FROM users";    
	var conditions = ["Firstname", "Lastname", "Completename", "Birthdate", "Sex", "Mail", "Phone", "Id"]; 

	//SELECTION
    for (var index in conditions) {         
    	if (conditions[index] in req.query) {             
    		if (query.indexOf("WHERE") < 0) {                 
    			query += " WHERE";             
    		} else {                 
    			query += " AND";             
    		} 

            query += " " + conditions[index] + "='" + req.query[conditions[index]] + "'";         
        }     
    } 

    //SORTING
    if ("sort" in req.query) {         
		var sort = req.query["sort"].split(",");         
		query += " ORDER BY"; 
        
        for (var index in sort) {             
        	var direction = sort[index].substr(0, 1);             
        	var field = sort[index].substr(1); 
            
            query += " " + field; 

            if (direction == "-")                 
            	query += " DESC,";             
            else                 
            	query += " ASC,";         
        } 
        
        query = query.slice(0, -1);     
    }

    //FILTERING
    if ("fields" in req.query) {         
    	query = query.replace("*", req.query["fields"]);     
    }

    //PAGINATION
    if ("limit" in req.query) {         
    	query += " LIMIT " + req.query["limit"];

        if ("offset" in req.query) {             
        	query += " OFFSET " + req.query["offset"];         
        }     
    }

    db.query(query, function(err, result, fields) {         
    	if (err) {
			res.send(JSON.stringify("Failed"));
		}
		else {
			res.send(JSON.stringify(result));
		} 
    }); 

});  

//ROADS FOR READ 
//For users : ONE DATA
app.get('/users/:id', function(req, res) {     
	var id = req.params.id;
	var query = "SELECT * FROM users WHERE Id = " +id;    
	var conditions = ["Firstname", "Lastname", "Completename", "Birthdate", "Sex", "Mail", "Phone", "Id"]; 

	//SELECTION
    for (var index in conditions) {         
    	if (conditions[index] in req.query) {             
    		if (query.indexOf("WHERE") < 0) {                 
    			query += " WHERE";             
    		} else {                 
    			query += " AND";             
    		} 

            query += " " + conditions[index] + "='" + req.query[conditions[index]] + "'";         
        }     
    } 

    //SORTING
    if ("sort" in req.query) {         
		var sort = req.query["sort"].split(",");         
		query += " ORDER BY"; 
        
        for (var index in sort) {             
        	var direction = sort[index].substr(0, 1);             
        	var field = sort[index].substr(1); 
            
            query += " " + field; 

            if (direction == "-")                 
            	query += " DESC,";             
            else                 
            	query += " ASC,";         
        } 
        
        query = query.slice(0, -1);     
    }

    //FILTERING
    if ("fields" in req.query) {         
    	query = query.replace("*", req.query["fields"]);     
    }

    //PAGINATION
    if ("limit" in req.query) {         
    	query += " LIMIT " + req.query["limit"];

        if ("offset" in req.query) {             
        	query += " OFFSET " + req.query["offset"];         
        }     
    }

    db.query(query, function(err, result, fields) {         
    	if (err) {
			res.send(JSON.stringify("Failed"));
		}
		else {
			res.send(JSON.stringify(result));
		} 
    }); 

});  

//ROADS FOR DELETE
//In users table :
app.delete('/users/:id', function(req,res) {
	var id = req.params.id;
	var query = "DELETE FROM users WHERE Id = " +id;
	db.query(query, function(err, result, fields) {
		if (err) {
			res.send(JSON.stringify("Failed"));
		}
		else {
			res.send(JSON.stringify("Success"));
		}
	});
});

app.listen( 3000 , function () {
db.connect( function (err) {
if (err) throw err;
console.log( 'Connection to database successful!' );
});
console.log( 'Example app listening on port 3000!' );
});