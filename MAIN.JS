const express = require('express')
const app = express();
var fs=require('fs');
const port = 3000;
var session = require('express-session');

app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: true,
	resave: true
}))

app.use(express.static("./static"));
app.use(express.json());

app.get('/', (req, res) => {
   
		if(req.session.isLoggedIn)
		{
			var currentUsername = req.session.userName;
			console.log(currentUsername);
			res.send(`<h1>Welcome ${currentUsername}</h1><script src='home.js'></script>`);

		}
		else
		{	
			fs.readFile('./static/login.html','utf-8',(err,data) =>
			{
				if(err)
					console.log("Error");
				else
				res.end(data);
			})
}
})

app.get('/login',(req,res)=>{
	
	if(req.session.isLoggedIn){
		res.redirect('/')
	}else{
		var currentUsername = req.session.userName;
			res.send(`<h1>Welcome ${currentUsername}</h1><script src='home.js'></script>`);
	}
})

app.post('/saveData',(req,res) => {

	var xname=req.body.userName;
	var pass=req.body.password;
  var userData=[];
  var matched=false;
	fs.readFile("./users.txt","utf-8", function(err, data){
		
		if(err){
			res.status = 404
			res.end('error')
		}else{
			
			if(data.length>0)
		{
			  userData=JSON.parse(data);
				for(var i=0;i<userData.length;i++)
			{
				if(xname === userData[i].useName)
					{
						matched=true;
						res.end('User already exists');
					}	
			}
		}
		}
	
   if(!matched)
		{userData.push({
			userName : xname,
			password : pass
		});
		console.log(userData);

		fs.writeFile("./users.txt",JSON.stringify(userData), function(err)
					{
						if(err)
						{
							res.end("Error Occured");
						}
						else
						{
							console.log("Data Saved");
							res.end();
						}
					})
	}
	})


})

app.post('/login',(req,res) =>
{
	var name=req.body.useName;
	var pass=req.body.password;

		fs.readFile("./users.txt",'utf-8',(err,data) =>
	{
		if(err)
			{
				res.status = 404;
				res.end('error');
			}
		else
		{   if(data.length>0)
				{		var userData=JSON.parse(data);
						console.log(userData);
						
						if(userData.length>0)
						{
							var match= x();
							function x()
							{
									for(var i=0;i<userData.length;i++)
								{
									if(name == userData[i].useName && pass == userData[i].password)
										return i;
								}
								return -1;
							}
							if(match!=-1)
							{
								req.session.isLoggedIn = true;
								req.session.userName = userData[match].userName;
								console.log(userData[match].userName);
								res.status(200)
								res.end("true");
							}
							else
							{
								res.status(404);
								res.end("Wrong info");
							}
						}
		}
		else
		{
			res.status(404);
			res.end("Signup first");
		}
		}
	})
	

})

app.get("/logout",(req,res) => 
{
	req.session.destroy();
	res.send('logout success')
})

app.listen(port, () => {
	console.log(`App is Live at http://localhost:${port}`)
})

