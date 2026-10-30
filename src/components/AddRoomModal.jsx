import React, { useState } from 'react';
import { X, PlusCircle } from 'lucide-react';

export default function AddRoomModal({ isOpen, onClose, onAddRoom }) {
  const [formData, setFormData] = useState({
    roomNumber: '',
    block: 'Block A',
    floor: 1,
    type: 'Double',
    capacity: 2,
    amenities: 'Wi-Fi, Study Desk',
    pricePerSemester: 25000
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.roomNumber) {
      alert('Please enter a room number');
      return;
    }
    const amenitiesArr = formData.amenities
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onAddRoom({
      ...formData,
      capacity: parseInt(formData.capacity),
      floor: parseInt(formData.floor),
      pricePerSemester: parseInt(formData.pricePerSemester),
      amenities: amenitiesArr
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <h3>Add New Room</h3>
            <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
              Register a new room into the dormitory inventory
            </p>
          </div>
          <button className="btn btn-outline btn-sm" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Room Number</label>
              <input
                type="text"
                placeholder="e.g. 104"
                value={formData.roomNumber}
                onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Block</label>
              <select
                value={formData.block}
                onChange={(e) => setFormData({ ...formData, block: e.target.value })}
              >
                <option value="Block A">Block A</option>
                <option value="Block B">Block B</option>
                <option value="Block C">Block C</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Floor</label>
              <select
                value={formData.floor}
                onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
              >
                <option value={1}>Floor 1</option>
                <option value={2}>Floor 2</option>
                <option value={3}>Floor 3</option>
              </select>
            </div>
            <div className="form-group">
              <label>Room Type</label>
              <select
                value={formData.type}
                onChange={(e) => {
                  const t = e.target.value;
                  const cap = t === 'Single' ? 1 : t === 'Double' ? 2 : 3;
                  setFormData({ ...formData, type: t, capacity: cap });
                }}
              >
                <option value="Single">Single (1 Bed)</option>
                <option value="Double">Double (2 Beds)</option>
                <option value="Triple">Triple (3 Beds)</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Bed Capacity</label>
              <input
                type="number"
                min="1"
                max="6"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Semester Fee (₹)</label>
              <input
                type="number"
                value={formData.pricePerSemester}
                onChange={(e) => setFormData({ ...formData, pricePerSemester: e.target.value })}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Amenities (Comma-separated)</label>
            <input
              type="text"
              placeholder="Wi-Fi, Study Desk, AC, Attached Bath"
              value={formData.amenities}
              onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <PlusCircle size={16} /> Save Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
