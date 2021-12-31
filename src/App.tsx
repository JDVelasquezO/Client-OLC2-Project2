import React from 'react';
import './App.css';
import AppBar from "./Components/AppBar";
import FilesButton from "./Components/FilesButton";
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <AppBar /><br/>
        <div className="mui-container-fluid">
            <div className="mui--text-headline">Data Science Analyzer</div><br />
            <FilesButton />
        </div><br/>
        <Footer />
    </div>
  );
}

export default App;
