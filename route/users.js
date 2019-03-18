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
		var query = "INSERT INTO users (Firstname, Lastname, Completename, Birthdate, Sex, Mail, Phone) VALUES ('" + Firstname + "','" + Lastname + "','" + Completename +"','" +Birthdate+"'," +Sex+",'" +Mail+ "','" + Phone +"')"; 
		db.query(query, (err, result, fields) => {
			if (err) {
				console.log("Insertion failed. Email already exists.");
				res.send(JSON.stringify("Failed. Email already exists."));
			}
			//else if (req.body.Mail === )
			else {
				console.log("Insertion successful. Data inserted : " + req.body.Mail);
				res.send(JSON.stringify("Success"));
			}
		});
	});


  	//READ
	app.get('/users', (req, res) => {     
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

	    db.query(query, (err, result, fields) => {         
	    	if (err) {
				res.send(JSON.stringify("Failed"));
			}
			else {
				res.send(JSON.stringify(result));
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
		var query = "UPDATE users SET " + "Firstname = (CASE WHEN ? IS NULL THEN Firstname ELSE ? END), " + "Lastname = (CASE WHEN ? IS NULL THEN Lastname ELSE ? END), " + "Completename = (CASE WHEN ? IS NULL THEN Completename ELSE ? END), " + "Birthdate = (CASE WHEN ? IS NULL THEN Birthdate ELSE ? END), " + "Sex = (CASE WHEN ? IS NULL THEN Sex ELSE ? END), " + "Mail = (CASE WHEN ? IS NULL THEN Mail ELSE ? END), " + "Phone = (CASE WHEN ? IS NULL THEN Phone ELSE ? END)" + "WHERE Id = " + id;
		db.query(query, [Firstname, Firstname, Lastname, Lastname, Completename, Completename, Birthdate, Birthdate, Sex, Sex, Mail, Mail, Phone, Phone], (err, result, fields) => {
			if (err) throw err;
			res.send(JSON.stringify("Success. Modification occured."));
		});
	});

	//DELETE
	app.delete('/users/:id', (req,res) => {
		var id = req.params.id;
		var query = "DELETE FROM users WHERE Id = " +id;
		db.query(query, (err, result, fields) => {
			if (err) {
				res.send(JSON.stringify("Failed"));
			}
			else {
				res.send(JSON.stringify("Success. Deletion occured."));
			}
		});
	});

};