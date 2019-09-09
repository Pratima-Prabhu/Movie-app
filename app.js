var express=require("express");
var app=express();



app.use(express.static("public")); 

var request=require("request");
app.set("view engine","ejs");


app.get("/",function(req,res){
	res.render("search");
});

app.get("/results",function(req,res){
	var query=req.query.search;
	var url="http://www.omdbapi.com/?s="+query+"&apikey=thewdb";
	request(url,function(error,response,body){
		if(!error && response.statusCode==200){
			var data=JSON.parse(body);
			res.render("results",{data:data});
		}
	});
	
});


app.get("/results/:id",function(req,res){
	var query=req.query.id;
	var url="http://www.omdbapi.com/?i="+query+"&apikey=thewdb&Plot=full";
	request(url,function(error,response,body){
		if(!error && response.statusCode==200){
			var data=JSON.parse(body);
			res.render("show",{data:data});
		}
	});
	
});



app.listen(8081,()=>{
	console.log("Server Strated");
});
