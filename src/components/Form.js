import React from 'react'

export default function Form({input,setInput,todos,setTodos}) {
  function inputHandler(e){
    setInput(e.target.value);
    console.log(e.target.value);
  }
  function submitHandler(e){
    e.preventDefault();
    setTodos([
      ...todos,{text:input,id : Math.random()*1000}
    ]);
    setInput("");
  };

  return (
    <form>
      <input value={input}type="text" onChange={inputHandler}/>
      <button type="submit" onClick={submitHandler}>
      <i className="fa fa-plus"></i>
      </button>
    </form>
  )
}
