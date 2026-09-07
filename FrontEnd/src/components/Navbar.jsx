// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { logout } from "../services/authService";

// export default function Navbar() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   const signOut = () => {
//     logout();
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark ims-navbar sticky-top">
//       <div className="container-fluid px-3 px-lg-4">
//         <NavLink className="navbar-brand fw-bold" to="/dashboard">
//           <i className="bi bi-box-seam me-2"></i>IMS
//         </NavLink>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#imsNav">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="imsNav">
//           <div className="navbar-nav ms-lg-4 gap-lg-1">
//             <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
//             <NavLink className="nav-link" to="/products">Products</NavLink>
//             <NavLink className="nav-link" to="/categories">Categories</NavLink>
//           </div>
//           <div className="ms-auto d-flex align-items-center gap-3 mt-3 mt-lg-0">
//             <span className="text-white small"><i className="bi bi-person-circle me-1"></i>{user.name || user.email || "User"}</span>
//             <button className="btn btn-outline-light btn-sm" onClick={signOut}>
//               <i className="bi bi-box-arrow-right me-1"></i>Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    closeMenu();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">

        {/* Logo */}
        <Link
          to="/dashboard"
          className="navbar-brand fw-bold"
          onClick={closeMenu}
        >
          IMS
        </Link>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="navbar-toggler"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-controls="imsNavbar"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menu */}
        <div
          id="imsNavbar"
          className={`collapse navbar-collapse ${
            menuOpen ? "show" : ""
          }`}
        >
          <ul className="navbar-nav ms-auto align-items-lg-center">

            {/* Dashboard */}
            <li className="nav-item">
              <Link
                to="/dashboard"
                className="nav-link"
                onClick={closeMenu}
              >
                Dashboard
              </Link>
            </li>

            {/* Products */}
            <li className="nav-item">
              <Link
                to="/products"
                className="nav-link"
                onClick={closeMenu}
              >
                Products
              </Link>
            </li>

            {/* Categories */}
            <li className="nav-item">
              <Link
                to="/categories"
                className="nav-link"
                onClick={closeMenu}
              >
                Categories
              </Link>
            </li>

            {/* Logout */}
            <li className="nav-item ms-lg-2">
              <button
                className="btn btn-outline-light btn-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;