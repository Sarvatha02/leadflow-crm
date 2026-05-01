const Dashboard = ({ leads }) => {
  const totalLeads = leads.length;
  const convertedLeads = leads.filter(l => l.status === 'Converted').length;
  const interestedLeads = leads.filter(l => l.status === 'Interested').length;
  
  const conversionRate = totalLeads === 0 ? 0 : Math.round((convertedLeads / totalLeads) * 100);

  return (
    <div className="dashboard">
      <div className="stat-card">
        <h3>Total Leads</h3>
        <p className="stat-value">{totalLeads}</p>
      </div>
      <div className="stat-card">
        <h3>Converted</h3>
        <p className="stat-value highlight">{convertedLeads}</p>
      </div>
      <div className="stat-card">
        <h3>Interested</h3>
        <p className="stat-value info">{interestedLeads}</p>
      </div>
      <div className="stat-card">
        <h3>Conversion Rate</h3>
        <p className="stat-value success">{conversionRate}%</p>
      </div>
    </div>
  );
};

export default Dashboard;
