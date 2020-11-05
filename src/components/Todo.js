import React, { useEffect, useRef } from "react";
// import ReactNotification from "react-notifications-component";
// import "react-notifications-component/dist/theme.css";
// import { store } from "react-notifications-component";
import useSound from "use-sound";
import alarm from "../alarm.mp3";

export default function Todo({
  todo,
  text,
  input,
  setInput,
  todos,
  setTodos,
  canvasID,
  setCanvasID,
}) {
  // let canvas = document.querySelector("#canvas");
  // const ctx = canvas.getContext("2d");

  // const greenNotif = ()=>{
  //   store.addNotification({
  //     title: "Wonderful!",
  //     message: "teodosii@react-notifications-component",
  //     type: "success",
  //     insert: "top",
  //     container: "top-right",
  //     animationIn: ["animate__animated", "animate__fadeIn"],
  //     animationOut: ["animate__animated", "animate__fadeOut"],
  //     dismiss: {
  //       duration: 5000,
  //       onScreen: true,
  //     },
  //   });
  // }

  //Resizing
  const [alarmSound] = useSound(alarm);
  // ctx.strokeRect(100, 100);
  // console.log(canvas);

  function deleteHandler() {
    setTodos(todos.filter((el) => el.id !== todo.id));
    // console.log(todo);
  }
  function getDate(e) {
    setCanvasID(e.target.value);
  }
  function setDate(e) {
    e.preventDefault();
    var dateValue = document.querySelector('input[type="datetime-local"]');
    const alarmDate = new Date(dateValue.value).getTime();
    // console.log(alarmDate);
    if (isNaN(alarmDate)) {
      alert("Invalid Date");
      return;
    }
    let diff = alarmDate - new Date().getTime();
    // console.log(diff);
    if (diff < 0) {
      alert("Specified time has already passed");
      return;
    }
    setTimeout(initAlarm, diff);
  }
  function initAlarm() {
    alarmSound();
  }

  // function resetCanvas() {
  //   canvasID.map((el) => {
  //     if (canvasID.id === el.id) {
  //       context.clearRect(0, 0, canvas.width, canvas.height);
  //     }
  //   });
  // }

  // context.clearRect(0, 0, canvas.width, canvas.height);

  // function checker() {
  //   const canvas = document.querySelector("#canvas");
  //   console.log(canvas);
  //   // console.log(todo);
  // }

  const canvasRef = useRef(null);
  const resetRef = useRef(null);
  // const setAlarmRef = useRef(null);
  // const dateRef = useRef(null);

  // console.log(todo);
  useEffect(() => {
    let painting = false;
    const canvas = canvasRef.current;
    const resetbutton = resetRef.current;
    // const savebutton = saveRef.current;
    // canvas.id = todo.id;
    // console.log(canvas);
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight / 10;
    canvas.width = window.innerWidth / 10;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", finishedPosition);
    canvas.addEventListener("mousemove", draw);

    function startPosition(e) {
      painting = true;
      draw(e);
    }

    function finishedPosition() {
      painting = false;
      ctx.beginPath();
    }

    function draw(e) {
      if (!painting) return;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";

      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    }
    resetbutton.addEventListener("click", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
    // savebutton.addEventListener("click", () => {
    //   ctx.save();
    //   // setCanvasID((canvasID) => !canvasID);
    //   // console.log(canvasID);
    // });
  }, []);

  // useEffect(() => {
  //   e.preventDefault();
  //   const alarmDate = dateRef.current.valueAsNumber;
  //   const alarmButton = setAlarmRef.current;

  //   alarmButton.addEventListener("click", () => {
  //     // if (isNaN(alarmDate)) {
  //     //   alert("Invalid Date");
  //     //   return;
  //     // }
  //     // let alarm = new Date(alarmDate);
  //     // let alarmtime = new Date(
  //     //   alarm.getUTCFullYear(),
  //     //   alarm.getUTCFullMonth(),
  //     //   alarm.getUTCDate(),
  //     //   alarm.getUTCMinutes(),
  //     //   alarm.getUTCSeconds()
  //     // );
  //   });
  // }, []);

  return (
    <div className='todo col center'>
      {/* <ReactNotification /> */}
      <div className='todo-item todo-container'>
        <h3>{text}</h3>
        <div className='todo-buttons'>
          <button className='trash' onClick={deleteHandler}>
            <i className='fa fa-trash fa-sm'></i>
          </button>
        </div>
      </div>
      <div className='canvas_and_date row'>
        <div className='canvas-element col center'>
          <h5>Add your signature here</h5>

          <canvas ref={canvasRef}></canvas>
          <div className='canvas-btns'>
            <button className='repeat' ref={resetRef}>
              <i className='fa fa-repeat' aria-hidden='true'></i>
            </button>
          </div>
        </div>
        <div className='time-input col center'>
          <h5>Enter alarm time</h5>
          <input
            value={canvasID}
            type='datetime-local'
            onChange={getDate}
            placeholder='yyyy-mm-ddThh:mm'
          />
          <button type='submit' onClick={setDate}>
            Set Alarm
          </button>
        </div>
      </div>
    </div>
  );
}
