const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/leads';

export const fetchLeads = async (searchQuery = '') => {
  const url = searchQuery ? `${API_URL}?search=${encodeURIComponent(searchQuery)}` : API_URL;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch leads');
  return response.json();
};

export const createLead = async (leadData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData),
  });
  if (!response.ok) throw new Error('Failed to create lead');
  return response.json();
};

export const updateLeadStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error('Failed to update status');
  return response.json();
};

export const deleteLead = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete lead');
  return response.json();
};
