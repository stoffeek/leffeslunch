import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Header from './pages/Header';
import Ordering from './pages/Ordering';
import History from './pages/History'; 
import Contact from './pages/Contact';
import Recipe from "./pages/Recipe";
import Sales from "./pages/Sales";
import Overview from "./pages/Overview";
import MyAccount from "./pages/MyAccount";
import About from "./pages/About";


function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leffes/ordering" element={<Ordering />} />
          <Route path="/leffes/history" element={<History />} /> 
          <Route path="/contact" element={<Contact />} />
          <Route path="/leffes/recipe" element={<Recipe />} /> 
          <Route path="/leffes/sales" element={<Sales />} />
          <Route path="/leffes/overview" element={<Overview />} /> 
          <Route path="/leffes/myAccount" element={<MyAccount />} /> 
          <Route path="/about" element={<About />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
