import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ChatbotPage.css';
import logo from "../assets/logo.png";
import Chatbot from 'react-simple-chatbot';
import * as tf from "@tensorflow/tfjs";
import { loadGraphModel } from "@tensorflow/tfjs-converter";

function VideoChatbotPage({ logout }) {
  const [emotion, setEmotion] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [showVideoInput, setShowVideoInput] = useState(false);
  const videoRef = React.useRef(null);
  const [botSteps, setBotSteps] = useState([
    {
      id: '1',
      message: 'Please allow camera and microphone access to continue.',
      trigger: '2',
    },
    {
      id: '2',
      component: (
        <div>
          <video id="video" width="400" height="300" autoPlay></video>
          <canvas id="canvas" width="400" height="300"></canvas>
        </div>
      ),
      trigger: '3',
      waitAction: true,
    },
    {
      id: '3',
      message: 'Analyzing your facial expression...',
      trigger: '4',
    },
    {
      id: '4',
      message: 'You seem {emotion}. Here are some songs that might make you feel better:',
      trigger: 'recommend-songs-list',
      delay: 1000,
    },
    {
      id: 'recommend-songs-list',
      component: (
        <iframe
          src="https://open.spotify.com/embed/playlist/3JmWmDFZk2mCKFJoHJQVyt"
          width="100%"
          height="380"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      ),
      end: true,
    },
  ]);

  useEffect(() => {
    async function setupCamera() {
      const video = document.getElementById('video');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      video.srcObject = stream;
      await video.play();
      setInterval(() => {
        predictEmotion(video);
      }, 1000);
    }

    async function predictEmotion(video) {
      const model = await loadGraphModel('/models/model.json');
      const canvas = document.getElementById('canvas');
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const tensor = tf.browser.fromPixels(canvas).expandDims(0).toFloat().div(tf.scalar(255));
      const predictions = await model.predict(tensor).data();
      const emotion = getEmotion(predictions);
      setEmotion(emotion);
      setBotSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        const recommendSongsStep = newSteps.find((step) => step.id === 'recommend-songs-list');
        recommendSongsStep.message = `You seem ${emotion}. Here are some songs that might make you feel better:`;
        return newSteps;
      });
    }

    setupCamera();
  }, []);

  function getEmotion(predictions) {
    const emotions = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise'];
    const index = predictions.indexOf(Math.max(...predictions));
    return emotions[index];
  }
  function handleVideoPermission() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        // Display the video stream in the UI
        const videoElement = document.getElementById('video-stream');
        videoElement.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing video stream:', error);
      });
  }
  
  return (
    <>
      <div className="app-header">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
          <h1 className="app-name">Music-Bot</h1>
        </div>
        <ul className="nav-links">
          <li><Link to="/chatbot">Home</Link></li>
          <li><Link to="/text-chatbot">Text Chatbot</Link></li>
          <li><Link to="/audio-chatbot">Audio Chatbot</Link></li>
        </ul>
        <div className="sign-out-container">
          <button className="sign-out-button" onClick={() => logout()}>Sign Out</button>
        </div>
      </div>
  
      <div className="chatbot-container">
        {showVideoInput ? (
          <div className="video-input-container">
            <h2 className="video-input-title">Allow access to your camera and microphone</h2>
            <div className="video-input-buttons">
              <button className="video-input-button" onClick={() => setShowVideoInput(false)}>Cancel</button>
              <button className="video-input-button" onClick={handleVideoPermission}>Allow</button>
            </div>
          </div>
        ) : (
          <div className="video-chatbot-container">
            <div className="video-feed-container">
              {showVideo ? (
                <video
                  className="video-feed"
                  ref={videoRef}
                  autoPlay
                  muted
                ></video>
              ) : (
                <button className="start-video-button" onClick={() => setShowVideoInput(true)}>Start Video Chat</button>
              )}
            </div>
            <div className="chatbot-feed-container">
              <Chatbot
                steps={botSteps}
                headerTitle="Music-Bot"
                placeholder="Type your message here..."
                emotion={emotion}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
  export default VideoChatbotPage;