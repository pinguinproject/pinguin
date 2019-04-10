module.exports = function(app, db) {
	//CREATE
  	app.post('/notifications', (req, res) => {
		var Id_user = req.body.Id_user;
		var Description = req.body.Description;
		var Date = req.body.Date;
		var Id_event = req.body.Id_event;
		var query = "INSERT INTO notifications (Id_user, Description, Date, Id_event) VALUES (" + Id_user + ",'" + Description + "','" + Date +"'," +Id_event+")"; 
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
	app.get('/notifications', (req, res) => {     
		var query = "SELECT * FROM notifications";    
		var conditions = ["Id", "Id_user", "Description", "Date", "Id_event"]; 

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
				res.end("{ \"notifications\" : " + JSON.stringify(result) + "}");
			} 
	    }); 
	});

	app.get('/notifications/users/:id', (req, res) => {
		var id = req.params.id;     
		var query = "SELECT * FROM notifications WHERE Id_user = " + id;    
		var conditions = ["Id", "Id_user", "Description", "Date", "Id_event"]; 

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
				res.end("{ \"notifications\" : " + JSON.stringify(result) + "}");
			} 
	    }); 
	});

	app.get('/notifications/events/:id_event', (req, res) => {
		var Id_event = req.params.id_event;     
		var query = "SELECT * FROM notifications WHERE Id_event = " + Id_event;    
		var conditions = ["Id", "Id_user", "Description", "Date", "Id_event"]; 

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
				res.end("{ \"notifications\" : " + JSON.stringify(result) + "}");
			} 
	    }); 
	});

	//UPDATE
	//Roads for UPDATE (total and partial)
	app.put('/notifications/:id', (req,res) => {
		var id = req.params.id;
		var Id_user = req.body.Id_user;
		var Description = req.body.Description;
		var Date = req.body.Date;
		var Id_event = req.body.Id_event;
		var query = "UPDATE notifications SET " + "Id_user = (CASE WHEN ? IS NULL THEN Id_user ELSE ? END), " + "Description = (CASE WHEN ? IS NULL THEN Description ELSE ? END), " + "Date = (CASE WHEN ? IS NULL THEN Date ELSE ? END), " + "Id_event = (CASE WHEN ? IS NULL THEN Id_event ELSE ? END) " + "WHERE Id = " + id;
		db.query(query, [Id_user, Id_user, Description, Description, Date, Date, Id_event, Id_event], (err, result, fields) => {
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
	app.delete('/notifications/:id', (req,res) => {
		var id = req.params.id;
		var query = "DELETE FROM notifications WHERE Id = " +id;
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