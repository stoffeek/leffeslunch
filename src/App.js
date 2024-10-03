import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Header from './pages/Header';
import Ordering from './pages/Ordering';
import History from './pages/History'; 
import Recipe from "./pages/Recipe";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leffes/ordering" element={<Ordering />} />
          <Route path="/leffes/history" element={<History />} /> 
          <Route path="/leffes/recipe" element={<Recipe />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
