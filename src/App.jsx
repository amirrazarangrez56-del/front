import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./compenents/Signup";
import Login from "./compenents/Login";
import Welcome from "./compenents/Welcome";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Decode token to get user info
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({ id: payload.userId, email: 'user@example.com' });
    }
  }, []);

  return (
    <div style={{ padding: '50px', maxWidth: '400px', margin: '0 auto' }}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route
          path="/welcome"
          element={user ? <Welcome user={user} setUser={setUser} /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
