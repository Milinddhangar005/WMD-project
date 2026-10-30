import React from 'react';
import { Award, CheckCircle2, Clock, XCircle, HeartPulse } from 'lucide-react';

export default function RequestsTable({ requests, rooms }) {
  const getRoomName = (roomId) => {
    if (!roomId) return null;
    const r = rooms.find((rm) => rm.id === roomId);
    return r ? `Room ${r.roomNumber} (${r.block})` : roomId;
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Application ID</th>
            <th>Applicant Info</th>
            <th>Merit & Need Metrics</th>
            <th>Transparent Score</th>
            <th>Preferences</th>
            <th>Status</th>
            <th>Allotted Room</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                No room allotment applications found.
              </td>
            </tr>
          ) : (
            requests.map((req) => (
              <tr key={req.id}>
                <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#6366f1' }}>
                  {req.id}
                </td>
                <td>
                  <strong>{req.studentName}</strong>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Roll: {req.rollNo} • {req.email}
                  </div>
                </td>
                <td>
                  <div style={{ fontSize: '0.8rem' }}>
                    GPA: <strong>{req.gpa}</strong> • Dist: <strong>{req.distanceKm} km</strong>
                  </div>
                  {req.specialNeed && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '3px',
                        background: '#fef2f2',
                        color: '#b91c1c',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '1px 5px',
                        borderRadius: '4px',
                        marginTop: '3px'
                      }}
                    >
                      <HeartPulse size={11} /> Special Need (+20)
                    </span>
                  )}
                </td>
                <td>
                  <span className="score-pill">
                    <Award size={14} /> {req.priorityScore}
                  </span>
                </td>
                <td>
                  <div style={{ fontSize: '0.78rem' }}>
                    {req.preferredType} Room
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                    Floor {req.preferredFloor}
                  </div>
                </td>
                <td>
                  {req.status === 'Allotted' ? (
                    <span className="status-pill available" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle2 size={12} /> Allotted
                    </span>
                  ) : req.status === 'Pending' ? (
                    <span className="status-pill partially-occupied" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={12} /> Pending
                    </span>
                  ) : (
                    <span className="status-pill full" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <XCircle size={12} /> Rejected
                    </span>
                  )}
                </td>
                <td>
                  {req.allottedRoomId ? (
                    <span style={{ fontWeight: 700, color: '#4f46e5' }}>
                      {getRoomName(req.allottedRoomId)}
                    </span>
                  ) : (
                    <span style={{ color: '#94a3b8', fontStyle: 'italic', fontSize: '0.8rem' }}>
                      Unassigned
                    </span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
