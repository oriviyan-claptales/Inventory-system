// src/components/GlobalSearch.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);

  // TCode Check Helper
  const hasAccess = (tcode) => {
    if (!user) return false;
    if (user.userType === "admin") return true;
    return user.tcodes && user.tcodes.includes(tcode);
  };

  // Saare system ke routes yahan define kar do
  const searchIndex = [
    { title: "Inventory Management", path: "/inventory", tcode: "INV_VIEW", icon: "📦" },
    { title: "Sales Management", path: "/sales", tcode: "SLS_VIEW", icon: "💰" },
    { title: "Packzone (Materials)", path: "/packzone", tcode: "PKG_VIEW", icon: "🏷️" },
    { title: "Analytics Graphs", path: "/graphs", tcode: "ANL_VIEW", icon: "📊" },
    { title: "User Management", path: "/users", adminOnly: true, icon: "👤" },
    { title: "System Logs", path: "/logs", adminOnly: true, icon: "📜" },
  ];

  // Global Keydown Listener
  useEffect(() => {
    const handleGlobalTyping = (e) => {
      const activeTag = document.activeElement.tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(activeTag)) return;

      if (e.ctrlKey || e.altKey || e.metaKey || e.key.length > 1) {
        if (e.key === 'Escape') {
          setIsOpen(false);
          setQuery("");
        }
        return;
      }

      setIsOpen(true);
      
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          setQuery((prev) => prev + e.key); 
        }
      }, 0);
    };

    window.addEventListener('keydown', handleGlobalTyping);
    return () => window.removeEventListener('keydown', handleGlobalTyping);
  }, []);

  // 👇 NAYA LOGIC: Handle Input Change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Agar user ne backspace maarte-maarte box khaali kar diya, toh modal band kar do
    if (value.trim() === "") {
      setIsOpen(false);
    }
  };

  // Filter Logic
  const filteredResults = searchIndex
    .filter(item => {
      if (item.adminOnly) return user?.userType === "admin";
      return hasAccess(item.tcode);
    })
    .filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

  // Navigation Logic
  const handleSelect = (path) => {
    navigate(path);
    setIsOpen(false);
    setQuery("");
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={() => { setIsOpen(false); setQuery(""); }}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        <div style={styles.searchHeader}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            // 👇 Yahan onChange update kiya
            onChange={handleInputChange} 
            placeholder="Search modules, actions..."
            style={styles.searchInput}
          />
          <button style={styles.escBtn} onClick={() => { setIsOpen(false); setQuery(""); }}>ESC</button>
        </div>

        <div style={styles.resultsContainer}>
          {filteredResults.length > 0 ? (
            filteredResults.map((item, idx) => (
              <div 
                key={idx} 
                style={styles.resultItem} 
                onClick={() => handleSelect(item.path)}
              >
                <span>{item.icon}</span>
                <span style={styles.resultText}>{item.title}</span>
                <span style={styles.jumpText}>Jump to ↵</span>
              </div>
            ))
          ) : (
            <p style={styles.noResult}>No modules found matching "{query}"</p>
          )}
        </div>

      </div>
    </div>
  );
}

const styles = {
  overlay: { position: 'fixed',fontFamily: "'Inter', sans-serif", top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', paddingTop: '10vh', zIndex: 9999 },
  modal: { backgroundColor: '#ffffff', width: '90%', maxWidth: '600px', borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden', height: 'fit-content', display: 'flex', flexDirection: 'column' },
  searchHeader: { display: 'flex', alignItems: 'center', padding: '15px 20px', borderBottom: '1px solid #e2e8f0' },
  searchIcon: { fontSize: '20px', marginRight: '15px', color: '#64748b' },
  searchInput: { flex: 1, border: 'none', fontSize: '18px', outline: 'none', color: '#1e293b', backgroundColor: 'transparent' },
  escBtn: { fontSize: '12px', backgroundColor: '#f1f5f9', color: '#64748b', border: '1px solid #cbd5e1', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' },
  resultsContainer: { maxHeight: '350px', overflowY: 'auto', padding: '10px' },
  resultItem: { display: 'flex', alignItems: 'center', padding: '12px 15px', cursor: 'pointer', borderRadius: '8px', transition: 'background 0.2s', ':hover': { backgroundColor: '#f8fafc' } },
  resultText: { marginLeft: '12px', flex: 1, fontSize: '15px', fontWeight: '500', color: '#334155' },
  jumpText: { fontSize: '12px', color: '#94a3b8', opacity: 0.7 },
  noResult: { padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '14px' }
};