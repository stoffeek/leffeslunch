import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Header from './pages/Header'
import Calculator from './pages/Calculator'

function App() {
  return(
    <Router>
      <div>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
        </Routes>

    
      </div>
    </Router>
  );
}
export default App;
