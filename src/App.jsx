import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import RoomCard from './components/RoomCard';
import RequestsTable from './components/RequestsTable';
import AutomatedAllotmentModal from './components/AutomatedAllotmentModal';
import ApplyRoomModal from './components/ApplyRoomModal';
import AddRoomModal from './components/AddRoomModal';
import { api } from './services/api';
import { initialRooms, initialRequests } from './data/store';
import { Zap, Plus, FileText, Grid, History, CheckCircle, Clock } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState({
    uid: 'admin-01',
    displayName: 'Dr. R. Sharma (Chief Warden)',
    email: 'admin@srams.edu',
    role: 'ADMIN' // 'ADMIN' or 'STUDENT'
  });

  const [activeTab, setActiveTab] = useState('rooms'); // 'rooms', 'requests', 'logs', 'my-status'
  const [rooms, setRooms] = useState(initialRooms);
  const [requests, setRequests] = useState(initialRequests);
  const [logs, setLogs] = useState([]);
  const [isBackendOnline, setIsBackendOnline] = useState(false);

  // Filters
  const [filterBlock, setFilterBlock] = useState('All');
  const [filterFloor, setFilterFloor] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Modals
  const [isAutoAllotOpen, setIsAutoAllotOpen] = useState(false);
  const [isAutoAllotLoading, setIsAutoAllotLoading] = useState(false);
  const [allotmentResults, setAllotmentResults] = useState(null);

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);

  // Compute live stats
  const totalRooms = rooms.length;
  const totalCapacity = rooms.reduce((sum, r) => sum + r.capacity, 0);
  const occupiedBeds = rooms.reduce((sum, r) => sum + r.occupiedCount, 0);
  const availableBeds = rooms.reduce(
    (sum, r) => (r.status !== 'Maintenance' ? sum + (r.capacity - r.occupiedCount) : sum),
    0
  );
  const occupancyRate = totalCapacity > 0 ? ((occupiedBeds / totalCapacity) * 100).toFixed(1) : 0;

  const stats = {
    totalRooms,
    totalCapacity,
    occupiedBeds,
    availableBeds,
    occupancyRate
  };

  // Fetch initial data from REST API if online
  const loadData = async () => {
    try {
      const resStats = await api.getStats();
      const resRooms = await api.getRooms();
      const resReqs = await api.getRequests();
      const resLogs = await api.getLogs();

      if (resRooms?.data) setRooms(resRooms.data);
      if (resReqs?.data) setRequests(resReqs.data);
      if (resLogs?.data) setLogs(resLogs.data);
      setIsBackendOnline(true);
    } catch (e) {
      setIsBackendOnline(false);
      // Fallback local state is already set
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 6000);
    return () => clearInterval(interval);
  }, []);

  // Role Switcher
  const handleSwitchRole = () => {
    if (currentUser.role === 'ADMIN') {
      setCurrentUser({
        uid: 'student-01',
        displayName: 'Aarav Patel (Student)',
        rollNo: 'CS2505',
        email: 'aarav@srams.edu',
        role: 'STUDENT'
      });
      setActiveTab('rooms');
    } else {
      setCurrentUser({
        uid: 'admin-01',
        displayName: 'Dr. R. Sharma (Chief Warden)',
        email: 'admin@srams.edu',
        role: 'ADMIN'
      });
      setActiveTab('rooms');
    }
  };

  // Run Automated Allotment
  const handleRunAllotment = async () => {
    setIsAutoAllotLoading(true);
    try {
      if (isBackendOnline) {
        const res = await api.runAutoAllotment();
        setAllotmentResults(res);
        await loadData();
      } else {
        // Local simulation of allotment engine
        const pending = [...requests.filter((r) => r.status === 'Pending')].sort(
          (a, b) => b.priorityScore - a.priorityScore
        );
        const updatedRooms = JSON.parse(JSON.stringify(rooms));
        const resDecisions = [];
        let count = 0;

        for (const reqItem of pending) {
          const eligible = updatedRooms.filter(
            (r) => r.status !== 'Maintenance' && r.occupiedCount < r.capacity
          );
          if (eligible.length > 0) {
            const chosen = eligible[0];
            chosen.occupants.push({
              id: reqItem.studentId,
              name: reqItem.studentName,
              rollNo: reqItem.rollNo
            });
            chosen.occupiedCount = chosen.occupants.length;
            if (chosen.occupiedCount >= chosen.capacity) chosen.status = 'Full';
            else chosen.status = 'Partially Occupied';

            reqItem.status = 'Allotted';
            reqItem.allottedRoomId = chosen.id;
            count++;
            resDecisions.push({
              request: reqItem,
              room: chosen,
              status: 'Allotted'
            });
          }
        }
        setRooms(updatedRooms);
        setRequests([...requests]);
        setAllotmentResults({ allocatedCount: count, results: resDecisions });
      }
    } catch (e) {
      alert('Error running allotment: ' + e.message);
    } finally {
      setIsAutoAllotLoading(false);
    }
  };

  // Vacate Room
  const handleVacateRoom = async (roomId, studentId = null) => {
    if (!window.confirm('Are you sure you want to vacate this bed/room?')) return;
    try {
      if (isBackendOnline) {
        await api.vacateRoom(roomId, studentId);
        await loadData();
      } else {
        const updatedRooms = rooms.map((r) => {
          if (r.id === roomId) {
            if (studentId) {
              const newOcc = r.occupants.filter((o) => (o.id || o) !== studentId);
              return {
                ...r,
                occupants: newOcc,
                occupiedCount: newOcc.length,
                status: newOcc.length === 0 ? 'Available' : 'Partially Occupied'
              };
            }
            return { ...r, occupants: [], occupiedCount: 0, status: 'Available' };
          }
          return r;
        });
        setRooms(updatedRooms);
      }
    } catch (e) {
      alert('Error vacating room: ' + e.message);
    }
  };

  // Submit Application (Student)
  const handleSubmitApplication = async (formData) => {
    try {
      if (isBackendOnline) {
        await api.submitRequest(formData);
        await loadData();
      } else {
        const gpaW = (formData.gpa / 10.0) * 50.0;
        const distW = Math.min(30.0, (formData.distanceKm / 600.0) * 30.0);
        const specW = formData.specialNeed ? 20.0 : 0.0;
        const score = parseFloat((gpaW + distW + specW).toFixed(1));

        const newReq = {
          id: `REQ${Date.now().toString().slice(-4)}`,
          studentId: `S${Date.now().toString().slice(-4)}`,
          ...formData,
          priorityScore: score,
          status: 'Pending',
          allottedRoomId: null
        };
        setRequests([newReq, ...requests]);
      }
      alert('Your room application has been submitted successfully!');
    } catch (e) {
      alert('Error submitting application: ' + e.message);
    }
  };

  // Add Room (Admin)
  const handleAddRoom = async (roomData) => {
    try {
      if (isBackendOnline) {
        await api.addRoom(roomData);
        await loadData();
      } else {
        const newR = {
          id: `R${Date.now()}`,
          ...roomData,
          occupiedCount: 0,
          occupants: [],
          status: 'Available'
        };
        setRooms([...rooms, newR]);
      }
      alert('New room added successfully!');
    } catch (e) {
      alert('Error adding room: ' + e.message);
    }
  };

  // Reset Demo Data
  const handleResetData = async () => {
    if (!window.confirm('Reset all rooms and applications to demo starting state?')) return;
    try {
      if (isBackendOnline) {
        await api.resetDemoData();
        await loadData();
      } else {
        setRooms(initialRooms);
        setRequests(initialRequests);
      }
      setAllotmentResults(null);
    } catch (e) {
      alert('Error resetting data: ' + e.message);
    }
  };

  // Filter logic
  const filteredRooms = rooms.filter((r) => {
    if (filterBlock !== 'All' && r.block !== filterBlock) return false;
    if (filterFloor !== 'All' && r.floor !== Number(filterFloor)) return false;
    if (filterType !== 'All' && r.type !== filterType) return false;
    if (filterStatus !== 'All' && r.status !== filterStatus) return false;
    return true;
  });

  return (
    <div>
      <Navbar
        currentUser={currentUser}
        onSwitchRole={handleSwitchRole}
        onResetData={handleResetData}
        isBackendOnline={isBackendOnline}
      />

      <main className="container">
        {/* Banner with Smart Allotment Trigger */}
        <div className="action-banner">
          <div>
            <h2>
              {currentUser.role === 'ADMIN'
                ? 'Automated & Streamlined Room Allocation'
                : 'Campus Dormitory Room Allotment Portal'}
            </h2>
            <p>
              {currentUser.role === 'ADMIN'
                ? 'Objective, fair allotment powered by multi-criteria priority scoring (Merit + Distance + Accessibility) and space optimization.'
                : 'Browse real-time room availability across all blocks or submit your room preference application.'}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {currentUser.role === 'ADMIN' ? (
              <>
                <button
                  className="btn btn-white"
                  onClick={() => {
                    setAllotmentResults(null);
                    setIsAutoAllotOpen(true);
                  }}
                >
                  <Zap size={16} color="#4f46e5" /> Run Smart Allotment
                </button>
                <button
                  className="btn"
                  style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
                  onClick={() => setIsAddRoomModalOpen(true)}
                >
                  <Plus size={16} /> Add Room
                </button>
              </>
            ) : (
              <button
                className="btn btn-white"
                onClick={() => setIsApplyModalOpen(true)}
              >
                <FileText size={16} color="#4f46e5" /> Apply for Room
              </button>
            )}
          </div>
        </div>

        {/* Real-time Metrics / Stats Cards */}
        <StatsCards stats={stats} />

        {/* Tabs Navigation */}
        <div className="tabs-nav">
          <button
            className={`tab-btn ${activeTab === 'rooms' ? 'active' : ''}`}
            onClick={() => setActiveTab('rooms')}
          >
            <Grid size={16} /> Rooms & Live Occupancy ({rooms.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            <FileText size={16} /> Allotment Applications ({requests.length})
          </button>
          {currentUser.role === 'ADMIN' && (
            <button
              className={`tab-btn ${activeTab === 'logs' ? 'active' : ''}`}
              onClick={() => setActiveTab('logs')}
            >
              <History size={16} /> Audit Trail
            </button>
          )}
        </div>

        {/* TAB 1: Rooms & Live Occupancy Grid */}
        {activeTab === 'rooms' && (
          <div>
            {/* Filter Bar */}
            <div className="filter-bar">
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>
                Filter Rooms:
              </span>
              <select value={filterBlock} onChange={(e) => setFilterBlock(e.target.value)}>
                <option value="All">All Blocks</option>
                <option value="Block A">Block A</option>
                <option value="Block B">Block B</option>
                <option value="Block C">Block C</option>
              </select>

              <select value={filterFloor} onChange={(e) => setFilterFloor(e.target.value)}>
                <option value="All">All Floors</option>
                <option value="1">Floor 1</option>
                <option value="2">Floor 2</option>
                <option value="3">Floor 3</option>
              </select>

              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="All">All Room Types</option>
                <option value="Single">Single</option>
                <option value="Double">Double</option>
                <option value="Triple">Triple</option>
              </select>

              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="All">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Partially Occupied">Partially Occupied</option>
                <option value="Full">Full</option>
                <option value="Maintenance">Maintenance</option>
              </select>

              <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#64748b' }}>
                Showing <strong>{filteredRooms.length}</strong> of {rooms.length} rooms
              </span>
            </div>

            {/* Room Cards Grid */}
            <div className="room-grid">
              {filteredRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  isAdmin={currentUser.role === 'ADMIN'}
                  onVacateRoom={handleVacateRoom}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Allotment Requests */}
        {activeTab === 'requests' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                  Student Allotment Applications
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Transparent priority ranking calculated objectively via GPA, distance, and accessibility needs.
                </p>
              </div>

              {currentUser.role === 'STUDENT' && (
                <button className="btn btn-primary btn-sm" onClick={() => setIsApplyModalOpen(true)}>
                  <Plus size={14} /> New Application
                </button>
              )}
            </div>

            <RequestsTable requests={requests} rooms={rooms} />
          </div>
        )}

        {/* TAB 3: Audit Trail */}
        {activeTab === 'logs' && currentUser.role === 'ADMIN' && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Action</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan="3" style={{ textAlign: 'center', padding: '1.5rem', color: '#94a3b8' }}>
                      No audit logs recorded yet.
                    </td>
                  </tr>
                ) : (
                  logs.map((lg, i) => (
                    <tr key={i}>
                      <td style={{ fontSize: '0.78rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                        {new Date(lg.timestamp).toLocaleString()}
                      </td>
                      <td>
                        <span className="role-tag admin">{lg.action}</span>
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>{lg.details}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modals */}
      <AutomatedAllotmentModal
        isOpen={isAutoAllotOpen}
        onClose={() => setIsAutoAllotOpen(false)}
        onRunAllotment={handleRunAllotment}
        isProcessing={isAutoAllotLoading}
        results={allotmentResults}
      />

      <ApplyRoomModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        onSubmitApplication={handleSubmitApplication}
      />

      <AddRoomModal
        isOpen={isAddRoomModalOpen}
        onClose={() => setIsAddRoomModalOpen(false)}
        onAddRoom={handleAddRoom}
      />
    </div>
  );
}
