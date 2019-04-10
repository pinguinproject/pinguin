module.exports = function(app, db) {
	//CREATE
  	app.post('/friendships', (req, res) => {
		var Id_user_send = req.body.Id_user_send;
		var Id_user_receive = req.body.Id_user_receive;
		var Friendship = req.body.Friendship;
		var query = "INSERT INTO friendships (Id_user_send, Id_user_receive, Friendship) VALUES ('" + Id_user_send + "','" + Id_user_receive + "','" + Friendship + "')"; 
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
	app.get('/friendships', (req, res) => {     
		var query = "SELECT * FROM friendships";    
		var conditions = ["Id_user_send", "Id_user_receive", "Friendship"]; 

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
				res.end("{ \"friendships\" : " + JSON.stringify(result) + "}");
			} 
	    }); 
	}); 

app.get('/friendships/:id', (req, res) => {
		var id = req.params.id;     
		var query = "SELECT * FROM friendships WHERE Id = " +id;    
		var conditions = ["Id_user_send", "Id_user_receive", "Friendship"]; 

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
				res.end("{ \"friendships\" : " + JSON.stringify(result) + "}");
			} 
	    }); 
	}); 

app.get('/friendships/users/:id', (req, res) => {
		var id = req.params.id;     
		var query = "SELECT * FROM friendships WHERE Id_user_send = " + id + " OR Id_user_receive = " + id;    
		var conditions = ["Id_user_send", "Id_user_receive", "Friendship"];

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
				res.end("{ \"friendships\" : " + JSON.stringify(result) + "}");
			} 
	    }); 
	});

	//UPDATE
	//Roads for UPDATE (total and partial)
	app.put('/friendships/:id', (req,res) => {
		var id = req.params.id;
		var Id_user_send = req.body.Id_user_send;
		var Id_user_receive = req.body.Id_user_receive;
		var Friendship = req.body.Friendship;
		var query = "UPDATE friendships SET " + "Id_user_send = (CASE WHEN ? IS NULL THEN Id_user_send ELSE ? END), " + "Id_user_receive = (CASE WHEN ? IS NULL THEN Id_user_receive ELSE ? END), " + "Friendship = (CASE WHEN ? IS NULL THEN Friendship ELSE ? END)" + "WHERE Id = " + id;
		db.query(query, [Id_user_send, Id_user_send, Id_user_receive, Id_user_receive, Friendship, Friendship], (err, result, fields) => {
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
	app.delete('/friendships/:id', (req,res) => {
		var id = req.params.id;
		var query = "DELETE FROM friendships WHERE Id = " +id;
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