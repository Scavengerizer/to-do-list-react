import React from "react";
import Todo from "./Todo";

function ToDo({ input, setInput, todos, setTodos, canvasID, setCanvasID }) {
  return (
    <div className='todo-container'>
      <ul className='todo-list'>
        {todos.map((todo) => (
          <Todo
            text={todo.text}
            key={todo.id}
            todo={todo}
            todos={todos}
            setTodos={setTodos}
            canvasID={canvasID}
            setCanvasID={setCanvasID}
          />
        ))}
      </ul>
    </div>
  );
}

export default ToDo;
