import React from 'react';
import { Menubar } from 'primereact/menubar';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const showLogoutButton = location.pathname === '/user';

  

  return (
    <div className="container">
      <Menubar className="menu" start={
        showLogoutButton ? (
          <div className="right-logout">
          </div>
        ) : (
          <>
            <Link to="/register">
              <button className="p-link">
                <span className="pi pi-user-plus"></span>
                Register
              </button>
            </Link>
            
          </>
        )
      } />
    </div>
  );
}

export default Navbar;
