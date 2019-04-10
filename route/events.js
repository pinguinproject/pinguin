module.exports = function(app, db) {
 app.get('/events/post/:Date/:Place/:Id_nest/:Nb_people/:Full/:Name/:Description/:Id_creator', function(req,res) {
	var Date = req.params.Date;
	var Place = req.params.Place;
	var Id_nest = req.params.Id_nest;
	var Nb_people = req.params.Nb_people;
	var Full = req.params.Full;
	var Name = req.params.Name;
	var Description = req.params.Description;
    var Id_creator = req.params.Id_creator;
	var query = "INSERT INTO events (Date, Place, Id_nest, Nb_people, Full, Name, Description, Id_creator) VALUES ('" + Date + "','" + Place + "','" + Id_nest +"','" + Nb_people + "','" + Full + "','" + Name + "','" + Description + "','" + Id_creator + "')"; 
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
//For events : ALL DATA 
app.get('/events', function(req, res) {     
	var query = "SELECT * FROM events";   
	var conditions = ["Date", "Place", "Id_nest", "Nb_people", "Full", "Name", "Description", "Id_creator"]; 

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
    if ("like" in req.query) {
                query += " WHERE Name" + " LIKE '%" + req.query["like"] + "%'";
        }
    db.query(query, function(err, result, fields) {         
    	if (err) {
			res.writeHead(404)
			res.end("Failed");
		}
		else {
			res.end("{ \"events\" : " + JSON.stringify(result) + "}");
		} 
    }); 

});
app.get('/events/filter/:filter', function(req, res) {     
    var filter = req.params.filter;
    var query = "SELECT * FROM events";
    var query2 = "SELECT * FROM nests WHERE Name = " + filter;    
    var conditions = ["Date", "Place", "Id_nest", "Nb_people", "Full", "Name", "Description", "Id_creator"]; 

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
    db.query(query2, (err2, result2, fields2) => {
        query += " WHERE Id_nest = " + result2[0].Id;
    db.query(query, (err, result, fields) => {         
        if (err) {
            res.writeHead(404)
            res.end("Failed");
        }
        else {
            res.end("{ \"events\" : " + JSON.stringify(result) + "}");
        } 
    }); 
 });
});
 
//ROADS FOR READ 
//For events : ONE DATA
app.get('/events/:id', function(req, res) {     
	var id = req.params.id;
	var query = "SELECT * FROM events WHERE Id = " + id;
    var query2 = "SELECT COUNT(*) AS COUNT FROM users_in_events WHERE Id_event = " + id;    
	var conditions = ["Date", "Place", "Id_nest", "Nb_people", "Full", "Name", "Description", "Id_creator"]; 

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
    db.query(query2, function(err2, result2, fields2) {     
        db.query(query, function(err, result, fields) {         
          if (err2) {
             res.writeHead(404)
             res.end("Failed COUNT");
          }
          result[0].COUNT = result2[0].COUNT;
    	  if (err) {
			 res.writeHead(404)
			 res.end("Failed");
		  }
		  else {
			 res.end("{ \"events\" : " + JSON.stringify(result) + "}");
		  }
        }); 
    });
});

app.get('/events/nests/:id_nest', function(req, res) {     
    var Id_nest = req.params.id_nest;
    var query = "SELECT * FROM events WHERE Id_nest = " + Id_nest;    
    var conditions = ["Date", "Place", "Id_nest", "Nb_people", "Full", "Name", "Description", "Id_creator"]; 

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
            res.end("{ \"events\" : " + JSON.stringify(result) + "}");
        }
    }); 

});   

app.get('/events/users/:id_creator', function(req, res) {     
    var Id_creator = req.params.id_creator;
    var query = "SELECT * FROM events WHERE Id_creator = " + Id_creator;    
    var conditions = ["Date", "Place", "Id_nest", "Nb_people", "Full", "Name", "Description", "Id_creator"]; 

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
            res.end("{ \"events\" : " + JSON.stringify(result) + "}");
        }
    }); 

});   

//UPDATE
    app.get('/events/put/:id/:Date/:Place/:Id_nest/:Nb_people/:Full/:Name/:Description/:Id_creator', (req,res) => {
        var id = req.params.id;
        var Date = req.params.Date;
        var Place = req.params.Place;
        var Id_nest = req.params.Id_nest;
        var Nb_people = req.params.Nb_people;
        var Full = req.params.Full;
        var Name = req.params.Name;
        var Description = req.params.Description;
        var Id_creator = req.params.Id_creator;
        var query = "UPDATE events SET " + "Date = (CASE WHEN ? IS NULL THEN Date ELSE ? END), " + "Place = (CASE WHEN ? IS NULL THEN Place ELSE ? END), " + "Id_nest = (CASE WHEN ? IS NULL THEN Id_nest ELSE ? END), " + "Nb_people = (CASE WHEN ? IS NULL THEN Nb_people ELSE ? END), " + "Full = (CASE WHEN ? IS NULL THEN Full ELSE ? END), " + "Name = (CASE WHEN ? IS NULL THEN Name ELSE ? END), " + "Description = (CASE WHEN ? IS NULL THEN Description ELSE ? END), " + "Id_creator = (CASE WHEN ? IS NULL THEN Id_creator ELSE ? END)" + "WHERE Id = " + id;
        db.query(query, [Date, Date, Place, Place, Id_nest, Id_nest, Nb_people, Nb_people, Full, Full, Name, Name, Description, Description, Id_creator, Id_creator], (err, result, fields) => {
            if (err) {
                res.writeHead(404);
                res.end("Update Failed");           
            }
            else {
                res.end("Update successful. Data updated : id ="+ req.params.id);
            } 
        });
    });

//ROADS FOR DELETE
//In users table :
app.get('/events/delete/:id', function(req,res) {
	var id = req.params.id;
	var query = "DELETE FROM events WHERE Id = " +id;
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