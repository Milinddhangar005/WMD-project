import React from 'react';
import { Building2, User, RefreshCw, Shield, GraduationCap, Wifi, WifiOff } from 'lucide-react';

export default function Navbar({ currentUser, onSwitchRole, onResetData, isBackendOnline }) {
  return (
    <header className="navbar">
      <div className="brand">
        <div className="brand-badge">
          <Building2 size={24} />
        </div>
        <div className="brand-text">
          <h1>SRAMS</h1>
          <p>Smart Room Allotment & Management System</p>
        </div>
      </div>

      <div className="nav-actions">
        {/* Backend connectivity badge */}
        <span
          className="user-badge"
          title={isBackendOnline ? "Connected to Backend REST API (port 5000)" : "Using Offline Client Store"}
          style={{ cursor: "pointer" }}
        >
          {isBackendOnline ? (
            <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#10b981", fontSize: "0.75rem", fontWeight: 700 }}>
              <Wifi size={14} /> REST API LIVE
            </span>
          ) : (
            <span style={{ display: "flex", alignItems: "center", gap: "5px", color: "#f59e0b", fontSize: "0.75rem", fontWeight: 700 }}>
              <WifiOff size={14} /> CLIENT DEMO
            </span>
          )}
        </span>

        {/* User Info & Role Switcher */}
        <div className="user-badge">
          <User size={16} color="#64748b" />
          <span>{currentUser.displayName}</span>
          <span className={`role-tag ${currentUser.role.toLowerCase()}`}>
            {currentUser.role}
          </span>
        </div>

        <button
          className="btn btn-outline btn-sm"
          onClick={onSwitchRole}
          title="Switch between Admin and Student perspective"
        >
          {currentUser.role === 'ADMIN' ? (
            <>
              <GraduationCap size={15} /> Switch to Student
            </>
          ) : (
            <>
              <Shield size={15} /> Switch to Admin
            </>
          )}
        </button>

        {currentUser.role === 'ADMIN' && (
          <button
            className="btn btn-outline btn-sm"
            onClick={onResetData}
            title="Reset sample rooms and applications"
          >
            <RefreshCw size={14} /> Reset Data
          </button>
        )}
      </div>
    </header>
  );
}
