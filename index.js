var Express = require('express');
var Mongoclient = require('mongodb').MongoClient;
var cors = require('cors');
const multer = require('multer');
var app=Express();
app.use(cors.apply());


var CONNECTION_STRING = "mongodb+srv://patrickmperez22:noynoy@cluster0.wpig1cs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

var DATABASENAME = "MyDb";

//instantiate the mongodbclient
var database;

//create a listener
app.listen(5038, ()=>{
    Mongoclient.connect(CONNECTION_STRING, (error,client)=>{
        database=client.db(DATABASENAME);
        console.log(`Yay!`);
    })
})


//get all dbase data
app.get('/api/donate/GetDonate',(req, res) => {
    database.collection("donate").find({}).toArray((error,result)=>{
        res.send(result);
    })
})


app.post('/api/donate/AddDonate', multer().none(), async (req, res) => {
    try {
        const numOfDocs = await database.collection("donate").countDocuments();
        await database.collection("donate").insertOne({
            id: (numOfDocs + 1).toString(),
            name: req.body.name,
            message: req.body.message,
            donation: req.body.donation
        });
        res.json("Added Successfully");
    } catch (error) {
        console.error("Error adding donation:", error);
        res.status(500).json({ error: "Failed to add donation" });
    }
});




app.delete('/api/donate/DeleteDonate', (req, res)=>{
    database.collection("donate").deleteOne({
        id:req.query.id
    });
    res.json("Deleted successfully!");
})