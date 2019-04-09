module.exports = function(app, db) {
	//CREATE
  	app.post('/users_in_events', (req, res) => {
		var Id_user = req.body.Id_user;
		var Id_event = req.body.Id_event;
		var query = "INSERT INTO users_in_events (Id_user, Id_event) VALUES ('" + Id_user + "','" + Id_event + "')";
		var query2 = "SELECT COUNT(*) AS COUNT FROM users_in_events WHERE Id_event = " + Id_event;
		var query3 = "SELECT Nb_people FROM events WHERE Id = " + Id_event;
		var query4 = "UPDATE events SET Full=1 WHERE Id = " + Id_event;
		db.query(query3, (err3, result3, fields3) => {
			db.query(query2, (err2, result2, fields2) => {
			if (err3) {
				res.writeHead(404);
				res.end("Failed getting Nb_people");
			}
			if (err2) {
				res.writeHead(404);
				res.end("Failed count");
			}
			if(result2[0].COUNT <= result3[0].Nb_people){
				db.query(query, (err, result, fields) => {
			if (result2[0].COUNT >= result3[0].Nb_people)
			{
				db.query(query4, (err4, result4, fields4) => {
					if(err4) {
						res.writeHead(404);
						res.end("Failed udpdate to FULL");
					}
				})
			}
			if (err) {
				res.writeHead(404);
				res.end("Failed");
			}
			else {
				res.end("Insertion successful. Data inserted : " + JSON.stringify(result));
			}
				});
			}
			else {
				res.end("Already Full");
			}
			});
		});
	});


  	//READ
	app.get('/users_in_events', (req, res) => {     
		var query = "SELECT * FROM users_in_events";    
		var conditions = ["Id_user", "Id_event"]; 

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

app.get('/users_in_events/:id', (req, res) => {
		var id = req.params.id;     
		var query = "SELECT * FROM users_in_events WHERE Id = " +id;    
		var conditions = ["Id_user", "Id_event"];  

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

app.get('/users_in_events/users/:id', function(req, res) {     
    var id = req.params.id;
    var query = "SELECT * FROM events INNER JOIN users_in_events on events.Id=users_in_events.Id_event WHERE users_in_events.Id_user = " + id;    
    var conditions = ["Id_user", "Id_event"]; 
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
            res.end(JSON.stringify(result));
        }
    }); 

}); 

app.get('/users_in_events/events/:id', function(req, res) {     
    var id = req.params.id;
    var query = "SELECT * FROM users INNER JOIN users_in_events on users.Id=users_in_events.Id_user WHERE users_in_events.Id_event = " + id;    
    var conditions = ["Id_user", "Id_event"]; 

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
            res.end(JSON.stringify(result));
        }
    }); 

}); 

	//UPDATE
	//Roads for UPDATE (total and partial)
	app.put('/users_in_events/:id', (req,res) => {
		var id = req.params.id;
		var Id_user = req.body.Id_user;
		var Id_event = req.body.Id_event;
		var query = "UPDATE users_in_events SET " + "Id_user = (CASE WHEN ? IS NULL THEN Id_user ELSE ? END), " + "Id_event = (CASE WHEN ? IS NULL THEN Id_event ELSE ? END)" + "WHERE Id = " + id;
		db.query(query, [Id_user, Id_user, Id_event, Id_event], (err, result, fields) => {
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
	app.delete('/users_in_events/:id', (req,res) => {
		var id = req.params.id;
		var query = "DELETE FROM users_in_events WHERE Id = " +id;
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