
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ExplainVerbosity } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// DB connection URI from .env
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

// ======= APIs ========================
// GET /api/words - paginated vocab list
app.get('/api/words', async (req, res) => {
    try {
      const page = parseInt(req.query.page);
      const limit = 18;
  
      if (isNaN(page) || page < 1) {
        return res.status(400).json({ error: "Invalid page number" });
      }
  
      await client.connect();
      const db = client.db("vocabBank");
      const collection = db.collection("words");
      const search = req.query.search || "";
const filter = search
  ? { word: { $regex: search, $options: "i" } }
  : {};
  
      const total = await collection.countDocuments();
      const totalPages = Math.ceil(total / limit);
  
      if (page > totalPages) {
        return res.status(404).json({ error: "Page not found" });
      }
  
      const skip = (page - 1) * limit;
    //   const words = await collection.find({}).skip(skip).limit(limit).toArray();
  
      const words = await collection.find(filter).skip(skip).limit(limit).toArray();
      res.json({ page, totalPages, totalWords: total, words });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    } finally {
      await client.close();
    }
  });
  
  // POST /api/words - add new vocabulary word
  app.post('/api/words/add', async (req,res) => {
    const {word, meaning, example} = req.body;

    // fields validation
    if(!word || !meaning || !example){
      return res.status(400).json({error:"All fields are required"});
    }

    try{
      await client.connect();
      const db = client.db("vocabBank");
      const collection = db.collection("words");

      const existingWord = await collection.findOne({word: word.toLowerCase().trim()});

      if(existingWord){
        return res.status(409).json({error:"Word already exists"});
      }

      // if not an existing word add it to the mongodb
      const newWord = {word: word.toLowerCase().trim(), meaning: meaning.trim(), example: example.trim()};
      const result = await collection.insertOne(newWord);

      res.status(201).json(newWord);

    }catch(e){
      console.error(e);
      res.status(500).json({ error: "Internal server error" });
    }finally{
      await client.close();
    }
  });

  
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  