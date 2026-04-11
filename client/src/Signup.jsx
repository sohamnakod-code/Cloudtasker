import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    await axios.post("http://localhost:5000/signup", {
      email,
      password,
    });

    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full mb-3 p-2 border rounded"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-green-500 text-white p-2 rounded"
          onClick={handleSignup}
        >
          Signup
        </button>
      </div>
    </div>
  );
}

export default Signup;