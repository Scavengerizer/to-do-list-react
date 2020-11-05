import React, { useEffect, useRef } from "react";
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
  const [alarmSound] = useSound(alarm);

  function deleteHandler() {
    setTodos(todos.filter((el) => el.id !== todo.id));
  }
  function getDate(e) {
    setCanvasID(e.target.value);
  }
  function setDate(e) {
    e.preventDefault();
    var dateValue = document.querySelector('input[type="datetime-local"]');
    const alarmDate = new Date(dateValue.value).getTime();
    if (isNaN(alarmDate)) {
      alert("Invalid Date");
      return;
    }
    let diff = alarmDate - new Date().getTime();

    if (diff < 0) {
      alert("Specified time has already passed");
      return;
    }
    setTimeout(initAlarm, diff);
  }
  function initAlarm() {
    alarmSound();
  }

  const canvasRef = useRef(null);
  const resetRef = useRef(null);

  useEffect(() => {
    let painting = false;
    const canvas = canvasRef.current;
    const resetbutton = resetRef.current;

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
  }, []);

  return (
    <div className='todo col center'>
      <div className='todo-item todo-container'>
        <div className='task-texts col'>
          <h6>Task Name</h6>
          <h3>{text}</h3>
        </div>

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
          <button type='submit' id='alarm-btn' onClick={setDate}>
            Set Alarm
          </button>
        </div>
      </div>
      <div className='line'></div>
    </div>
  );
}
