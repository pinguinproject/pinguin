module.exports = function(app, db) {
  app.post('/comments', (req, res) => {
		var Id_user = req.body.Id_user;
		var Id_event = req.body.Id_event;
		var Description = req.body.Description;
		var Date = req.body.Date;
		var query = "INSERT INTO comments (Id_user, Id_event, Description, Date) VALUES ('" + Id_user + "','" + Id_event + "','" + Description + "','" + Date "')"; 
		db.query(query, (err, result, fields) => {
			if (err) {
				console.log("Insertion failed.");
				res.writeHead(404);
				res.end("Failed");
			}
			//else if (req.body.Mail === )
			else {
				console.log("Insertion successful. Data inserted : " + req.body.Name);
				res.end("Insertion successful. Data inserted : " + req.body.Name);
			}
		});
  });


  //READ
	app.get('/comments', (req, res) => {     
		var query = "SELECT * FROM comments";    
		var conditions = ["Id", "Id_user", "Id_event", "Description", "Date"]; 

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
				console.log("Read failed.");
				res.writeHead(404);
				res.end("Read Failed");			
			}
			else {
				console.log("Read successful. Data : " + JSON.stringify(result));
				res.end("Read successful. Data : " + JSON.stringify(result));
			} 
	    }); 
	}); 


	//UPDATE
	app.put('/comments/:id', (req,res) => {
		var id = req.params.id;
		var Id_user = req.body.Id_user;
		var Id_event = req.body.Id_event;
		var Description = req.body.Description;
		var Date = req.body.Date;
		var query = "UPDATE comments SET " + "Id_user = (CASE WHEN ? IS NULL THEN Id_user ELSE ? END), " + "Id_event = (CASE WHEN ? IS NULL THEN Id_event ELSE ? END), " + "Description = (CASE WHEN ? IS NULL THEN Description ELSE ? END), " + "Date = (CASE WHEN ? IS NULL THEN Date ELSE ? END)" + "WHERE Id = " + id;
		db.query(query, [Id_user, Id_user, Id_event, Id_event, Description, Description, Date, Date], (err, result, fields) => {
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


	//DELETE
	app.delete('/comments/:id', (req,res) => {
		var id = req.params.id;
		var query = "DELETE FROM comments WHERE Id = " +id;
		db.query(query, (err, result, fields) => {
			if (err) {
				console.log("Delete failed.");
				res.writeHead(404);
				res.end("Delete Failed");
			}
			else {
				console.log("Delete successful. Data deleted : id = "+ req.params.id);
				res.end("Delete successful. Data deleted : id = "+ req.params.id);
			}
		});
	});
};