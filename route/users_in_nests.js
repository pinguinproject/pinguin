module.exports = function(app, db) {
	//CREATE
  	app.get('/users_in_nests/post/:Id_user/:Id_nest', (req, res) => {
		var Id_user = req.params.Id_user;
		var Id_nest = req.params.Id_nest;
		var query = "INSERT INTO users_in_nests (Id_user, Id_nest) VALUES ('" + Id_user + "','" + Id_nest + "')"; 
		db.query(query, (err, result, fields) => {
			if (err) {
				res.writeHead(404);
				res.end("Failed");
			}
			else {
				res.end("Insertion successful. Data inserted : " + JSON.stringify(result));
			}
		});
	});


  	//READ
	app.get('/users_in_nests', (req, res) => {     
		var query = "SELECT * FROM users_in_nests";
		var conditions = ["Id_user", "Id_nest"]; 

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

	    db.query(query, (err, result, fields) => {         
	    	if (err) {
				res.writeHead(404);
				res.end("Read Failed");			
			}
			else {
				res.end("{ \"users_in_nests\" : " + JSON.stringify(result) + "}");
			} 
	    }); 
	}); 

app.get('/users_in_nests/:id', (req, res) => {
		var id = req.params.id;     
		var query = "SELECT * FROM users_in_nests WHERE Id = " +id;    
		var conditions = ["Id_user", "Id_nest"];  

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

	    db.query(query, (err, result, fields) => {         
	    	if (err) {
				res.writeHead(404);
				res.end("Read Failed");			
			}
			else {
				res.end("{ \"users_in_nests\" : " + JSON.stringify(result) + "}");
			} 
	    }); 
	}); 

app.get('/users_in_nests/users/:id', function(req, res) {     
    var id = req.params.id;
    var query = "SELECT * FROM nests INNER JOIN users_in_nests on nests.Id=users_in_nests.Id_nest WHERE users_in_nests.Id_user = " + id;    
    var conditions = ["Id_user", "Id_nest"]; 

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
            res.end("{ \"users_in_nests\" : " + JSON.stringify(result) + "}");
        }
    }); 

}); 

app.get('/users_in_nests/nests/:id', function(req, res) {     
    var id = req.params.id;
    var query = "SELECT * FROM users INNER JOIN users_in_nests on users.Id=users_in_nests.Id_user WHERE users_in_nests.Id_nest = " + id;    
    var conditions = ["Id_user", "Id_nest"]; 

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
            res.end("{ \"users_in_nests\" : " + JSON.stringify(result) + "}");
        }
    }); 

}); 

	//UPDATE
	//Roads for UPDATE (total and partial)
	app.get('/users_in_nests/put/:id/:Id_user/:Id_nest', (req,res) => {
		var id = req.params.id;
		var Id_user = req.params.Id_user;
		var Id_nest = req.params.Id_nest;
		var query = "UPDATE users_in_nests SET " + "Id_user = (CASE WHEN ? IS NULL THEN Id_user ELSE ? END), " + "Id_nest = (CASE WHEN ? IS NULL THEN Id_nest ELSE ? END)" + "WHERE Id = " + id;
		db.query(query, [Id_user, Id_user, Id_nest, Id_nest], (err, result, fields) => {
			if (err) {
				res.writeHead(404);
				res.end("Update Failed");			
			}
			else {
				res.end("Update successful. Data updated : id ="+ req.params.id);
			} 
		});
	});

	//DELETE
	app.get('/users_in_nests/delete/:id', (req,res) => {
		var id = req.params.id;
		var query = "DELETE FROM users_in_nests WHERE Id = " +id;
		db.query(query, (err, result, fields) => {
			if (err) {
				res.writeHead(404);
				res.end("Delete Failed");
			}
			else {
				res.end("Delete successful. Data deleted : id = "+ req.params.id);
			}
		});
	});

};