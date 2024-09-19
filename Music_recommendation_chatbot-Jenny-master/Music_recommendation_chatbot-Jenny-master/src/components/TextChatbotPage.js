import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ChatbotPage.css';
import logo from "../assets/logo.png";
import Chatbot from 'react-simple-chatbot';
import axios from 'axios';

function TextChatbotPage({ logout }) {
  const [emotion, setEmotion] = useState("");
  const [botSteps, setBotSteps] = useState([
    {
      id: '1',
      message: 'What is your name?',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Hi {previousValue}! How are you feeling today?',
      trigger: '4',
    },
    {
      id: '4',
      user: true,
      trigger: 'recommend-songs',
      validator: (value) => {
        // make a POST request to the Flask endpoint with the user's input
        axios.post('http://127.0.0.1:5000/predict-emotion', { text: value })
          .then((response) => {
            // set the emotion state based on the response from the Flask endpoint
            setEmotion(response.data.emotion);
          })
          .catch((error) => {
            console.log(error);
          });
        return true;
      }
    },
    {
      id: 'recommend-songs',
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

  return (
    <>
      <div className="app-header">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
          <h1 className="app-name">Music-Bot</h1>
        </div>
        <ul className="nav-links">
          <li><Link to="/chatbot">Home</Link></li>
          <li><Link to="/audio-chatbot">Audio Chatbot</Link></li>
          <li><Link to="/video-chatbot">Video Chatbot</Link></li>
        </ul>
        <div className="sign-out-container">
          <button className="sign-out-button" onClick={() => logout()}>Sign Out</button>
        </div>
      </div>

      <div className="chatbot-container">
        <Chatbot
          steps={botSteps}
          headerTitle="Music-Bot"
          placeholder="Type your message here..."
          emotion={emotion}
        />
      </div>
    </>
  );
}

export default TextChatbotPage;
