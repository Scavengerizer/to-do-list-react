import React from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";

export default function Form({ input, setInput, todos, setTodos }) {
  const greenNotif = () => {
    store.addNotification({
      title: "Task Added Successfully",
      message: "Add your signature and set an Alarm",
      type: "green",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };
  const redNotif = () => {
    store.addNotification({
      title: "Task field is Empty",
      message: "Add a valid task name to set task",
      type: "red",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };

  function inputHandler(e) {
    setInput(e.target.value);
    // console.log(e.target.value);
  }
  function submitHandler(e) {
    e.preventDefault();
    if (input === "") {
      redNotif();
      return;
    }
    greenNotif();
    setTodos([...todos, { text: input, id: Math.random() * 1000 }]);
    setInput("");
  }

  return (
    <div className='form-page col'>
      <ReactNotification
        types={[
          {
            htmlClasses: ["notification-red"],
            name: "red",
          },
          {
            htmlClasses: ["notification-green"],
            name: "green",
          },
        ]}
      />

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
