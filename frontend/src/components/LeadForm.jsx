import { useState } from 'react';

const LeadForm = ({ onLeadAdded }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', source: 'Call' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.submitter && e.submitter.blur();
    e.preventDefault();
    
    let validationErrors = [];
    
    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      validationErrors.push('Name must not be empty or contain only spaces.');
    } else {
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!nameRegex.test(trimmedName)) {
        validationErrors.push('Name must contain only letters and spaces.');
      }
    }
    
    if (!formData.phone) {
      validationErrors.push('Phone must not be empty.');
    } else {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(formData.phone)) {
        validationErrors.push('Phone must contain exactly 10 digits.');
      }
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors([]);
    try {
      await onLeadAdded({ ...formData, name: trimmedName });
      setFormData({ name: '', phone: '', source: 'Call' });
    } catch (err) {
      setErrors([err.message || 'An error occurred while saving the lead.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card form-container">
      <h2>Add New Lead</h2>
      {errors.length > 0 && (
        <div className="alert error">
          <ul style={{ margin: 0, paddingLeft: '1.2rem' }}>
            {errors.map((err, idx) => <li key={idx}>{err}</li>)}
          </ul>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => {
                setFormData({...formData, name: e.target.value});
                setErrors([]);
              }}
              placeholder="John Doe"
              required 
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Phone</label>
            <input 
              type="tel" 
              value={formData.phone}
              onChange={(e) => {
                setFormData({...formData, phone: e.target.value});
                setErrors([]);
              }}
              placeholder="+1 234 567 890"
              required 
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label>Source</label>
            <select 
              value={formData.source}
              onChange={(e) => setFormData({...formData, source: e.target.value})}
            >
              <option value="Call">Call</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Field">Field</option>
            </select>
          </div>
        </div>
        <div style={{ textAlign: 'right', marginTop: '1rem' }}>
          <button type="submit" className="btn primary" disabled={loading} style={{ width: 'auto' }}>
            {loading ? 'Adding...' : 'Add Lead'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LeadForm;
