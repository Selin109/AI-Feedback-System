import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/login", {
        email,
        password
      });

      // remove admin session
      localStorage.removeItem("admin");

      localStorage.setItem("user_id", res.data.user_id);
      localStorage.setItem("user_name", res.data.name);

      setMsg(res.data.msg);
      navigate("/feedback");

    } catch (err) {
      if (err.response) {
        setMsg(err.response.data.msg);
      } else {
        setMsg("Server error");
      }
    }
  };

  return (
    <div className="card p-4 mx-auto mt-4" style={{maxWidth:420}}>
      <h3 className="text-center mb-4">Login</h3>
      <input className="form-control mb-3"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input className="form-control mb-3"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button className="btn btn-success w-100" onClick={handleLogin}>
        Login
      </button>

      <p className="text-center mt-3">{msg}</p>
    </div>
  );
}

export default Login;
