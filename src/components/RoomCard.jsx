import React from 'react';
import { UserCheck, ShieldCheck, XCircle, Sparkles } from 'lucide-react';

export default function RoomCard({ room, isAdmin, onVacateRoom }) {
  const getStatusClass = (status) => {
    switch (status) {
      case 'Available':
        return 'available';
      case 'Partially Occupied':
        return 'partially-occupied';
      case 'Full':
        return 'full';
      case 'Maintenance':
        return 'maintenance';
      default:
        return 'available';
    }
  };

  const percentOccupied = room.capacity > 0 ? (room.occupiedCount / room.capacity) * 100 : 0;
  
  let fillClass = 'fill-green';
  if (room.status === 'Full') fillClass = 'fill-red';
  else if (room.status === 'Partially Occupied') fillClass = 'fill-amber';
  else if (room.status === 'Maintenance') fillClass = 'fill-grey';

  return (
    <div className="room-card">
      <div className="room-header">
        <div>
          <div className="room-number">Room {room.roomNumber}</div>
          <div className="room-block">
            {room.block} • Floor {room.floor} • {room.type}
          </div>
        </div>
        <span className={`status-pill ${getStatusClass(room.status)}`}>
          {room.status}
        </span>
      </div>

      <div className="occupancy-meter">
        <div className="occupancy-info">
          <span>Occupancy</span>
          <span>
            {room.occupiedCount} / {room.capacity} Beds
          </span>
        </div>
        <div className="progress-track">
          <div
            className={`progress-fill ${fillClass}`}
            style={{ width: `${percentOccupied}%` }}
          />
        </div>
      </div>

      <div className="amenities-list">
        {room.amenities &&
          room.amenities.map((item, idx) => (
            <span key={idx} className="amenity-chip">
              {item}
            </span>
          ))}
      </div>

      {room.occupants && room.occupants.length > 0 ? (
        <div className="occupants-box">
          <div style={{ fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
            Current Occupants:
          </div>
          {room.occupants.map((occ, i) => (
            <div key={i} className="occupant-item">
              <span>
                • {occ.name || occ} {occ.rollNo ? `(${occ.rollNo})` : ''}
              </span>
              {isAdmin && (
                <button
                  className="btn btn-sm btn-danger-outline"
                  style={{ padding: '2px 6px', fontSize: '0.7rem' }}
                  onClick={() => onVacateRoom(room.id, occ.id || occ)}
                  title="Vacate this occupant"
                >
                  <XCircle size={12} /> Vacate
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            fontSize: '0.78rem',
            color: '#94a3b8',
            fontStyle: 'italic',
            margin: '0.5rem 0 1rem 0'
          }}
        >
          {room.status === 'Maintenance' ? 'Under repair/service' : 'No occupants currently assigned'}
        </div>
      )}

      {isAdmin && room.occupiedCount > 0 && (
        <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
          <button
            className="btn btn-outline btn-sm"
            style={{ width: '100%', color: '#ef4444', borderColor: '#fca5a5' }}
            onClick={() => onVacateRoom(room.id)}
          >
            Vacate Entire Room
          </button>
        </div>
      )}
    </div>
  );
}
