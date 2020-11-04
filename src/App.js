import React, { useEffect, useState } from "react";
import ToDo from "./components/To-do app";
import Form from "./components/Form";

import "./styles/app.scss";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);

  return (
    <div className='App'>
      <Form
        input={input}
        todos={todos}
        setTodos={setTodos}
        setInput={setInput}
      />
      <ToDo
        input={input}
        todos={todos}
        setTodos={setTodos}
        setInput={setInput}
      />
    </div>
  );
}

export default App;
