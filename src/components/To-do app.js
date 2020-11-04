import React from "react";
import Todo from "./Todo";

function ToDo({ input, setInput, todos, setTodos }) {
  return (
    <div className='todo-container'>
      <ul className='todo-list'>
        {todos.map((todo) => (
          <Todo text={todo.text} key={todo.id} />
        ))}
        {/* <Todo
          input={input}
          todos={todos}
          setTodos={setTodos}
          setInput={setInput}
        /> */}
      </ul>
    </div>
  );
}

export default ToDo;
