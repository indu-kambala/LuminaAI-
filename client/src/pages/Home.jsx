import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AiTools from '../components/AiTools';
import Testimonial from '../components/Testimonial';
import Plan from '../components/Plan';
import Footer from '../components/Footer';

const Home = () => {
  return (
    // Wrap all components in a div to apply a consistent dark background
    // This ensures the entire page has the desired dark theme.
    <div className="bg-gray-900 min-h-screen"> {/* Apply dark background and ensure it covers the screen */}
      <Navbar />
      <Hero />
      <AiTools />
      <Testimonial />
      <Plan />
      <Footer />
    </div>
  );
};

export default Home;
