import React, { useEffect, useState } from 'react';

function InteractionList() {
  const [interactions, setInteractions] = useState([]); // List of interactions
  const [restaurantId, setRestaurantId] = useState(''); // Selected restaurant ID
  const [newInteraction, setNewInteraction] = useState({
    restaurant_id: '',
    date_of_interaction: '',
    type: '',
    notes: '',
    follow_up_required: false,
  });

  // Fetch interactions by restaurant ID
  const fetchInteractions = (id) => {
    fetch(`/api/interactions/${id}`)
      .then((response) => response.json())
      .then((data) => setInteractions(data))
      .catch((error) => console.error('Error fetching interactions:', error));
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? e.target.checked : value;
    setNewInteraction((prev) => ({ ...prev, [name]: val }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch('/api/interactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInteraction),
    })
      .then((response) => {
        if (response.ok) {
          alert('Interaction logged successfully!');
          setNewInteraction({
            restaurant_id: '',
            date_of_interaction: '',
            type: '',
            notes: '',
            follow_up_required: false,
          }); // Clear form
          if (newInteraction.restaurant_id) {
            fetchInteractions(newInteraction.restaurant_id); // Refresh the interaction list
          }
        } else {
          alert('Failed to log interaction.');
        }
      })
      .catch((error) => console.error('Error logging interaction:', error));
  };

  const handleRestaurantChange = (e) => {
    const id = e.target.value;
    setRestaurantId(id);
    if (id) {
      fetchInteractions(id); // Fetch interactions for the selected restaurant
    } else {
      setInteractions([]); // Clear interactions when no restaurant is selected
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Interaction List</h2>

      {/* Select Restaurant */}
      <div className="mb-6">
        <label className="block font-bold mb-2">Select Restaurant</label>
        <input
          type="number"
          value={restaurantId}
          onChange={handleRestaurantChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter Restaurant ID"
        />
      </div>

      {/* Interaction List */}
      {interactions.length > 0 ? (
        <ul className="space-y-4">
          {interactions.map((interaction) => (
            <li key={interaction.id} className="p-4 bg-black shadow rounded">
              <p><strong>Date:</strong> {interaction.date_of_interaction}</p>
              <p><strong>Type:</strong> {interaction.type}</p>
              <p><strong>Notes:</strong> {interaction.notes}</p>
              <p><strong>Follow-Up Required:</strong> {interaction.follow_up_required ? 'Yes' : 'No'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No interactions found for the selected restaurant.</p>
      )}

      <hr className="my-6" />

      {/* Log New Interaction Form */}
      <h2 className="text-xl font-bold mb-4">Log New Interaction</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label className="block font-bold mb-1">Restaurant ID</label>
          <input
            type="number"
            name="restaurant_id"
            value={newInteraction.restaurant_id}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter Restaurant ID"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Date of Interaction</label>
          <input
            type="date"
            name="date_of_interaction"
            value={newInteraction.date_of_interaction}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Type</label>
          <select
            name="type"
            value={newInteraction.type}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Type</option>
            <option value="Call">Call</option>
            <option value="Visit">Visit</option>
            <option value="Order">Order</option>
          </select>
        </div>
        <div>
          <label className="block font-bold mb-1">Notes</label>
          <textarea
            name="notes"
            value={newInteraction.notes}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter notes about the interaction"
            required
          ></textarea>
        </div>
        <div>
          <label className="block font-bold mb-1">
            <input
              type="checkbox"
              name="follow_up_required"
              checked={newInteraction.follow_up_required}
              onChange={handleInputChange}
              className="mr-2"
            />
            Follow-Up Required
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Log Interaction
        </button>
      </form>
    </div>
  );
}

export default InteractionList;
