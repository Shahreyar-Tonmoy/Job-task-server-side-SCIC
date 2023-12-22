const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const app = express()
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g0ipecx.mongodb.net/?retryWrites=true&w=majority`;

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g0ipecx.mongodb.net/?retryWrites=true&w=majority`;



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

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const TaskCollaction = client.db("Task-Server").collection('newTask')
        // const MyCartCollaction = client.db("Adidas").collection('mycart')

        // app.get('/product', async (req, res) => {
        //     const cursor = productCollaction.find()
        //     const result = await cursor.toArray()
        //     res.send(result)
        // })



        app.get('/newTask', async (req, res) => {
            const cursor = TaskCollaction.find()
            const result = await cursor.toArray()
            res.send(result)
        })






        app.post('/newTask', async (req, res) => {
            const addProduct = req.body
            console.log(addProduct);
            const result = await TaskCollaction.insertOne(addProduct)
            res.send(result)
        })





        // app.get('/mycart/:id' , async (req, res) => {
        //     const id = req.params.id
        //     const query = { _id: new ObjectId(id) }
        //     const result = await MyCartCollaction.findOne(query)
        //     res.send(result)

        // })



        app.delete('/newTask/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await TaskCollaction.deleteOne(query)
            res.send(result)
        })
        app.delete('/newTaskOngoing/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await TaskCollaction.deleteOne(query)
            res.send(result)
        })
        app.delete('/newTaskCompleted/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await TaskCollaction.deleteOne(query)
            res.send(result)
        })

        // post opciton
        // app.post('/product' , async (req, res) => {
        //     const addProduct = req.body
        //     console.log(addProduct);
        //     const result = await productCollaction.insertOne(addProduct)
        //     res.send(result)
        // })


        // update opction

        app.put('/newTaskUpdate/:id', async (req, res) => {
            const id = req.params.id
            console.log(id);
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true }
            const UpdateProduct = req.body
            console.log(UpdateProduct)

            const Updates = {
                $set: {

                    status: UpdateProduct.status
                }
            }
            const result = await TaskCollaction.updateOne(filter, Updates, options)
            res.send(result)
        })
        app.put('/Update/:id', async (req, res) => {
            const id = req.params.id
            console.log(id);
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true }
            const UpdateProduct = req.body
            console.log(UpdateProduct)

            const Updates = {
                $set: {

                    status: UpdateProduct.status
                }
            }
            const result = await TaskCollaction.updateOne(filter, Updates, options)
            res.send(result)
        })

        app.put('/newTaskUpdate/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true }
            const UpdateProduct = req.body
            console.log(UpdateProduct)
            const Updates = {
                $set: {
                    titles: UpdateProduct.titles,
                    deadlines: UpdateProduct.deadlines,
                    priority: UpdateProduct.priority,
                    descriptions: UpdateProduct.descriptions,

                }
            }
            const result = await TaskCollaction.updateOne(filter, Updates, options)
            res.send(result)
        })





    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("Task Triumph server is running")
})

app.listen(port, () => {
    console.log(`Task Triumph server is running on port : ${port}`);
})