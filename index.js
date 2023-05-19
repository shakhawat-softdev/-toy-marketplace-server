const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;
//middleware
app.use(express.json());
app.use(cors());



//all collection
app.get('/', (req, res) => {
   res.send('Toy Marketplace Server is Running............')
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7lxiyyz.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
   serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
   }
});

async function run() {
   try {
      // Connect the client to the server	(optional starting in v4.7)
      client.connect();
      const database = client.db("toyDB").collection("toys")


      app.get('/dolls', async (req, res) => {
         const cursor = database.find()
         const result = await cursor.toArray()
         res.send(result);
      });

      //get specific item
      app.get('/dolls/:id', async (req, res) => {
         const id = req.params.id;
         const query = { _id: new ObjectId(id) }
         const user = await database.findOne(query, id);
         res.send(user)
      });

      //get Specific item by emeil
      app.get('/doll', async (req, res) => {
         console.log(req.query);
         let query = {};
         if (req.query?.email) {
            query = { email: req.query.email }
         }
         const result = await database.find(query).toArray();
         res.send(result)


      })


      //insert data
      app.post('/dolls', async (req, res) => {
         const newDoll = req.body;
         // console.log(newDoll);
         const result = await database.insertOne(newDoll)
         res.send(result)
      });

      //delete
      app.delete('/doll/:id', async (req, res) => {
         const id = req.params.id;
         console.log(id);
         const query = { _id: new ObjectId(id) }
         const result = await database.deleteOne(query)
         res.send(result)
      });



      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
   } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
   }
}
run().catch(console.dir);
app.listen(port, () => {
   console.log(`Toy Marketplace Server is Running on port ${port}`)
})