import React from 'react';
import './App.css';
import AppBar from "./Components/AppBar";
import FilesButton from "./Components/FilesButton";
import ParameterInput from "./Components/ParameterInput";
import Charts from "./Components/Charts";
import Reports from "./Components/Reports";
import Footer from "./Components/Footer";
import Predictions from "./Components/Predictions";

function App() {
  return (
    <div className="App">
      <AppBar /><br/>
        <div className="mui-container-fluid">
            <div className="mui-row">
                <div className="mui-col-md-6">
                    <FilesButton />
                </div>
                <div className="mui-col-md-6">
                    <Predictions />
                </div>
            </div>

            <div className="mui-row">
                <div className="mui-col-md-6">
                    <Charts />
                </div>
                <div className="mui-col-md-6">
                    <Reports />
                </div>
            </div>
        </div><br/>
        <Footer />
    </div>
  );
}

export default App;
