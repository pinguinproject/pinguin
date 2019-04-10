module.exports = function(app, db) {
	//CREATE
  	app.post('/users', (req, res) => {
		var Firstname = req.body.Firstname;
		var Lastname = req.body.Lastname;
		var Completename = req.body.Completename;
		var Birthdate = req.body.Birthdate;
		var Sex = req.body.Sex;
		var Mail = req.body.Mail;
		var Phone = req.body.Phone;
		var Rights = req.body.Rights;
		var Password = req.body.Password;
		var Description = req.body.Description;
		var Address = req.body.Address;
		var query = "INSERT INTO users (Firstname, Lastname, Completename, Birthdate, Sex, Mail, Phone, Rights, Password, Description, Address) VALUES ('" + Firstname + "','" + Lastname + "','" + Completename + "','" +Birthdate+"'," +Sex+",'" +Mail+ "','" + Phone +"','"+Rights+"','" +Password+ "','" + Description + "','" + Address + "')"; 
		db.query(query, (err, result, fields) => {
			if (req.body.Rights !== "admin" && req.body.Rights !== "user") {
				res.writeHead(404);
				res.end("Insertion failed. Rights field must be user or admin");
			}
			else if (err) {
				res.writeHead(404);
				res.end("Failed");
			}
			else {
				res.end("Insertion successful. Data inserted : " + JSON.stringify(result));
			}
		});
	});


  	//READ
	app.get('/users', (req, res) => {     
		var query = "SELECT * FROM users";    
		var conditions = ["Firstname", "Lastname", "Completename", "Birthdate", "Sex", "Mail", "Phone", "Id", "Rights", "Password", "Description", "Address"]; 

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
				res.end("{ \"users\" : " + JSON.stringify(result) + "}");
			} 
	    }); 
	}); 

app.get('/users/:id', (req, res) => {
		var id = req.params.id;     
		var query = "SELECT * FROM users WHERE Id = " +id;    
		var conditions = ["Firstname", "Lastname", "Completename", "Birthdate", "Sex", "Mail", "Phone", "Id", "Rights", "Password", "Description", "Address"]; 
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
				res.end("Read successful. Data : " + JSON.stringify(result));
			} 
	    }); 
	}); 

	//UPDATE
	//Roads for UPDATE (total and partial)
	app.put('/users/:id', (req,res) => {
		var id = req.params.id;
		var Firstname = req.body.Firstname;
		var Lastname = req.body.Lastname;
		var Completename = req.body.Completename;
		var Birthdate = req.body.Birthdate;
		var Sex = req.body.Sex;
		var Mail = req.body.Mail;
		var Phone = req.body.Phone;
		var Rights = req.body.Rights;
		var Password = req.body.Password;
		var Description = req.body.Description;
		var Address = req.body.Address;
		var query = "UPDATE users SET " + "Firstname = (CASE WHEN ? IS NULL THEN Firstname ELSE ? END), " + "Lastname = (CASE WHEN ? IS NULL THEN Lastname ELSE ? END), " + "Completename = (CASE WHEN ? IS NULL THEN Completename ELSE ? END), " + "Birthdate = (CASE WHEN ? IS NULL THEN Birthdate ELSE ? END), " + "Sex = (CASE WHEN ? IS NULL THEN Sex ELSE ? END), " + "Mail = (CASE WHEN ? IS NULL THEN Mail ELSE ? END), " + "Phone = (CASE WHEN ? IS NULL THEN Phone ELSE ? END), " + "Rights = (CASE WHEN ? IS NULL THEN Rights ELSE ? END), " + "Password = (CASE WHEN ? IS NULL THEN Password ELSE ? END), " + "Description = (CASE WHEN ? IS NULL THEN Description ELSE ? END), " + "Address = (CASE WHEN ? IS NULL THEN Address ELSE ? END)" + "WHERE Id = " + id;
		db.query(query, [Firstname, Firstname, Lastname, Lastname, Completename, Completename, Birthdate, Birthdate, Sex, Sex, Mail, Mail, Phone, Phone, Rights, Rights, Password, Password, Description, Description, Address, Address], (err, result, fields) => {
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
	app.delete('/users/:id', (req,res) => {
		var id = req.params.id;
		var query = "DELETE FROM users WHERE Id = " +id;
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