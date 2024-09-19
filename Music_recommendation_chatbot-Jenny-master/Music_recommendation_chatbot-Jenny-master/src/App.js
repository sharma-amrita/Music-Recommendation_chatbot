import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import FirstPage from './components/FirstPage';
import ChatbotPage from './components/ChatbotPage';
import TextChatbotPage from './components/TextChatbotPage';
import VideoChatbotPage from './components/VideoChatbotPage';
import Auth0Callback from './components/Auth0Callback';

function App() {
  const { isAuthenticated, isLoading, logout } = useAuth0();

  if (isLoading) {
    return <div>Hold up!!! Your Website Content is loaded...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<FirstPage />} />
        <Route
          path="/chatbot"
          element={
            isAuthenticated ? (
              <ChatbotPage logout={logout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/text-chatbot"
          element={)
            isAuthenticated ? (
              <TextChatbotPage logout={logout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/video-chatbot"
          element={
            isAuthenticated ? (
              <VideoChatbotPage logout={logout} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/callback" element={<Auth0Callback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
