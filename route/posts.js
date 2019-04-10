module.exports = function(app, db) {
	//CREATE
  	app.get('/posts/post/:Type/:Id_user/:Id_event/:Date/:Url', (req, res) => {
		var Type = req.params.Type;
		var Id_user = req.params.Id_user;
		var Id_event = req.params.Id_event;
		var Date = req.params.Date;
		var Url = req.params.Url;
		var query = "INSERT INTO posts (Type, Id_user, Id_event, Date, Url) VALUES ('" + Type + "'," + Id_user + "," + Id_event +",'" + Date + "','" + Url +"')"; 
		db.query(query, (err, result, fields) => {
			if (err) {
				res.writeHead(404);
				res.end("Failed");
			}
			//else if (req.body.Mail === )
			else {
				res.end("Insertion successful. Data inserted : " + JSON.stringify(result));
			}
		});
	});


  	//READ
	app.get('/posts', (req, res) => {     
		var query = "SELECT * FROM posts";    
		var conditions = ["Id", "Type", "Id_user", "Id_event", "Date", "Url"]; 

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
				res.end("{ \"posts\" : " + JSON.stringify(result) + "}");
			} 
	    }); 
	}); 

app.get('/posts/:id', (req, res) => {
		var id = req.params.id;     
		var query = "SELECT * FROM posts WHERE Id = " + id;    
		var conditions = ["Id", "Type", "Id_user", "Id_event", "Date", "Url"]; 

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
				res.end("{ \"posts\" : " + JSON.stringify(result) + "}");
			} 
	    }); 
	}); 

app.get('/posts/events/:id_event', (req, res) => {
		var Id_event = req.params.id_event;     
		var query = "SELECT * FROM posts WHERE Id_event = " + Id_event;    
		var conditions = ["Id", "Type", "Id_user", "Id_event", "Date", "Url"]; 

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
				res.end("{ \"posts\" : " + JSON.stringify(result) + "}");
			} 
	    }); 
	}); 

app.get('/posts/users/:id', (req, res) => {
		var id = req.params.id;     
		var query = "SELECT * FROM posts WHERE Id_user = " + id;    
		var conditions = ["Id", "Type", "Id_user", "Id_event", "Date", "Url"]; 

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
				res.end("{ \"posts\" : " + JSON.stringify(result) + "}");
			} 
	    }); 
	}); 

	//UPDATE
	//Roads for UPDATE (total and partial)
	app.put('/posts/:id', (req,res) => {
		var id = req.params.id;
		var Type = req.body.Type;
		var Id_user = req.body.Id_user;
		var Id_event = req.body.Id_event;
		var Date = req.body.Date;
		var Url = req.body.Url;
		var query = "UPDATE posts SET " + "Type = (CASE WHEN ? IS NULL THEN Type ELSE ? END), " + "Id_user = (CASE WHEN ? IS NULL THEN Id_user ELSE ? END), " + "Id_event = (CASE WHEN ? IS NULL THEN Id_event ELSE ? END), " + "Date = (CASE WHEN ? IS NULL THEN Date ELSE ? END), " + "Url = (CASE WHEN ? IS NULL THEN Url ELSE ? END) " +"WHERE Id = " + id;
		db.query(query, [Type, Type, Id_user, Id_user, Id_event, Id_event, Date, Date, Url, Url], (err, result, fields) => {
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
	app.delete('/posts/:id', (req,res) => {
		var id = req.params.id;
		var query = "DELETE FROM posts WHERE Id = " +id;
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