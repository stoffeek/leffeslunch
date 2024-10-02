import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return(
    <Router>
      <div>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="NoName" element={<Noname />} />  
        </Routes>

    
      </div>
    </Router>
  );
}
export default App;
