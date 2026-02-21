import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      console.log('Logging in with:', { email, password }); // DEBUG
      
      const res = await axios.post('http://localhost:5000/api/auth/login', { 
        email, 
        password 
      });
      
      console.log('Login SUCCESS:', res.data); // DEBUG
      
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      navigate('/welcome');
    } catch (error) {
      console.error('Login ERROR:', error.response?.data); // DEBUG
      setError(error.response?.data?.msg || 'Login failed');
      alert(error.response?.data?.msg || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
          style={{ padding: '10px', fontSize: '16px', background: '#28a745', color: 'white', border: 'none' }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p style={{ textAlign: 'center' }}>
          No account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
