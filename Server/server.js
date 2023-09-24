const express = require("express");
const { Client } = require("pg");
const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
app.use(bodyParser.json());

// Initialize your PostgreSQL connection pool
const client = new Client({
  connectionString:
    "host=localhost port=5433 dbname=my_lib user=postgres password=1391 sslmode=prefer connect_timeout=10",
});


// Connect to the PostgreSQL database
client.connect()
  .then(() => {
    console.log("Connected to PostgreSQL database");
  })
  .catch((err) => {
    console.error("Error connecting to PostgreSQL:", err);
  });
// Define your API routes here

// Get all books
app.get("/api/books", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM books");
    const books = result.rows;
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching books." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
