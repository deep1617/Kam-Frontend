import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import RestaurantList from './components/RestaurantList';
import RestaurantDetails from './components/RestaurantDetails';
import ContactList from './components/ContactList';
import InteractionList from './components/InteractionList';
import KAMList from './components/KAMList';
import Reports from './components/Reports';

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout wraps all routes to provide common navigation */}
        <Route path="/" element={<Layout />}>
          <Route index element={<RestaurantList />} />
          <Route path="restaurant/:id" element={<RestaurantDetails />} />
          <Route path="contacts" element={<ContactList />} />
          <Route path="interactions" element={<InteractionList />} />
          <Route path="kams" element={<KAMList />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
