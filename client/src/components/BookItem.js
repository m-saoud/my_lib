import React from 'react'

const BookItem = ({ book, onEdit, onDelete }) => {
  return (
    <div>
      <ul><li>
      {book.name} by {book.author} (ISBN: {book.isbn})
      <span><button onClick={() => onEdit(book)}>Edit</button>
      <button onClick={() => onDelete(book.id)}>Delete</button> </span>
    </li></ul>
       
    </div>
  )
}

export default BookItem
