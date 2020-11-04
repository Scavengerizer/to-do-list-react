import React from "react";

export default function Todo({ text, input, setInput, todos, setTodos }) {
  return (
    <div className='todo'>
      <div className='row'>
        <h3>{text}</h3>
        <button>
          <i className='fa fa-check'></i>
        </button>
        <button>
          <i className='fa fa-trash'></i>
        </button>
      </div>
    </div>
  );
}
