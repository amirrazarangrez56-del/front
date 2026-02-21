import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', { 
        email, 
        password 
      });
      
      localStorage.setItem('token', res.data.token);
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data.msg || 'Signup failed');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '10px', fontSize: '16px', background: '#007bff', color: 'white', border: 'none' }}
        >
          {loading ? 'Creating...' : 'Sign Up'}
        </button>
        <p style={{ textAlign: 'center' }}>
          Already have account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}
