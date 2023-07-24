import { useState } from 'react';
import './App.css';
import About from './Components/About';
import Navbar from './Components/Navbar'
import TextForm from './Components/TextForm';
import Alert from './Components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  const [mode, setMode] = useState('dark-subtle');
  const [alert, setalert] = useState(null);

  const showAlert = (message, type) => {
    setalert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setalert(null);
    }, 1500);
  }

  const toggleMode = () => {
    if (mode !== "dark") {
      setMode("dark");
      document.body.style.backgroundColor = "#212121";
      showAlert("Dark Mode has been enabled.", "success");
      try {
        let pText = document.getElementById("myBox");
        pText.classList.add('ph-color');
      }
      catch (error) {
        console.log(error);
      }
    } else {
      setMode("dark-subtle");
      document.body.style.backgroundColor = "white";
      showAlert("Dark Mode has been Disabled.", "success");
    }
  }
  return (
    <Router>
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode} />
      <Alert alert={alert} />
      <div className="container my-3">
        <Routes>
          <Route path="/" element={<TextForm heading="Enter text to analyze below" mode={mode} showAlert={showAlert} />} />

          <Route path="/about" element={<About mode={mode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;