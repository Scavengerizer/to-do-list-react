import React, { useEffect, useRef } from "react";

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

  //Resizing

  // ctx.strokeRect(100, 100);
  // console.log(canvas);

  function deleteHandler() {
    setTodos(todos.filter((el) => el.id !== todo.id));
    // console.log(todo);
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

  // console.log(todo);
  useEffect(() => {
    let painting = false;
    const canvas = canvasRef.current;
    const resetbutton = resetRef.current;
    canvas.id = todo.id;
    // console.log(canvas);
    setCanvasID([...canvasID, { id: canvas.id }]);
    const ctx = canvas.getContext("2d");
    canvas.height = window.innerHeight / 10;
    canvas.width = window.innerWidth / 10;
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
    });
  }, []);

  return (
    <div className='todo col center'>
      <div className='todo-item todo-container'>
        <h3>{text}</h3>
        <div className='todo-buttons'>
          <button className='trash' onClick={deleteHandler}>
            <i className='fa fa-trash fa-sm'></i>
          </button>
        </div>
      </div>
      <div className='canvas-element col center'>
        <h5>Add your signature here</h5>
        <canvas ref={canvasRef}></canvas>
        <button className='check' ref={resetRef}>
          <i className='fa fa-check fa-sm'></i>
        </button>
      </div>
    </div>
  );
}
