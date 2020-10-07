var express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const uri =  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nmyml.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


var app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res) => {

res.send('i am working')

})

const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const volunteerCollection = client.db("volunteer").collection("volunteer");
  const resisterCollection = client.db("volunteer").collection("resister");
 

    app.post('/addvolunteer',(req,res) =>{

    const volunteer = req.body;

    volunteerCollection.insertMany(volunteer)
      .then(result => {

        res.send(result.insertedCount);

      })

})

app.get('/volunteer' , (req,res) => {
  volunteerCollection.find({})
  .toArray((err,documents) => {

    res.send(documents)
  })


})
app.get('/volunteer/:title' , (req,res) => {
  volunteerCollection.find({title:req.params.title})
  .toArray((err,documents) => {

    res.send(documents)
  })


})
app.post('/resister',(req,res) =>{

  const resister = req.body;

  resisterCollection.insertOne(resister)
    .then(result => {

      res.send(result.insertedCount);

    })

})


});


app.listen(5000)