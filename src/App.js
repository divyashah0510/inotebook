import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Forgot from "./components/Forgot";
import Signup from "./components/Signup";
import NoteState from "./context/NoteState";
import Message from "./components/Message";
import { useState } from "react";



function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Message alert={alert} />
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert} />} />
          <Route path="/about" element={<About showAlert={showAlert} />} />
          <Route path="/login" element={<Login showAlert={showAlert} />} />
          <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          <Route path="/forgot" element={<Forgot showAlert={showAlert} />} />
        </Routes>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
