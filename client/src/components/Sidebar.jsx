import { Protect, useClerk, useUser } from '@clerk/clerk-react';
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
    { to: '/ai', label: 'Dashboard', Icon: House },
    { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
    { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
    { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
    { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
    { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
    { to: '/ai/review-resume', label: 'Review Resume', Icon: FileText },
    { to: '/ai/community', label: 'Community', Icon: Users },
];

const Sidebar = ({ sidebar, setSidebar }) => {
    const { user } = useUser();
    const { signOut, openUserProfile } = useClerk();

    return (
        // Main Sidebar container
        // Changed: Darker background, darker border, adjusted positioning for dark theme.
        // Added: Shadow for depth.
        <div className={`w-60 bg-gray-900 border-r border-gray-800
                        flex flex-col justify-between items-center
                        max-sm:absolute top-16 bottom-0 left-0 z-40
                        shadow-xl shadow-gray-950/30
                        ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'}
                        transition-all duration-300 ease-in-out`}>

            {/* Top User Info Section */}
            <div className='my-7 w-full'>
                {/* User Avatar */}
                <img src={user.imageUrl} alt="User avatar" className='w-16 h-16 rounded-full mx-auto object-cover border-2 border-blue-500 p-0.5' /> {/* Increased size, added border */}
                {/* User Full Name */}
                <h1 className='mt-3 text-center text-white text-lg font-semibold'>{user.fullName}</h1> {/* Changed text color, size, weight */}

                {/* Navigation Items */}
                <div className='px-6 mt-8 text-base text-gray-400 font-medium space-y-2'> {/* Adjusted padding, text color, font size, spacing */}
                    {navItems.map(({ to, label, Icon }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === '/ai'}
                            onClick={() => setSidebar(false)}
                            className={({ isActive }) =>
                                `px-4 py-3 flex items-center gap-4 rounded-lg
                                 hover:bg-gray-800 hover:text-white transition-colors duration-200
                                 ${isActive ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md shadow-blue-900/40' : ''}` // Enhanced active state gradient and shadow
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'}`} /> {/* Increased icon size, adjusted color */}
                                    {label}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* Bottom User Profile and Logout Section */}
            <div className='w-full border-t border-gray-800 p-4 px-7 flex items-center justify-between'>
                {/* User Profile Link */}
                <div onClick={openUserProfile} className='flex gap-3 items-center cursor-pointer hover:opacity-80 transition-opacity duration-200'> {/* Increased gap */}
                    <img src={user.imageUrl} className='w-9 h-9 rounded-full object-cover' alt="User avatar" /> {/* Adjusted size */}
                    <div>
                        <h1 className='text-sm font-medium text-white'>{user.fullName}</h1> {/* Changed text color */}
                        <p className='text-xs text-gray-500'>
                            {/* Clerk Protect component for plan display */}
                            <Protect plan='premium' fallback={<span className="text-gray-500">Free</span>}>
                                <span className="text-blue-400">Premium</span>
                            </Protect> Plan
                        </p>
                    </div>
                </div>
                {/* Logout Icon */}
                <LogOut onClick={signOut} className='w-5 h-5 text-gray-500 hover:text-blue-400 transition cursor-pointer' /> {/* Increased size, adjusted color and hover */}
            </div>
        </div>
    );
};

export default Sidebar;
