import React from 'react';
import { assets } from '../assets/assets'; // Assuming assets.logo is a white/light version for dark background
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { openSignIn } = useClerk();

    return (
        // Main Navbar container
        // Changed: Darker background, added subtle border and shadow for depth,
        // increased padding, and ensured full width with z-index for fixed position.
        <div className='fixed top-0 left-0 z-50 w-full
                        bg-gray-900/90 backdrop-blur-md
                        flex justify-between items-center py-4 px-6 sm:px-20 xl:px-32
                        border-b border-gray-800 shadow-lg shadow-gray-900/20'>
            {/* Logo */}
            {/* Adjusted logo width for better visual balance */}
            <img
                src={assets.logo} // Ensure this logo is suitable for a dark background (e.g., white or light version)
                alt="Mindweave AI Logo"
                className='h-9 sm:h-10 cursor-pointer' // Slightly increased height for prominence
                onClick={() => navigate('/')}
            />

            {/* User Authentication Button / User Profile */}
            {user ? (
                // Clerk's UserButton component - styling is mostly controlled by Clerk,
                // but its container can be influenced by surrounding flex properties.
                <UserButton />
            ) : (
                // "Get started" button for unauthenticated users
                // Styled to match the primary button in the Hero section for consistency.
                <button
                    onClick={openSignIn}
                    className='flex items-center gap-2 rounded-full
                               bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3
                               font-semibold text-sm sm:text-base
                               shadow-md shadow-blue-600/30 hover:bg-blue-700
                               hover:shadow-lg hover:shadow-blue-600/40
                               active:scale-98 transition-all duration-200 cursor-pointer'
                >
                    Get started <ArrowRight className='w-4 h-4' />
                </button>
            )}
        </div>
    );
};

export default Navbar;
