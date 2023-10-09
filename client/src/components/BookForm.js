import React, { useEffect, useState } from "react";
import { createBook, updateBook } from "./api";

const BookForm = ({ selectedBook, onSave }) => {
  const [bookData, setBookData] = useState({ name: "", author: "", isbn: "" });

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
        body: JSON.stringify(bookData),
      };

      if (selectedBook) {
        await updateBook(selectedBook.id, requestOptions);
      } else {
        await createBook(requestOptions);
      }

      onSave();
      setBookData({ name: "", author: "", isbn: "" });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <h2>Add/Edit Books</h2>

      <form onSubmit={handleSubmit}>
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
