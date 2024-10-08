import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Header from './pages/Header';
import Ordering from './pages/Ordering';
import History from './pages/History'; 
import Contact from './pages/Contact';
import Recipe from "./pages/Recipe";
import Sales from "./pages/Sales";


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leffes/ordering" element={<Ordering />} />
          <Route path="/leffes/history" element={<History />} /> 
          <Route path ="/contact" element={<Contact />} />
          <Route path="/leffes/recipe" element={<Recipe />} /> 
          <Route path ="leffes/sales" element={<Sales />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
