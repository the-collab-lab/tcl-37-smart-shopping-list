import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AddItemView } from './components/AddItemView';
import { ListView } from './components/ListView';
import { RouteLink } from './components/RouteLink';
import './App.css';
import List from './List';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<ListView />} />
          <Route path="/add" element={<AddItemView />} />
        </Routes>
        <nav className="footer">
          <RouteLink to="/">List</RouteLink>
          <RouteLink to="/add">Add Item</RouteLink>
        </nav>
      </Router>
    </div>
  );
}

export default App;
