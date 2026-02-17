import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Feedback from "./pages/Feedback";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";

function Navbar() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user_id");
  const admin = localStorage.getItem("admin");

  const logout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">
      <div className="container-fluid">

        <span className="navbar-brand">AI Feedback</span>

        <div className="ms-auto">

          {!user && !admin && (
            <>
              <Link className="btn btn-outline-primary me-2" to="/signup">Signup</Link>
              <Link className="btn btn-outline-success me-2" to="/login">Login</Link>
              <Link className="btn btn-dark" to="/admin">Admin</Link>
            </>
          )}

          {user && !admin && (
            <>
              <Link className="btn btn-warning me-2" to="/feedback">Feedback</Link>
              <button className="btn btn-danger" onClick={logout}>Logout</button>
            </>
          )}

          {admin && (
            <>
              <Link className="btn btn-info me-2" to="/dashboard">Dashboard</Link>
              <button className="btn btn-danger" onClick={logout}>Logout</button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

function Home() {
  return (
    <div className="hero">
      <h1>AI Feedback System</h1>
      <p>Collect user feedback, analyze sentiment and monitor performance in one dashboard.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <div className="main-container mt-4">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

      </div>

    </BrowserRouter>
  );
}

export default App;
