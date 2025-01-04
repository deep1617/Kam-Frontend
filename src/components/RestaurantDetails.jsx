import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function RestaurantDetails() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    fetch(`/api/restaurants/${id}`)
      .then((response) => response.json())
      .then((data) => setRestaurant(data))
      .catch((error) => console.error('Error fetching restaurant details:', error));
  }, [id]);

  if (!restaurant) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-4 w-screen">
      <h2 className="text-2xl font-bold mb-4">{restaurant.name}</h2>
      <p>
        <span className="font-bold">Address:</span> {restaurant.address}
      </p>
      <p>
        <span className="font-bold">Contact Number:</span> {restaurant.contact_number}
      </p>
      <p>
        <span className="font-bold">Status:</span> {restaurant.current_status}
      </p>
      <p>
        <span className="font-bold">Assigned KAM:</span> {restaurant.assigned_kam_id}
      </p>

      <Link
        to="/"
        className="inline-block mt-4 text-blue-600 hover:underline"
      >
        Back to Restaurant List
      </Link>
    </div>
  );
}

export default RestaurantDetails;
