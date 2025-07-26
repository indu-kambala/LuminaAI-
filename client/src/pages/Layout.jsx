import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets'; // Assuming assets.logo is a white/light version for dark background
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar'; // Assuming Sidebar is already updated
import { SignIn, useUser } from '@clerk/clerk-react';

const Layout = () => {
    const navigate = useNavigate();
    const [sidebar, setSidebar] = useState(false);
    const { user } = useUser();

    return user ? (
        // Main container for authenticated user layout
        // Applied dark background to the entire layout
        <div className='flex flex-col items-start justify-start h-screen bg-gray-900'>

            {/* Top Navigation Bar for Dashboard (within Layout) */}
            {/* Styled to match the main Navbar component for consistency */}
            <nav className='w-full
                            bg-gray-900/90 backdrop-blur-md
                            flex items-center justify-between py-4 px-6 sm:px-20 xl:px-32
                            border-b border-gray-800 shadow-lg shadow-gray-900/20'>
                {/* Logo */}
                {/* Ensure this logo is suitable for a dark background (e.g., white or light version) */}
                <img
                    className='cursor-pointer h-9 sm:h-10' // Consistent logo size with main Navbar
                    src={assets.logo}
                    alt="Mindweave AI Logo"
                    onClick={() => navigate('/')}
                />
                {/* Mobile Menu/Close Icons */}
                {sidebar ? (
                    <X onClick={() => setSidebar(false)} className='w-6 h-6 text-white sm:hidden cursor-pointer' /> // White icon for dark background
                ) : (
                    <Menu onClick={() => setSidebar(true)} className='w-6 h-6 text-white sm:hidden cursor-pointer' /> // White icon for dark background
                )}
            </nav>

            {/* Main Content Area (Sidebar + Outlet) */}
            {/* Adjusted height to account for the new Navbar height.
                The main content background is also set to dark. */}
            <div className='flex-1 w-full flex h-[calc(100vh-72px)]'> {/* Adjusted height based on Navbar's new height (approx 72px) */}
                {/* Sidebar Component */}
                <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
                {/* Outlet for nested routes */}
                <div className='flex-1 bg-gray-900 overflow-y-auto'> {/* Dark background for content area, added overflow-y-auto */}
                    <Outlet />
                </div>
            </div>
        </div>
    ) : (
        // Full screen for unauthenticated users (SignIn component)
        // Applied dark background for consistency
        <div className='flex items-center justify-center h-screen bg-gray-900'>
            <SignIn /> {/* Clerk SignIn component */}
        </div>
    );
};

export default Layout;
