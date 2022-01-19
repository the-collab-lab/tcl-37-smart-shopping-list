import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AddItemView } from './pages/AddItemView';
import { ListView } from './pages/ListView';
import Home from './components/Home';
import { RouteLink } from './components/RouteLink';
import './App.css';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    if (localStorage.token) setToken(localStorage.token);
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home token={token} setToken={setToken} />}
          />
          <Route exact path="/list" element={<ListView />} />
          <Route path="/add" element={<AddItemView />} />
        </Routes>
        <nav className="footer">
          <RouteLink to="/list">List</RouteLink>
          <RouteLink to="/add">Add Item</RouteLink>
        </nav>
      </Router>
    </div>
  );
}

export default App;
