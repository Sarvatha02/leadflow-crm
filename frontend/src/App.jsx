import { useState, useEffect } from 'react';
import * as api from './services/api';
import Dashboard from './components/Dashboard';
import LeadForm from './components/LeadForm';
import LeadList from './components/LeadList';
import './index.css';

function App() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);

  const loadLeads = async () => {
    setLoading(true);
    try {
      const data = await api.fetchLeads();
      setLeads(data);
      setError(null);
    } catch (err) {
      setError('Failed to load leads. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleAddLead = async (leadData) => {
    await api.createLead(leadData);
    loadLeads();
    setShowForm(false);
  };

  const filteredLeads = searchQuery 
    ? leads.filter(lead => 
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        lead.phone.includes(searchQuery)
      )
    : leads;

  const handleStatusUpdate = async (id, status) => {
    try {
      await api.updateLeadStatus(id, status);
      setLeads(leads.map(lead => lead.id === id ? { ...lead, status } : lead));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await api.deleteLead(id);
        setLeads(leads.filter(lead => lead.id !== id));
      } catch (err) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <span style={{ fontSize: '1.75rem' }}>💠</span>
          <h1>LeadFlow</h1>
        </div>
      </header>

      <main className="main-content">
        {error && <div className="alert error main-error">{error}</div>}
        
        <Dashboard leads={leads} />

        <div className="control-bar" style={{ marginBottom: '2rem' }}>
          <div className="search-group" style={{ position: 'relative', alignItems: 'center' }}>
            <span style={{ position: 'absolute', left: '12px', color: '#9ca3af' }}>🔍</span>
            <input 
              type="text" 
              placeholder="Search leads by name or phone..." 
              value={searchQuery}
              onChange={handleSearch}
              style={{ paddingLeft: '2.5rem' }}
            />
            {searchQuery && (
              <button type="button" className="btn danger-outline" onClick={handleClearSearch}>
                Clear
              </button>
            )}
          </div>
          <button className="btn primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Close Form' : '+ Add Lead'}
          </button>
        </div>

        {showForm && (
          <LeadForm onLeadAdded={handleAddLead} />
        )}

        <div className="content">
            {loading ? (
              <div className="loading-spinner">Loading leads...</div>
            ) : (
              <LeadList 
                leads={filteredLeads} 
                onStatusUpdate={handleStatusUpdate} 
                onDelete={handleDelete} 
              />
            )}
          </div>
      </main>
    </div>
  );
}

export default App;
