import React from "react";

export default function Form({ input, setInput, todos, setTodos }) {
  function inputHandler(e) {
    setInput(e.target.value);
    // console.log(e.target.value);
  }
  function submitHandler(e) {
    e.preventDefault();
    setTodos([...todos, { text: input, id: Math.random() * 1000 }]);
    setInput("");
  }

  return (
    <div className='form-page col'>
      <div className='heading-text row center'>
        <h1>Your To-do-list</h1>
      </div>
      <form className='row task-add-form'>
        <input value={input} type='text' onChange={inputHandler} />
        <button type='submit' onClick={submitHandler}>
          <i className='fa fa-plus fa-lg'></i>
        </button>
      </form>
    </div>
  );
}
