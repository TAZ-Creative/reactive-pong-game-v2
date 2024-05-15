import React, { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';

function Game() {
    const [gameStarted, setGameStarted] = useState(true);
    const [gamePaused, setGamePaused] = useState(false);
    const [ballSpeed, setBallSpeed] = useState(2); // Initial ball speed
    const [gameOverModalVisible, setGameOverModalVisible] = useState(false);
    const [capturedImages, setCapturedImages] = useState([]); 

    // Define different levels of ball speed
    const BALL_SPEEDS = {
        NORMAL: 1,
        FAST: 2,
        VERY_FAST: 3
    };

    // Function to start the game
    const startGame = () => {
        setGameStarted(true);
        // Start capturing images after 30 seconds
        setTimeout(captureImages, 30000);
    };

    // Function to restart the game
    const restartGame = () => {
        setGamePaused(false);
        setGameStarted(true);
    };

    useEffect(() => {
        if (gameStarted && !gamePaused) {
            // Game logic goes here...
            const canvas = document.getElementById("pongCanvas");
            const ctx = canvas.getContext("2d");
            const paddleWidth = 100;
            const paddleHeight = 10;
            let paddleX = (canvas.width - paddleWidth) / 2;
            let paddleY = canvas.height - paddleHeight - 10;
            const ballRadius = 10;
            let ballX = canvas.width / 2;
            let ballY = canvas.height / 2;
            let dx = 2;
            let dy = -2;

            // Adjust ball speed based on the selected level
            let speedMultiplier = 1;
            if (ballSpeed === BALL_SPEEDS.FAST) {
                speedMultiplier = 1.5;
            } else if (ballSpeed === BALL_SPEEDS.VERY_FAST) {
                speedMultiplier = 2;
            }

            const drawPaddle = () => {
                ctx.beginPath();
                ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
                ctx.fillStyle = "blue";
                ctx.fill();
                ctx.closePath();
            };

            const drawBall = () => {
                ctx.beginPath();
                ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
                ctx.fillStyle = "red";
                ctx.fill();
                ctx.closePath();
            };

            const draw = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawPaddle();
                drawBall();

                if (ballX + dx > canvas.width - ballRadius || ballX + dx < ballRadius) {
                    dx = -dx;
                }

                if (ballY + dy < ballRadius) {
                    dy = -dy;
                } else if (ballY + dy > canvas.height - ballRadius) {
                    if (ballX > paddleX && ballX < paddleX + paddleWidth) {
                        dy = -dy;
                    } else {
                        gameOver();
                    }
                }

                ballX += dx * speedMultiplier;
                ballY += dy * speedMultiplier;

                requestAnimationFrame(draw);
            };

            // const mouseMoveHandler = (e) => {
            //     const relativeX = e.clientX - canvas.offsetLeft;
            //     if (relativeX > 0 && relativeX < canvas.width) {
            //         paddleX = relativeX - paddleWidth / 2;
            //     }
            // };

            // document.addEventListener("mousemove", mouseMoveHandler);

            // const gameOver = () => {
            //     setGamePaused(true);
            //     document.removeEventListener("mousemove", mouseMoveHandler);
            // };

            const keyDownHandler = (e) => {
              if (e.key === "Right" || e.key === "ArrowRight") {
                  paddleX += 25;
                  if (paddleX + paddleWidth > canvas.width) {
                      paddleX = canvas.width - paddleWidth;
                  }
              } else if (e.key === "Left" || e.key === "ArrowLeft") {
                  paddleX -= 25;
                  if (paddleX < 0) {
                      paddleX = 0;
                  }
              }
          };

          document.addEventListener("keydown", keyDownHandler);

          const gameOver = () => {
              setGamePaused(true);
              document.removeEventListener("keydown", keyDownHandler);
          };

            draw();

            // Run detect function every 1 minute
            const intervalId = setInterval(detect, 60000);

            // Clear the interval when the game is over
            return () => clearInterval(intervalId);
        }
    }, [gameStarted, gamePaused, ballSpeed]);

    const captureImages = () => {
      // Access the user's camera
      navigator.mediaDevices.getUserMedia({ video: true })
          .then(stream => {
              // Create a video element to display the camera feed
              const video = document.createElement('video');
              video.srcObject = stream;
              video.autoplay = true;
              video.width = 640;
              video.height = 480;
              // Create a canvas element to capture images
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width = video.width;
              canvas.height = video.height;
              // Append the video element to the document body
              document.body.appendChild(video);
              // Capture images at intervals
              const intervalId = setInterval(() => {
                  // Draw the current video frame onto the canvas
                  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                  // Convert the canvas image to a data URL
                  const imageUrl = canvas.toDataURL('image/jpeg');
                  // Store the captured image in the state array
                  setCapturedImages(prevImages => [...prevImages, imageUrl]);
                  // Stop capturing images after 8 images are captured
                  if (capturedImages.length === 8) {
                      clearInterval(intervalId);
                      // Once all images are captured, call the detect function
                      detect();
                      // Remove the video element from the document body
                      document.body.removeChild(video);
                  }
              }, 5000); // Capture image every 5 seconds
          })
          .catch(error => {
              console.error('Error accessing camera:', error);
          });
  };

    const detect = async () => {
        // Face detection and emotion analysis logic...
        const input =  document.getElementById("myImg");
    
        await faceapi.nets.faceExpressionNet.loadFromUri('/weights');
        await faceapi.nets.faceLandmark68Net.loadFromUri('/weights');
        const detectionWithExpressions = await faceapi.detectSingleFace(input).withFaceExpressions();
        console.log(detectionWithExpressions.expressions);
       
        // Do something with the detected faces
    };

    return (
        <div className='game-page'>
            <div className="game-container">
                <canvas id="pongCanvas" width="700" height="400" style={{ display: 'block' }}></canvas>
                <button id="startButton" onClick={startGame} style={{ display: 'none' }}>Start Game</button>
                <div id="gameOverMessage" style={{ display: gamePaused ? "block" : "none" }}>Game Over</div>
                <button id="restartButton" style={{ display: gamePaused ? "block" : "none" }} onClick={restartGame}>Restart Game</button>
                <div className={`image-container ${gameStarted ? 'show' : 'hide'}`} >
                    <img id="myImg" src="/face-man.png" alt="Baby Face" />
                    <button id="detect" onClick={detect}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default Game;
