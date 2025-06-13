'use client'

import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Dashboard() {
  const { signOut, user } = useContext(AuthContext);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name}!</p>

      <button
        onClick={signOut}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          cursor: 'pointer',
          backgroundColor: '#e63946',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Logout
      </button>
    </div>
  );
}
