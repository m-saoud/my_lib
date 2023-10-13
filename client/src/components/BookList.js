import React, { useEffect, useState } from "react";
import { fetchBooks, deleteBook } from "./api";
import BookForm from "./BookForm";
import BookItem from "./BookItem";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    // Fetch books when the component mounts
    fetchBooks()
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const handleEdit = (book) => {
    setSelectedBook(book);
  };

  const handleDelete = async (id) => {
    try {
      // Check if the book id is defined before attempting to delete
      if (id) {
        // Delete the book
        await deleteBook(id);
        // Remove the deleted book from the list
        setBooks(books.filter((book) => book.book_id !== id));
      } else {
        console.error("Book id is undefined or missing.");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div>
      <h2 className="my-4">Book List</h2>

      <ul className="list-group ">
        {books.map((book) => (
          <li
            key={book.book_id}
            className=" list-unstyled d-flex justify-content-center "
          >
            <BookItem
              book={book}
              onEdit={() => handleEdit(book)}
              onDelete={() => handleDelete(book.id)}
            />
            <button onClick={() => handleEdit(book)}>Edit1</button>
            <button onClick={() => handleDelete(book.book_id)}>Delete1</button>
          </li>
        ))}
      </ul>
      <BookForm
        selectedBook={selectedBook}
        onSave={() => {
          // Refresh the book list after adding/editing a book
          fetchBooks()
            .then((data) => setBooks(data))
            .catch((error) => console.error("Error fetching books:", error));
          setSelectedBook(null);
        }}
      />
    </div>
  );
};

export default BookList;
