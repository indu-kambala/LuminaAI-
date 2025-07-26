import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import WriteArticle from './pages/WriteArticle';
import BlogTitles from './pages/BlogTitles';
import GenerateImages from './pages/GenerateImages';
import RemoveBackground from './pages/RemoveBackground';
import RemoveObject from './pages/RemoveObject';
import ReviewResume from './pages/ReviewResume';
import Community from './pages/Community';
import { Toaster } from 'react-hot-toast'; // Ensure Toaster is consistent with dark theme if needed

const App = () => {
  return (
    // This div serves as the root container for your application.
    // Since individual pages (Home, Layout, Dashboard, etc.)
    // now handle their own backgrounds and styling, this div
    // doesn't need specific UI classes for background or text color,
    // as it will be covered by its child routes.
    <div>
      {/* Toaster for notifications - ensures consistent styling across the app */}
      <Toaster
        position="top-center" // You can adjust position if desired
        toastOptions={{
          style: {
            background: '#333', // Dark background for toasts
            color: '#fff',     // White text for toasts
          },
          success: {
            iconTheme: {
              primary: '#4CAF50', // Green for success icon
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#F44336', // Red for error icon
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        {/* All /ai/* routes will render within the Layout component */}
        <Route path='/ai' element={<Layout />}>
          <Route index element={<Dashboard />} /> {/* Default route for /ai */}
          <Route path='write-article' element={<WriteArticle />} />
          <Route path='blog-titles' element={<BlogTitles />} />
          <Route path='generate-images' element={<GenerateImages />} />
          <Route path='remove-background' element={<RemoveBackground />} />
          <Route path='remove-object' element={<RemoveObject />} />
          <Route path='review-resume' element={<ReviewResume />} />
          <Route path='community' element={<Community />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
