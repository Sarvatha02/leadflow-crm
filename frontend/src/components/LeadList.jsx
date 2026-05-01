import { useState } from 'react';

const LeadList = ({ leads, onStatusUpdate, onDelete }) => {
  if (!leads || leads.length === 0) {
    return (
      <div className="empty-state">
        <p>No leads yet. Add your first lead.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <div className="table-responsive">
        <table className="leads-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Source</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map(lead => (
              <tr key={lead.id}>
                <td>{lead.name}</td>
                <td>{lead.phone}</td>
                <td>
                  <span className={`badge source-${lead.source.toLowerCase()}`}>
                    {lead.source}
                  </span>
                </td>
                <td>
                  <select 
                    value={lead.status}
                    onChange={(e) => onStatusUpdate(lead.id, e.target.value)}
                    className={`status-badge status-${lead.status.replace(/\s+/g, '-').toLowerCase()}`}
                  >
                    <option value="Interested">Interested</option>
                    <option value="Not Interested">Not Interested</option>
                    <option value="Converted">Converted</option>
                  </select>
                </td>
                <td>
                  <button 
                    onClick={() => onDelete(lead.id)}
                    className="icon-btn danger"
                    title="Delete Lead"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadList;
