const express = require("express");
const pool = require("./db");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

//Get all books
app.get("/books", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM public.books");
    const books = result.rows;
    res.json(books);
    return;
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "An error occurred while fetching books." });
  }
});

//get book by ID
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bookById = await pool.query("SELECT * FROM books WHERE id=$1", [id]);
    if (bookById.rows.length === 0) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json(bookById.rows[0]);
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the book by ID" });
  }
});

//post(ADD A NEW BOOKS)

app.post("/books", async (req, res) => {
  try {
    const { id, name, author, isbn } = req.body;
    const newBook = await pool.query(
      "INSERT INTO public.books (id, name, author, isbn) VALUES ($1, $2, $3, $4) RETURNING *",
      [id, name, author, isbn]
    );

    res.json(newBook.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//put *(MODIFY THE BOOK CONTENT by ID)
app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, author, isbn } = req.body;
    const updateBook = await pool.query(
      "UPDATE public.books SET name = $1, author = $2, isbn = $3 WHERE id = $4 RETURNING * ",
      [name, author, isbn, id]
    );
    if (updateBook.rows.length === 0) {
      res.status(404).json({ error: "Book not found" });
    } else {
      res.json(updateBook.rows[0]);
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the book" });
  }
});

//delete(DELETE THE BOOK)
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const delettBook = await pool.query("DELETE FROM books WHERE id=$1", [id]);
    if (delettBook.rowCount === 0) {
      res.status(404).json({ Error: "Book not found" });
    } else {
      res.json({ message: "Book deleted successfully" });
    }
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the book" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
