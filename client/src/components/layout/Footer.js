import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer"
    >
      <h1 className="text-center ">© 2024 My Website. All rights reserved.</h1>
      <p className='text-center mt-3'>
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|<Link to="/policy">Privacy Policy</Link>
      </p>
    </footer>
  );
}

export default Footer;


