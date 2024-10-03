import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Header from './pages/Header';
import Ordering from './pages/Ordering';
import History from './pages/History'; 

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leffes/Ordering" element={<Ordering />} />
          <Route path="/leffes/history" element={<History />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
