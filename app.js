// jshint esversion6


const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const request = require("request");

const https = require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const FirstName = req.body.fName;
    const LastName = req.body.lName;
    const Email = req.body.Email;

    const data = {
        members:[
            {
                email_address:Email,
                status : "subscribed",
                merge_fields:{
                    FNAME : FirstName,
                    LNAME : LastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/3aa94a1caa";
    const options = {
        method : "POST",
        auth : "Bhanu19531:6bfc45c54e394257cc9473a005b4a701-us21"
    }
    const request = https.request(url,options,function(response){

        if(response.statusCode == 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonData);
    request.end();
});
app.post("/failure", function(req, res) {
    res.redirect("/");
  });
app.listen(process.env.PORT||3000,function(){
    console.log("Server is running on port 3000");
});



 //6bfc45c54e394257cc9473a005b4a701-us21 --  Authentication Key

 //3aa94a1caa -- Audience Key