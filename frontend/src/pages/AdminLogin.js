import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/admin/login", {
        username,
        password
      });

      // remove user session
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_name");

      localStorage.setItem("admin", "true");

      setMsg(res.data.msg);
      navigate("/dashboard");

    } catch (err) {
      if (err.response) {
        setMsg(err.response.data.msg);
      } else {
        setMsg("Server error");
      }
    }
  };

  return (
    <div className="card p-4 mx-auto" style={{maxWidth:400}}>
      <h2 className="text-center mb-3">Admin Login</h2>

      <input className="form-control mb-3"
        placeholder="Username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
      />

      <input className="form-control mb-3"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button className="btn btn-dark w-100" onClick={handleLogin}>
        Login
      </button>

      <p className="text-center mt-3">{msg}</p>
    </div>
  );
}

export default AdminLogin;
