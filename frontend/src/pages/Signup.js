import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";   // ✅ ADD THIS

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();   // ✅ ADD THIS

  const handleSignup = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/signup", {
        name,
        email,
        password
      });

      setMsg(res.data.msg);

      setName("");
      setEmail("");
      setPassword("");

      // ✅ REDIRECT TO LOGIN
      setTimeout(() => {
        navigate("/login");
      }, 700);

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
      <h3 className="text-center mb-4">Signup</h3>

      <input
        className="form-control mb-3"
        placeholder="Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <input
        className="form-control mb-3"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        className="form-control mb-3"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button className="btn btn-primary w-100" onClick={handleSignup}>
        Signup
      </button>

      <p className="text-center mt-3">{msg}</p>
    </div>
  );
}

export default Signup;
