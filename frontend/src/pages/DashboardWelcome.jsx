// src/pages/DashboardWelcome.jsx
import React from 'react';
import { useSelector } from 'react-redux';

export default function DashboardWelcome() {
  const user = useSelector((state) => state.user.userData);
  return (
    <div style={{ display: 'flex', flexDirection: 'column',fontFamily: "'Inter', sans-serif", alignItems: 'center', justifyContent: 'center', height: '80%', textAlign: 'center' }}>
      <h1 style={{ fontSize: '36px', color: '#1e293b' }}>Welcome to Oriviyan ERP</h1>
      <p style={{ fontSize: '18px', color: '#64748b' }}>Hello, {user?.name}! Please select a module from the left menu to get started.</p>
    </div>
  );
}