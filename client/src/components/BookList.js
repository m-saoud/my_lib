import React, { useEffect, useState } from "react";
import { fetchBooks, deleteBook } from "./api"; // Import the fetchBooks and deleteBook functions
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
      // Delete the book
      await deleteBook(id);
      // Remove the deleted book from the list
      setBooks(books.filter((book) => book.id !== id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <BookItem
              book={book}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
           {/* <span><button onClick={() => handleEdit(book)}>Edit1</button>
            <button onClick={() => handleDelete(book.id)}>Delete1</button></span>  */}
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
          // Reset the selectedBook state
          setSelectedBook(null);
        }}
      />
    </div>
  );
};

export default BookList;
