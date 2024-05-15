


function App() {
  const [gameStarted, setGameStarted] = useState(true);
  const [gamePaused, setGamePaused] = useState(false);
  const [ballSpeed, setBallSpeed] = useState(2); // Initial ball speed

  const startGame = () => {
    setGameStarted(true);
  };

  const restartGame = () => {
    setGamePaused(false);
    setGameStarted(true);
  };

  const detect = async () => {
    const input =  document.getElementById("myImg");

    await faceapi.nets.faceExpressionNet.loadFromUri('/weights');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/weights');

    const detectionWithExpressions = await faceapi.detectSingleFace(input).withFaceExpressions();
    const detectionsWithLandmarks = await faceapi.detectAllFaces(input).withFaceLandmarks()
    console.log(detectionWithExpressions);
    console.log(detectionsWithLandmarks);
    // Do something with the detected faces
  };

  useEffect(() => {
    if (gameStarted && !gamePaused) {
     
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

        ballX += dx;
        ballY += dy;

        requestAnimationFrame(draw);
      };

      const mouseMoveHandler = (e) => {
        const relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
          paddleX = relativeX - paddleWidth / 2;
        }
      };

      document.addEventListener("mousemove", mouseMoveHandler);

      const gameOver = () => {
        setGamePaused(true);
        document.removeEventListener("mousemove", mouseMoveHandler);
      };

      draw();
    }
  }, [gameStarted, gamePaused]);

  return (
    <div style={{ display: 'flex' }}>
      <div className="game-container">
        <canvas id="pongCanvas" width="700" height="400" style={{ display: 'block' }}></canvas>
        <button id="startButton" onClick={startGame} style={{ display: 'none' }}>Start Game</button>
        <div id="gameOverMessage" style={{ display: gamePaused ? "block" : "none" }}>Game Over</div>
        <button id="restartButton" style={{ display: gamePaused ? "block" : "none" }} onClick={restartGame}>Restart Game</button>
        <div className={`image-container ${gameStarted ? 'show' : 'hide'}`} >
          <img id="myImg" src="/face-man.png" alt="Baby Face" />
          <button onClick={detect}>Detect</button>
        </div>
      </div>
    </div>
  );
}
