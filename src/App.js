import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AddItemView } from './components/AddItemView';
import { ListView } from './components/ListView';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<ListView />} />
          <Route path="/add" element={<AddItemView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
