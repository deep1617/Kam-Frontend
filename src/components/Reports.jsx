import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [pendingCalls, setPendingCalls] = useState([]);
  const [recentInteractions, setRecentInteractions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data when the component mounts
  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch('/api/dashboard/leads').then((response) => response.json()),
      fetch('/api/dashboard/today-calls').then((response) => response.json()),
      fetch('/api/dashboard/recent-interactions').then((response) => response.json()),
    ])
      .then(([leadsData, callsData, interactionsData]) => {
        setLeads(leadsData);
        setPendingCalls(callsData);
        setRecentInteractions(interactionsData);
        setSearchResults(leadsData); // Initialize search results with all leads
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
        setLoading(false);
      });
  }, []);

  // Handle search functionality
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      fetch(`/api/dashboard/search?query=${query}`)
        .then((response) => response.json())
        .then((data) => setSearchResults(data))
        .catch((error) => console.error('Error searching leads:', error));
    } else {
      setSearchResults(leads); // Reset to all leads when search query is cleared
    }
  };

  if (loading) {
    return <div className="text-center p-4">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {/* Leads Section */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-2">Leads</h3>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search leads..."
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        {searchResults.length > 0 ? (
          <ul className="space-y-2">
            {searchResults.map((lead) => (
              <li key={lead.id} className="p-4 bg-black shadow rounded">
                <p><strong>Name:</strong> {lead.name}</p>
                <p><strong>Address:</strong> {lead.address}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No leads found.</p>
        )}
      </section>

      {/* Today's Calls Section */}
      <section className="mb-8">
        <h3 className="text-xl font-bold mb-2">Today's Pending Calls</h3>
        {pendingCalls.length > 0 ? (
          <ul className="space-y-2">
            {pendingCalls.map((call) => (
              <li key={call.id} className="p-4 bg-black shadow rounded">
                <p><strong>Notes:</strong> {call.notes}</p>
                <p><strong>Date:</strong> {call.date_of_interaction}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No pending calls for today.</p>
        )}
      </section>

      {/* Recent Interactions Section */}
      <section>
        <h3 className="text-xl font-bold mb-2">Recent Interactions</h3>
        {recentInteractions.length > 0 ? (
          <ul className="space-y-2">
            {recentInteractions.map((interaction) => (
              <li key={interaction.id} className="p-4 bg-black shadow rounded">
                <p><strong>Notes:</strong> {interaction.notes}</p>
                <p><strong>Type:</strong> {interaction.type}</p>
                <p><strong>Date:</strong> {interaction.date_of_interaction}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No recent interactions available.</p>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
