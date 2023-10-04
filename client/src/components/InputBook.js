import React, { Fragment } from "react";

const InputBook = () => {
  return (
    <Fragment>
      <h1 className="text-center">MY LIBRARY</h1>
      <form className="d-flex ">
        <input type="text" className="form-control width "></input>
        <button className="btn btn-outline-secondary">Add</button>
      </form>
    </Fragment>
  );
};

export default InputBook;
