import React from "react";

export default function Todo({ todo, text, input, setInput, todos, setTodos }) {
  function deleteHandler() {
    setTodos(todos.filter((el) => el.id !== todo.id));
    // console.log(todo);
  }
  return (
    <div className='todo'>
      <div className='row'>
        <input value={text} type='text' />
        <button>
          <i className='fa fa-check'></i>
        </button>
        <button onClick={deleteHandler}>
          <i className='fa fa-trash'></i>
        </button>
      </div>
    </div>
  );
}
