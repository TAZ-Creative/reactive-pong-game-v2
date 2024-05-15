import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as faceapi from 'face-api.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
await faceapi.nets.ssdMobilenetv1.loadFromUri('/weights');
// await faceapi.nets.faceRecognitionNet.loadFromUri('/weights');
// await faceapi.nets.faceLandmark68Net.loadFromUri('/weights');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
