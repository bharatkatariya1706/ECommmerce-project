import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import {Toaster} from 'react-hot-toast'
// import { ToastContainer } from 'react-toastify';

// import 'react-toastify/dist/ReactToastify.css';
// import { Toaster } from "react-hot-toast";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster/>

        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title:"Ecommerce app - Shop Now",
  description:"mern Stack project",
  keywords:"mern , react, node ,mongodb",
  author:"bharat",
};
export default Layout; // Export 'Layout' instead of 'layout'
