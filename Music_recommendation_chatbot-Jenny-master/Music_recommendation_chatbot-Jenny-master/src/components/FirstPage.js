import React from "react";
import "./FirstPage.css";
import logo from "../assets/mod.png";
import guitarPlayer from "../assets/guitar-player.png";
import musicListener from "../assets/music-listener.gif";
import { useAuth0 } from "@auth0/auth0-react";

function FirstPage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="navbar-buttons">
          <button className="btn-signup" onClick={() => loginWithRedirect()}>Sign Up</button>
          <button className="btn-login" onClick={() => loginWithRedirect()}>Log In</button>
        </div>
      </nav>
      <div className="content">
        <div className="animation">
          <img src={guitarPlayer} alt="Guitar player" />
        </div>
        <div className="animation">
          <img src={musicListener} alt="Music listener" />
        </div>
        <div className="description">
          <h2>Find the perfect music for your mood</h2>
          <p>Our AI-powered MusicBot recommends music based on your mood.</p>
        </div>
      </div>
    </div>
  );
}

export default FirstPage;
