const apiUrl = "http://localhost:3000/books";

// Function to fetch books
const fetchBooks = async () => {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// Function to create a new book
const createBook = async (newBook) => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// Function to update a book
const updateBook = async (book_id, updatedBook) => {
  try {
    const response = await fetch(`${apiUrl}/${book_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook),
    });
    if (!response.ok) {
      throw new Error("Network *(put) response was not ok");
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

// Function to delete a book
const deleteBook = async (book_id) => {
  try {
    const response = await fetch(`${apiUrl}/${book_id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

export { fetchBooks, createBook, updateBook, deleteBook };
