import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Forgot from "./components/Forgot";
import Signup from "./components/Signup";
import NoteState from "./context/NoteState";
import Message from "./components/Message";



function App() {
  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Message/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<Forgot />} />
        </Routes>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
