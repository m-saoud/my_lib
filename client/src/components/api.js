const apiUrl = "http://localhost:5000/books";

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
    throw error; // Rethrow the error to handle it outside the function
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
const updateBook = async (bookId, updatedBook) => {
  try {
    const response = await fetch(`${apiUrl}/${bookId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook),
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

// Function to delete a book
const deleteBook = async (bookId) => {
  try {
    const response = await fetch(`${apiUrl}/${bookId}`, {
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
