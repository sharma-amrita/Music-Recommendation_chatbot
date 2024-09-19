import React from 'react';
import { Link } from 'react-router-dom';
import './ChatbotPage.css';
import logo from '../assets/mod.png';
import animation from '../assets/music-listener.gif';

function ChatbotPage({ logout }) {
  return (
    <>
      <div className="app-header">
        <div className="logo-container">
          <img src={logo} alt="Logo" />
        </div>
        <ul className="nav-links">
          <li>
            <Link to="http://127.0.0.1:5000/">Text Chatbot</Link>
          </li>
          <li>
            <a href="http://127.0.0.1:5002/">Audio Chatbot</a>
          </li>
          <li>
            <Link to="http://127.0.0.1:5001/">Video Chatbot</Link>
          </li>
        </ul>
        <div className="sign-out-container">
          <button className="sign-out-button" onClick={() => logout()}>
            Sign Out
          </button>
        </div>
      </div>

      <div className="chatbot-container">
        <div className="intro-container">
          <h1 className="intro-title">Welcome to Music-Bot!</h1>
          <p className="intro-text">
            Are you tired of listening to the same music over and over again?
            Music-Bot is here to help! Our chatbot uses advanced AI technology
            to recommend personalized music based on your preferences. Simply
            start chatting with our chatbot, or just scan your face to let the 
            bot detect your mood or just say the song name to discover new music and expand
            your music taste.
          </p>
        </div>
        <div className="animation-container">
          <img src={animation} alt="Music Animation" className="animation" />
        </div>
      </div>
    </>
  );
}

export default ChatbotPage;
