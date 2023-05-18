/* eslint-disable no-tabs */
// dependencies
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { MongoClient, ServerApiVersion } from 'mongodb';

// config dotenv
dotenv.config();

// app initialization
const app = express();

// initialize middleware
app.use(express.json());
app.use(cors());

// set up the default route and health routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello From Toy-Troppers Server, developed by Ujjal Kumar Roy',
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'This server Health is now 100%' });
});

// mongoDB setUP and Routes
const uri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.zzrczzq.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const allToys = client.db('Toy-Troppers').collection('AllToys');

        // all toys get route
        app.get('/all-toys', async (req, res) => {
            try {
                const { category } = req.query;
                let query = {};
                if (category) {
                    query = { subCategory: category };
                }
                const allToysData = await allToys.find(query).toArray();
                res.status(200).json({
                    success: true,
                    message: 'All Toys',
                    toys: allToysData,
                });
            } catch (error) {
                console.log(error);
                res.status(404).json({
                    success: false,
                    message: 'Error occurs while get The all Toys',
                });
            }
        });

        // Send a ping to confirm a successful connection
        await client.db('admin').command({ ping: 1 });
        console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

// PORT and listen the app
const PORT = process.env.PORT || 8080;

// listen the port
app.listen(PORT, () => {
    console.log('Server is running at PORT 8080');
});
