import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AddItemView } from './pages/AddItemView';
import { ListView } from './pages/ListView';
import { Home } from './pages/Home';
import { RouteLink } from './components/RouteLink';
import HeaderNav from './components/HeaderNav';
import './App.css';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    if (localStorage.token) setToken(localStorage.token);
  }, []);

  return (
    <div className="App">
      <Router>
        <HeaderNav token={token} setToken={setToken} />
        <Routes>
          <Route
            exact
            path="/"
            element={<Home token={token} setToken={setToken} />}
          />
          <Route exact path="/list" element={<ListView token={token} />} />
          <Route path="/add" element={<AddItemView token={token} />} />
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
