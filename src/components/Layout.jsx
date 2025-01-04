import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col gap-10 items-center w-screen">
      <header className="bg-gray-800 text-white p-4">
        <nav className="container mx-auto flex justify-between">
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:underline">
                Restaurant List
              </Link>
            </li>
            <li>
              <Link to="/contacts" className="hover:underline">
                Contact List
              </Link>
            </li>
            <li>
              <Link to="/interactions" className="hover:underline">
                Interaction List
              </Link>
            </li>
            <li>
              <Link to="/kams" className="hover:underline">
                KAM List
              </Link>
            </li>
            <li>
              <Link to="/reports" className="hover:underline">
                Reports
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
