import React from "react";

const BookItem = ({ book }) => {
  return (
    <div className="">
      <li className=" list-unstyled ">
        {book.name} by {book.author} (ISBN: {book.isbn})
        {/* <span><button onClick={() => onEdit(book)}>Edit</button>
      <button onClick={() => onDelete(book.id)}>Delete</button> </span> */}
      </li>
    </div>
  );
};

export default BookItem;
