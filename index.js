/* eslint-disable comma-dangle */
/* eslint-disable no-tabs */
// dependencies
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
// config dotenv
dotenv.config();
// PORT
const PORT = process.env.PORT || 8080;

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
// verify jwt
const verifyJWT = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(201).json({ message: 'Unauthorized Access!!!' });
    }
    const token = authorization.split(' ')[1];
    try {
        const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = verifyToken;
        next();
    } catch (error) {
        console.log(error);
        res.status(201).json({ message: 'Unauthorized Access!!!' });
    }
};

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const allToys = client.db('Toy-Troppers').collection('AllToys');
        const blogs = client.db('Toy-Troppers').collection('Blogs');

        // jwt
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1d',
            });
            res.json({ token });
        });

        // for searching
        // const indexKeys = { name: 1 };
        // const indexOptions = { name: 'name' };
        // await allToys.createIndex(indexKeys, indexOptions);
        // all toys get route
        app.get('/all-toys', async (req, res) => {
            try {
                const page = Number(req.query.page) || 0;
                const perPage = Number(req.query.limit) || 19;
                const { category, searchQuery } = req.query;
                let query = {};
                if (category) {
                    query = { subCategory: category };
                }
                if (searchQuery) {
                    query.name = { $regex: searchQuery, $options: 'i' };
                }
                const allToysData = await allToys
                    .find(query)
                    .skip(page * perPage)
                    .limit(perPage)
                    .toArray();
                res.status(200).json({
                    success: true,
                    message: 'All Toys',
                    toys: allToysData,
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: 'Error occurs while get The all Toys',
                });
            }
        });

        // all toys length
        app.get('/toys-lengths', async (req, res) => {
            try {
                const results = await allToys.estimatedDocumentCount();
                res.status(200).json({
                    success: true,
                    message: 'All Toys Length',
                    results,
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: 'Error occurs while get The all Toys Length!',
                });
            }
        });

        // all blogs get route
        app.get('/blogs', async (req, res) => {
            try {
                const blogsData = await blogs.find().toArray();
                res.status(200).json({
                    success: true,
                    message: 'All Blogs',
                    blogsData,
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: 'Error occurs while get The all Blogs Data',
                });
            }
        });
        // all toys get route
        app.get('/my-toys', verifyJWT, async (req, res) => {
            try {
                const { sellerEmail, sortBy } = req.query;

                let sortOption = {};
                if (sortBy === 'asc') {
                    sortOption = { price: 1 };
                } else if (sortBy === 'desc') {
                    sortOption = { price: -1 };
                }
                const allToysData = await allToys.find({ sellerEmail }).sort(sortOption).toArray();
                res.status(200).json({
                    success: true,
                    message: `All Toys for ${sellerEmail}`,
                    toys: allToysData,
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: 'Error occurs while get The all Toys for Specific User!',
                });
            }
        });

        // single id fetching toy information
        app.get('/single-toys-details/:id', verifyJWT, async (req, res) => {
            try {
                const { id } = req.params;
                const singleToysData = await allToys.findOne({
                    _id: new ObjectId(id) || undefined,
                });
                res.status(200).json({
                    success: true,
                    message: 'Single Toy Details.',
                    toys: singleToysData,
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: 'Error occurs while get The Single Toy Details.',
                });
            }
        });

        // add toys
        app.post('/add-toys', verifyJWT, async (req, res) => {
            try {
                const toyData = req.body.data;
                const singleToyAddData = await allToys.insertOne(toyData);
                res.status(200).json({
                    success: true,
                    message: 'Single Toy Added Details.',
                    toys: singleToyAddData,
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: 'Error occurred while adding the single toy details.',
                });
            }
        });

        // single id update toy information
        app.patch('/update-toys-details', verifyJWT, async (req, res) => {
            try {
                const { id } = req.query;
                const updateDoc = {
                    $set: {
                        ...req.body.data,
                    },
                };
                const singleToysUpdateData = await allToys.updateOne(
                    { _id: new ObjectId(id) },
                    updateDoc
                );
                res.status(200).json({
                    success: true,
                    message: 'Single Toy Details.',
                    toys: singleToysUpdateData,
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: 'Error occurs while get The Single Toy Details.',
                });
            }
        });

        // single id delete toy information
        app.delete('/delete-toys-details', verifyJWT, async (req, res) => {
            try {
                const { id } = req.query;
                const singleToysDeleteData = await allToys.deleteOne({ _id: new ObjectId(id) });
                if (singleToysDeleteData.deletedCount === 1) {
                    res.status(200).json({
                        success: true,
                        message: 'Successfully deleted one document.',
                    });
                }
            } catch (error) {
                console.log(error);
                res.status(500).json({
                    success: false,
                    message: 'Error occurs while get The Single Toy Details.',
                });
            }
        });

        // Send a ping to confirm a successful connection
        // await client.db('admin').command({ ping: 1 });
        // console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

// listen the port
app.listen(PORT, () => {
    console.log('Server is running at PORT 8080');
});
