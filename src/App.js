import React, { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

// const canvas = document.getElementById("pongCanvas");
// const ctx = canvas.getContext("2d");
// const paddleWidth = 20;
// const paddleHeight = 15;
// const paddleY = canvas.height - paddleHeight - 10;
// const ballRadius = 20;


const detect = async () => {
  const input = document.getElementById("myImg");
  const detectionWithExpressions = await faceapi.detectSingleFace(input).withFaceExpressions()
  console.log(detectionWithExpressions);
  // Do something with the detected faces
};


function App() {
  // const [paddleX, setPaddleX] = useState((canvas.width - paddleWidth) / 2);
  // const [ballX, setBallX] = useState(canvas.width / 2);
  // const [ballY, setBallY] = useState(canvas.height / 2);
  // const [dx, setDx] = useState(2);
  // const [dy, setDy] = useState(-2);
  // const [gameStarted, setGameStarted] = useState(false);
  // const [gamePaused, setGamePaused] = useState(false);

  // const restartGame = () => {
  //   setGameStarted(true);
  //   setGamePaused(false);
  //   // Additional restart game logic
  // }

  // useEffect(() => {


  //   const drawPaddle = () => {
  //     ctx.beginPath();
  //     ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  //     ctx.fillStyle = "blue";
  //     ctx.fill();
  //     ctx.closePath();
  //   }

  //   const drawBall = () => {
  //     ctx.beginPath();
  //     ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  //     ctx.fillStyle = "red";
  //     ctx.fill();
  //     ctx.closePath();
  //   }

  //   const draw = () => {
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     drawPaddle();
  //     drawBall();

  //     if (gameStarted && !gamePaused) {
  //       if (ballX + dx > canvas.width - ballRadius || ballX + dx < ballRadius) {
  //         setDx(-dx);
  //       }

  //       if (ballY + dy < ballRadius) {
  //         setDy(-dy);
  //       } else if (ballY + dy > canvas.height - ballRadius) {
  //         if (ballX > paddleX && ballX < paddleX + paddleWidth) {
  //           setDy(-dy);
  //         } else {
  //           gameOver();
  //         }
  //       }

  //       setBallX(ballX + dx);
  //       setBallY(ballY + dy);
  //     }

  //     requestAnimationFrame(draw);
  //   }

  //   const gameOver = () => {
  //     setGameStarted(false);
  //     setGamePaused(true);
  //     // Additional game over logic
  //   }

  //   // Add event listeners and other initialization logic here

  //   draw();

  //   return () => {
  //     // Cleanup logic if needed
  //   };
  // }, [paddleX, ballX, ballY, dx, dy, gameStarted, gamePaused]);

  return (
    <div>
      {/* <p id="text">Welcome to You-Play-Eye-React</p>
      <button id="startButton" onClick={() => setGameStarted(true)}>Start Game</button>
      <canvas id="pongCanvas" width="1000" height="700"></canvas>
      <div id="gameOverMessage" style={{ display: gamePaused ? "block" : "none" }}>Game Over</div>
      <button id="restartButton" style={{ display: gamePaused ? "block" : "none" }} onClick={restartGame}>Restart Game</button> */}
           <img id="myImg" src="/baby-face.png" alt="Baby Face" />
      <button onClick={detect}>Detect</button>
    </div>
  );
}

export default App;
