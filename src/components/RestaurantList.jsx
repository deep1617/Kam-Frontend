import React, { useEffect, useState } from 'react';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);
  const [newRestaurant, setNewRestaurant] = useState({
    name: '',
    address: '',
    contact_number: '',
    current_status: '',
    assigned_kam_id: '',
  });

  // Fetch the list of restaurants
  useEffect(() => {
    fetch('/api/restaurants')
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) => console.error('Error fetching restaurants:', error));
  }, []);

  // Handle input changes for the new restaurant form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRestaurant((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to create a new restaurant
  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch('/api/restaurants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRestaurant),
    })
      .then((response) => {
        if (response.ok) {
          alert('Restaurant created successfully!');
          // Refresh the restaurant list
          fetch('/api/restaurants')
            .then((response) => response.json())
            .then((data) => setRestaurants(data));
          // Clear the form
          setNewRestaurant({
            name: '',
            address: '',
            contact_number: '',
            current_status: '',
            assigned_kam_id: '',
          });
        } else {
          alert('Failed to create the restaurant. Please try again.');
        }
      })
      .catch((error) => console.error('Error creating restaurant:', error));
  };

  return (
    <div className="min-h-screen flex flex-col gap-10 items-center w-screen">
      <h2 className="text-2xl font-bold mb-4">Restaurant List</h2>

      {/* Restaurant List */}
      <ul className="space-y-4">
        {restaurants.map((restaurant) => (
          <li
            key={restaurant.id}
            className="p-4 bg-black shadow rounded hover:shadow-lg transition"
          >
            <h3 className="font-bold text-lg">{restaurant.name}</h3>
            <p>{restaurant.address}</p>
            <p>Contact: {restaurant.contact_number}</p>
            <p>Status: {restaurant.current_status}</p>
            <p>KAM ID: {restaurant.assigned_kam_id}</p>
          </li>
        ))}
      </ul>

      <hr className="my-6" />

      {/* New Restaurant Form */}
      <h2 className="text-xl font-bold mb-4">Create a New Restaurant</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label className="block font-bold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={newRestaurant.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter restaurant name"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={newRestaurant.address}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter restaurant address"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Contact Number</label>
          <input
            type="text"
            name="contact_number"
            value={newRestaurant.contact_number}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter contact number"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Current Status</label>
          <select
            name="current_status"
            value={newRestaurant.current_status}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="New">New</option>
          </select>
        </div>
        <div>
          <label className="block font-bold mb-1">Assigned KAM ID</label>
          <input
            type="number"
            name="assigned_kam_id"
            value={newRestaurant.assigned_kam_id}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter KAM ID"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Create Restaurant
        </button>
      </form>
    </div>
  );
}

export default RestaurantList;
