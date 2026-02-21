import { useNavigate } from "react-router-dom";

export default function Welcome({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div>
      <h2>🎉 Welcome, {user.email}!</h2>
      <p>You are successfully logged in!</p>
      <p><strong>User ID:</strong> {user.id}</p>
      <button 
        onClick={handleLogout}
        style={{ padding: '10px', fontSize: '16px', background: '#dc3545', color: 'white', border: 'none' }}
      >
        Logout
      </button>
    </div>
  );
}
