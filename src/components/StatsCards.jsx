import React from 'react';
import { Home, Users, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';

export default function StatsCards({ stats }) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="label">Total Rooms</span>
          <Home size={18} color="#6366f1" />
        </div>
        <div className="value">{stats.totalRooms || 0}</div>
        <div className="sub">Across all campus blocks</div>
      </div>

      <div className="stat-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="label">Total Bed Capacity</span>
          <Users size={18} color="#3b82f6" />
        </div>
        <div className="value">{stats.totalCapacity || 0}</div>
        <div className="sub">Designed dormitory beds</div>
      </div>

      <div className="stat-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="label">Occupied Beds</span>
          <CheckCircle2 size={18} color="#10b981" />
        </div>
        <div className="value" style={{ color: "#059669" }}>
          {stats.occupiedBeds || 0}
        </div>
        <div className="sub">Currently allotted students</div>
      </div>

      <div className="stat-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="label">Available Beds</span>
          <TrendingUp size={18} color="#f59e0b" />
        </div>
        <div className="value" style={{ color: "#d97706" }}>
          {stats.availableBeds || 0}
        </div>
        <div className="sub">Vacant & ready for allotment</div>
      </div>

      <div className="stat-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="label">Occupancy Rate</span>
          <AlertTriangle size={18} color="#8b5cf6" />
        </div>
        <div className="value" style={{ color: "#4f46e5" }}>
          {stats.occupancyRate || 0}%
        </div>
        <div className="sub">Real-time space utilization</div>
      </div>
    </div>
  );
}
