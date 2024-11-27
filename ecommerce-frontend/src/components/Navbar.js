import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Navbar = () => {
  const { isLoggedIn, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsDropdownOpen(false); // Close dropdown when toggling menu
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close menu when clicking a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const AdminNav = () => (
    <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
      <Link to="/admin/products" className="nav-link" onClick={handleLinkClick}>
        <i className="fas fa-box"></i>
        <span>Products</span>
      </Link>
      <div className={`nav-dropdown ${isDropdownOpen ? 'active' : ''}`}>
        <button className="nav-dropdown-btn" onClick={toggleDropdown}>
          <i className="fas fa-user-shield"></i>
          <span>{user?.name || "Admin"}</span>
        </button>
        <div className="nav-dropdown-content">
          <Link to="/admin/profile" onClick={handleLinkClick}>Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );

  const UserNav = () => (
    <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
      <Link to="/" className="nav-link" onClick={handleLinkClick}>
        <i className="fas fa-home"></i>
        <span>Home</span>
      </Link>
      <Link to="/products" className="nav-link" onClick={handleLinkClick}>
        <i className="fas fa-store"></i>
        <span>Products</span>
      </Link>
      <Link to="/cart" className="nav-link" onClick={handleLinkClick}>
        <i className="fas fa-shopping-cart"></i>
        <span>Cart</span>
      </Link>
      <Link to="/orders" className="nav-link" onClick={handleLinkClick}>
        <i className="fas fa-box"></i>
        <span>My Orders</span>
      </Link>
      <div className={`nav-dropdown ${isDropdownOpen ? 'active' : ''}`}>
        <button className="nav-dropdown-btn" onClick={toggleDropdown}>
          <i className="fas fa-user"></i>
          <span>{user?.name || "Account"}</span>
        </button>
        <div className="nav-dropdown-content">
          <Link to="/profile" onClick={handleLinkClick}>Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );

  const GuestNav = () => (
    <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
      <Link to="/" className="nav-link" onClick={handleLinkClick}>
        <i className="fas fa-home"></i>
        <span>Home</span>
      </Link>
      <Link to="/products" className="nav-link" onClick={handleLinkClick}>
        <i className="fas fa-store"></i>
        <span>Products</span>
      </Link>
      <Link to="/login" className="nav-link" onClick={handleLinkClick}>
        <i className="fas fa-sign-in-alt"></i>
        <span>Login</span>
      </Link>
      <Link to="/register" className="nav-link register-link" onClick={handleLinkClick}>
        <i className="fas fa-user-plus"></i>
        <span>Register</span>
      </Link>
    </div>
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to={isAdmin ? "/admin" : "/"} className="navbar-logo">
          <i className="fas fa-shopping-bag"></i>
          <span>{isAdmin ? "Admin Dashboard" : "E-Commerce"}</span>
        </Link>
        
        <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {isLoggedIn ? (isAdmin ? <AdminNav /> : <UserNav />) : <GuestNav />}
      </div>
    </nav>
  );
};

export default Navbar;
