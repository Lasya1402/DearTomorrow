import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import Memory from "./components/Memory";
import CreateCapsule from "./components/CreateCapsule";
import MyNav from "./components/Mynav";

function App() {
  return <AppContent />;
}

const AppContent = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/memory", "/create-capsule"]; // Hide navbar on these pages

  return (
    <div className="app-container">
      {!hideNavbarRoutes.includes(location.pathname) && <MyNav />}
      <div className={`content ${hideNavbarRoutes.includes(location.pathname) ? "no-navbar" : ""}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/memory" element={<Memory />} />
          <Route path="/create-capsule" element={<CreateCapsule />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
