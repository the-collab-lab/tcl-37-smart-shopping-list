import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AddItemView, ListView, Home } from './pages';
import { RequireToken } from './components';
import './App.css';
import { ArchivalNoticeModal } from '@the-collab-lab/shopping-list-utils';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) setToken(localStorage.getItem('token'));
  }, []);

  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <ArchivalNoticeModal />
                <Home token={token} setToken={setToken} />
              </>
            }
          />
          <Route
            exact
            path="/list"
            element={
              <RequireToken>
                <ListView token={token} setToken={setToken} />
              </RequireToken>
            }
          />
          <Route
            path="/add"
            element={
              <RequireToken>
                <AddItemView token={token} setToken={setToken} />
              </RequireToken>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
