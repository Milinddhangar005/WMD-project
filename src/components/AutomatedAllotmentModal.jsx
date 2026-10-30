import React, { useState } from 'react';
import { X, Cpu, CheckCircle2, Award, Zap, AlertCircle } from 'lucide-react';

export default function AutomatedAllotmentModal({ isOpen, onClose, onRunAllotment, isProcessing, results }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ maxWidth: '640px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ background: '#eef2ff', padding: '6px', borderRadius: '8px', color: '#4f46e5' }}>
              <Cpu size={22} />
            </div>
            <div>
              <h3>Automated Smart Allotment Engine</h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Algorithmic, Transparent & Fair Allocation
              </p>
            </div>
          </div>
          <button className="btn btn-outline btn-sm" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Algorithm Highlights */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', marginBottom: '1.25rem' }}>
          <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155', marginBottom: '0.5rem' }}>
            Fair Allocation Criteria:
          </h4>
          <ul style={{ fontSize: '0.8rem', color: '#64748b', paddingLeft: '1.2rem', lineHeight: 1.6 }}>
            <li><strong>50% Academic Merit:</strong> Scaled directly from applicant GPA (1.0 - 10.0 scale).</li>
            <li><strong>30% Distance Need:</strong> Prioritizes students traveling from distant hometowns (&gt;600 km).</li>
            <li><strong>20% Special Need Priority:</strong> Accessibility & medical requirements guarantee Ground Floor (Floor 1).</li>
            <li><strong>Space Optimization:</strong> Intelligently fills partially occupied rooms to maximize dormitory efficiency.</li>
          </ul>
        </div>

        {results ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', marginBottom: '1rem', fontWeight: 700 }}>
              <CheckCircle2 size={20} />
              <span>Allotment Complete: {results.allocatedCount} students allocated!</span>
            </div>

            <div className="table-container" style={{ maxHeight: '240px', overflowY: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Score</th>
                    <th>Allotted Room</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {results.results &&
                    results.results.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <strong>{item.request.studentName}</strong>
                          <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{item.request.rollNo}</div>
                        </td>
                        <td>
                          <span className="score-pill">{item.request.priorityScore}</span>
                        </td>
                        <td>
                          {item.room ? (
                            <span style={{ fontWeight: 600, color: '#4f46e5' }}>
                              Room {item.room.roomNumber} ({item.room.block}, Fl {item.room.floor})
                            </span>
                          ) : (
                            <span style={{ color: '#ef4444' }}>Waitlist</span>
                          )}
                        </td>
                        <td>
                          <span className={`status-pill ${item.status === 'Allotted' ? 'available' : 'maintenance'}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-primary" onClick={onClose}>
                Done & Review Occupancy
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '1.5rem' }}>
              Clicking below will process all pending student allotment applications in real time, rank them by transparent priority score, and assign them to eligible vacant rooms.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button className="btn btn-outline" onClick={onClose} disabled={isProcessing}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={onRunAllotment} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Zap size={16} className="animate-spin" /> Processing Allotment...
                  </>
                ) : (
                  <>
                    <Zap size={16} /> Execute Fair Allotment Now
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
