import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PageTemplate = ({ children } = props) => (
  <>
    <Header />
    { children }
    <Footer />
  </>
);

export default PageTemplate;