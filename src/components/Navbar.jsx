import React from "react";

const Navbar = () => {
    return ( 
        <nav className="navbar navbar-expand-md navbar-dark brown-bg">
        <div className="container-fluid">
          <a href="#" className="navbar-brand">☕ Cafe Finder</a>
          <button className="navbar-toggler" type='button' data-bs-toggle='collapse'
            data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
            <span className="sr-only">Toggle navigation</span>
          </button>
          <div id="navbarNav" className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link active" href="#">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Favorites</a></li>
              <li className="nav-item"><a className="nav-link" href="#">About</a></li>
            </ul>
          </div>
        </div>
      </nav>
     );
}
 
export default Navbar;