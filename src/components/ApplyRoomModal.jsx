import React, { useState } from 'react';
import { X, Send, Award, HelpCircle } from 'lucide-react';

export default function ApplyRoomModal({ isOpen, onClose, onSubmitApplication }) {
  const [formData, setFormData] = useState({
    studentName: '',
    rollNo: '',
    email: '',
    gpa: 8.5,
    distanceKm: 450,
    specialNeed: false,
    preferredType: 'Double',
    preferredFloor: 1
  });

  if (!isOpen) return null;

  // Live calculation of transparent priority score
  const gpaWeight = ((Number(formData.gpa) || 0) / 10.0) * 50.0;
  const distanceWeight = Math.min(30.0, ((Number(formData.distanceKm) || 0) / 600.0) * 30.0);
  const specialBonus = formData.specialNeed ? 20.0 : 0.0;
  const estimatedScore = (gpaWeight + distanceWeight + specialBonus).toFixed(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.rollNo) {
      alert('Please fill in Student Name and Roll Number');
      return;
    }
    onSubmitApplication(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <h3>Apply for Room Allotment</h3>
            <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
              Submit your room preference and academic details
            </p>
          </div>
          <button className="btn btn-outline btn-sm" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={formData.studentName}
              onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Roll / Student ID</label>
              <input
                type="text"
                placeholder="e.g. CS2510"
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="student@university.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Academic GPA (1.0 - 10.0)</label>
              <input
                type="number"
                step="0.1"
                min="1.0"
                max="10.0"
                value={formData.gpa}
                onChange={(e) => setFormData({ ...formData, gpa: parseFloat(e.target.value) || 0 })}
                required
              />
            </div>
            <div className="form-group">
              <label>Hometown Distance (in km)</label>
              <input
                type="number"
                min="0"
                value={formData.distanceKm}
                onChange={(e) => setFormData({ ...formData, distanceKm: parseInt(e.target.value) || 0 })}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Preferred Room Type</label>
              <select
                value={formData.preferredType}
                onChange={(e) => setFormData({ ...formData, preferredType: e.target.value })}
              >
                <option value="Single">Single (Private)</option>
                <option value="Double">Double (Shared 2)</option>
                <option value="Triple">Triple (Shared 3)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Preferred Floor</label>
              <select
                value={formData.preferredFloor}
                onChange={(e) => setFormData({ ...formData, preferredFloor: parseInt(e.target.value) })}
              >
                <option value={1}>Floor 1 (Ground)</option>
                <option value={2}>Floor 2</option>
                <option value={3}>Floor 3</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: '#f8fafc', padding: '0.75rem', borderRadius: '8px' }}>
            <input
              type="checkbox"
              id="specialNeed"
              checked={formData.specialNeed}
              onChange={(e) => setFormData({ ...formData, specialNeed: e.target.checked })}
              style={{ width: 'auto', margin: 0 }}
            />
            <label htmlFor="specialNeed" style={{ margin: 0, fontSize: '0.8rem', cursor: 'pointer' }}>
              Special Accessibility / Medical Need (Ground Floor Priority + 20 Bonus Pts)
            </label>
          </div>

          {/* Transparent Score Preview */}
          <div style={{ background: '#eef2ff', border: '1px solid #c7d2fe', padding: '0.85rem', borderRadius: '8px', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#4338ca' }}>
                  Transparent Allotment Priority Score:
                </span>
                <div style={{ fontSize: '0.72rem', color: '#6366f1' }}>
                  Merit: {gpaWeight.toFixed(1)} pts • Distance: {distanceWeight.toFixed(1)} pts • Needs: {specialBonus} pts
                </div>
              </div>
              <span className="score-pill" style={{ fontSize: '1.1rem', padding: '4px 10px' }}>
                <Award size={16} /> {estimatedScore}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Send size={15} /> Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
