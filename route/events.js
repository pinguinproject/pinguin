module.exports = function(app, db) {
 app.post('/events', function(req,res) {
	var Date = req.body.Date;
	var Place = req.body.Place;
	var Id_nest = req.body.Id_nest;
	var Nb_people = req.body.Nb_people;
	var Full = req.body.Full;
	var Name = req.body.Name;
	var Description = req.body.Description;
	console.log( Date + "','" + Place + "','" + Id_nest +"','" + Nb_people + "','" + Full + "','" + Name + "','" + Description);
	var query = "INSERT INTO events (Date, Place, Id_nest, Nb_people, Full, Name, Description) VALUES ('" + Date + "','" + Place + "','" + Id_nest +"','" + Nb_people + "','" + Full + "','" + Name + "','" + Description + "')"; 
	db.query(query, function(err, result, fields) {
		if (err) {
			res.writeHead(404)
			res.end("Failed");
		}
		else {
			res.writeHead(200)
			res.end("Success");
		}
	});
});

//ROADS FOR READ 
//For events : ALL DATA 
app.get('/events', function(req, res) {     
	var query = "SELECT * FROM events";    
	var conditions = ["Date", "Place", "Id_nest", "Nb_people", "Full", "Name", "Description"]; 

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
			res.writeHead(200)
			res.end(JSON.stringify(result));
		} 
    }); 

});  

//ROADS FOR READ 
//For events : ONE DATA
app.get('/events/:id', function(req, res) {     
	var id = req.params.id;
	var query = "SELECT * FROM events WHERE Id = " +id;    
	var conditions = ["Date", "Place", "Id_nest", "Nb_people", "Full", "Name", "Description"]; 

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
			res.writeHead(200)
			res.end(JSON.stringify(result));
		}
    }); 

});  

//ROADS FOR DELETE
//In users table :
app.delete('/events/:id', function(req,res) {
	var id = req.params.id;
	var query = "DELETE FROM events WHERE Id = " +id;
	db.query(query, function(err, result, fields) {
		if (err) {
			res.writeHead(404)
			res.end("Failed");
		}
		else {
			res.writeHead(200)
			res.end("Success");
		}
	});
});
};