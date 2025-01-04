import React, { useEffect, useState } from 'react';

function ContactList() {
  const [contacts, setContacts] = useState([]); // Contacts list
  const [restaurantId, setRestaurantId] = useState(''); // Selected restaurant ID
  const [newContact, setNewContact] = useState({
    name: '',
    role: '',
    phone_number: '',
    email: '',
    restaurant_id: '',
  });

  // Fetch contacts for a specific restaurant
  const fetchContacts = (id) => {
    fetch(`https://kem-restaurant.onrender.com/api/contacts/${id}`)
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error('Error fetching contacts:', error));
  };

  // Handle fetching contacts when restaurant ID changes
  const handleRestaurantChange = (e) => {
    const id = e.target.value;
    setRestaurantId(id);
    if (id) {
      fetchContacts(id);
    } else {
      setContacts([]); // Clear the list if no restaurant ID is entered
    }
  };

  // Handle input changes for the new contact form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to add a new contact
  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetch('https://kem-restaurant.onrender.com/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newContact),
    })
      .then((response) => {
        if (response.ok) {
          alert('Contact created successfully!');
          setNewContact({ name: '', role: '', phone_number: '', email: '', restaurant_id: '' }); // Clear form
          if (newContact.restaurant_id) {
            fetchContacts(newContact.restaurant_id); // Refresh the contact list
          }
        } else {
          alert('Failed to create contact.');
        }
      })
      .catch((error) => console.error('Error creating contact:', error));
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Contact List</h2>

      {/* Filter by Restaurant ID */}
      <div className="mb-6">
        <label className="block font-bold mb-2">Enter Restaurant ID</label>
        <input
          type="number"
          value={restaurantId}
          onChange={handleRestaurantChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter Restaurant ID"
        />
      </div>

      {/* Contact List */}
      {contacts.length > 0 ? (
        <table className="table-auto w-full bg-black shadow rounded">
          <thead>
            <tr className="bg-black text-white text-left">
              <th className="p-4">Name</th>
              <th className="p-4">Role</th>
              <th className="p-4">Phone Number</th>
              <th className="p-4">Email</th>
              <th className="p-4">Restaurant ID</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id} className="border-t">
                <td className="p-4">{contact.name}</td>
                <td className="p-4">{contact.role}</td>
                <td className="p-4">{contact.phone_number}</td>
                <td className="p-4">{contact.email}</td>
                <td className="p-4">{contact.restaurant_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-center">No contacts found for the selected restaurant.</p>
      )}

      <hr className="my-6" />

      {/* New Contact Form */}
      <h2 className="text-xl font-bold mb-4 text-center">Add New Contact</h2>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label className="block font-bold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={newContact.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Contact Name"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Role</label>
          <input
            type="text"
            name="role"
            value={newContact.role}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Role (Owner, Manager, etc.)"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Phone Number</label>
          <input
            type="text"
            name="phone_number"
            value={newContact.phone_number}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Phone Number"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={newContact.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Email Address"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Restaurant ID</label>
          <input
            type="number"
            name="restaurant_id"
            value={newContact.restaurant_id}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Associated Restaurant ID"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Add Contact
        </button>
      </form>
    </div>
  );
}

export default ContactList;
