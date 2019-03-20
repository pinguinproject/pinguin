module.exports = function(app, db) {
  app.post('/nest', (req, res) => {
		var Name = req.body.Name;
		var query = "INSERT INTO nest (Name) VALUES ('" + Name + "')"; 
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
	app.get('/nest', (req, res) => {     
		var query = "SELECT * FROM nest";    
		var conditions = ["Name", "Id"]; 

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
	app.put('/nest/:id', (req,res) => {
		var id = req.params.id;
		var Name = req.body.Name;
		var query = "UPDATE nest SET " + "Name = ('" +Name+"') " + "WHERE Id = " + id;
		db.query(query, (err, result, fields) => {
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
	app.delete('/nest/:id', (req,res) => {
		var id = req.params.id;
		var query = "DELETE FROM nest WHERE Id = " +id;
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