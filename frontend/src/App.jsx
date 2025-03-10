import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import Memory from "./components/Memory";
import CreateCapsule from "./components/CreateCapsule";
import MyNav from "./components/Mynav";

function App() {
  return (
    <AuthProvider>
      <Router>
        <MyNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/memory" element={<Memory />} />
          <Route path="/create-capsule" element={<CreateCapsule />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
