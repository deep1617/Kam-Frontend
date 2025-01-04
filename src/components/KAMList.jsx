import React, { useEffect, useState } from 'react';

function KAMList() {
  const [kams, setKams] = useState([]); // KAM list
  const [newKAM, setNewKAM] = useState(''); // New KAM name

  // Fetch all KAMs on component mount
  useEffect(() => {
    fetchKAMs();
  }, []);

  const fetchKAMs = () => {
    fetch('https://kem-restaurant.onrender.com/api/kams')
      .then((response) => response.json())
      .then((data) => setKams(data))
      .catch((error) => console.error('Error fetching KAMs:', error));
  };

  // Handle input change for new KAM
  const handleInputChange = (e) => {
    setNewKAM(e.target.value);
  };

  // Handle form submission to create a new KAM
  const handleFormSubmit = (e) => {
    e.preventDefault();

    fetch('https://kem-restaurant.onrender.com/api/kams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newKAM }),
    })
      .then((response) => {
        if (response.ok) {
          alert('KAM created successfully!');
          setNewKAM(''); // Clear the input field
          fetchKAMs(); // Refresh the list
        } else {
          alert('Failed to create KAM.');
        }
      })
      .catch((error) => console.error('Error creating KAM:', error));
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">KAM List</h2>

      {/* KAM Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-black shadow rounded">
          <thead>
            <tr className="bg-black text-white text-left">
              <th className="p-4">KAM ID</th>
              <th className="p-4">Name</th>
            </tr>
          </thead>
          <tbody>
            {kams.map((kam) => (
              <tr key={kam.id} className="border-t">
                <td className="p-4">{kam.id}</td>
                <td className="p-4">{kam.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <hr className="my-6" />

      {/* Create New KAM Form */}
      <div className="w-full max-w-md mx-auto">
        <h3 className="text-xl font-bold mb-4">Create New KAM</h3>
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <div>
            <label className="block font-bold mb-1">KAM Name</label>
            <input
              type="text"
              value={newKAM}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter KAM Name"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          >
            Add KAM
          </button>
        </form>
      </div>
    </div>
  );
}

export default KAMList;
