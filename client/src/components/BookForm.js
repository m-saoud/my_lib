import React, { useEffect, useState } from "react";
import { createBook, updateBook } from "./api";
import { v4 as uuidv4 } from "uuid";

const BookForm = ({ selectedBook, onSave }) => {
  const [bookData, setBookData] = useState({
    book_id: "",
    name: "",
    author: "",
    isbn: "",
  });

  useEffect(() => {
    if (selectedBook) {
      setBookData(selectedBook);
    }
  }, [selectedBook]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestOptions = {
        method: selectedBook ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...bookData,
          book_id: selectedBook ? selectedBook.book_id : uuidv4(),
        }),
      };

      if (selectedBook) {
        await updateBook(selectedBook.book_id, requestOptions);
      } else {
        await createBook(requestOptions);
      }

      onSave();
      setBookData({ book_id: "", name: "", author: "", isbn: "" });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <h2>Add/Edit Books</h2>

      <form onSubmit={handleSubmit} className="d-flex">
        <input
          type="text"
          placeholder="Title"
          value={bookData.name}
          onChange={(e) => setBookData({ ...bookData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={bookData.author}
          onChange={(e) => setBookData({ ...bookData, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="ISBN"
          value={bookData.isbn}
          onChange={(e) => setBookData({ ...bookData, isbn: e.target.value })}
        />
        <button type="submit">{selectedBook ? "Edit Book" : "Add Book"}</button>
      </form>
    </div>
  );
};

export default BookForm;
