module.exports = function(app, db) {
 app.post('/messages', function(req,res) {
	var Id_send = req.body.Id_send;
	var Id_receive = req.body.Id_receive;
	var Date = req.body.Date;
	var Description = req.body.Description;
	var query = "INSERT INTO messages (Id_send, Id_receive, Date, Description) VALUES ('" + Id_send + "','" + Id_receive + "','" + Date +"','" + Description +"')"; 
	db.query(query, function(err, result, fields) {
		if (err) {
			res.writeHead(404)
			res.end("Failed " + JSON.stringify(result));
		}
		else {
			res.end("Success " + JSON.stringify(result));
		}
	});
});

//ROADS FOR READ 
//For messages : ALL DATA 
app.get('/messages', function(req, res) {     
	var query = "SELECT * FROM messages";    
	var conditions = ["Id_send", "Id_receive", "Date", "Description", "Id"]; 

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
			res.writeHead(404)
			res.end("Failed");
		}
		else {
			res.end("{ \"messages\" : " + JSON.stringify(result) + "}");
		} 
    }); 

});  

//ROADS FOR READ 
//For messages : ONE DATA
app.get('/messages/:id', function(req, res) {     
	var id = req.params.id;
	var query = "SELECT * FROM messages WHERE Id = " +id;    
	var conditions = ["Id_send", "Id_receive", "Date", "Description", "Id"]; 

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
			res.writeHead(404)
			res.end("Failed");
		}
		else {
			res.end("{ \"messages\" : " + JSON.stringify(result) + "}");
		}
    }); 

}); 

app.get('/messages/users/:id', function(req, res) {     
    var id = req.params.id;
    var query = "SELECT * FROM messages WHERE Id_send = " + id + " OR Id_receive = " + id;    
    var conditions = ["Id_send", "Id_receive", "Date", "Description", "Id"]; 

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
            res.writeHead(404)
            res.end("Failed");
        }
        else {
            res.end("{ \"messages\" : " + JSON.stringify(result) + "}");
        }
    }); 

}); 

//UPDATE
    app.put('/messages/:id', (req,res) => {
     var id = req.params.id;
     var Id_send = req.body.Id_send;
     var Id_receive = req.body.Id_receive;
     var Date = req.body.Date;
     var Description = req.body.Description;
     var query = "UPDATE messages SET " + "Id_send = (CASE WHEN ? IS NULL THEN Id_send ELSE ? END), " + "Id_receive = (CASE WHEN ? IS NULL THEN Id_receive ELSE ? END), " + "Date = (CASE WHEN ? IS NULL THEN Date ELSE ? END), " + "Description = (CASE WHEN ? IS NULL THEN Description ELSE ? END)" + "WHERE Id = " + id;
     db.query(query, [Id_send, Id_send, Id_receive, Id_receive, Date, Date, Description, Description], (err, result, fields) => {
        if (err) {
            console.log("Update failed.");
            res.writeHead(404);
            res.end("Update Failed");           
        }
        else {
            console.log("Update successful. Data updated : id ="+ req.params.id);
            res.end("Update successful. Data updated : id ="+ req.params.id);
        } 
    });
});

//ROADS FOR DELETE
//In users table :
app.delete('/messages/:id', function(req,res) {
	var id = req.params.id;
	var query = "DELETE FROM messages WHERE Id = " +id;
	db.query(query, function(err, result, fields) {
		if (err) {
			res.writeHead(404)
			res.end("Failed");
		}
		else {
			res.end("Success");
		}
	});
});
};