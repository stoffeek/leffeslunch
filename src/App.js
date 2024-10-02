import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Header from './pages/Header'

function App() {
  return(
    <Router>
      <div>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

    
      </div>
    </Router>
  );
}
export default App;
