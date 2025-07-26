import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets'; // Assuming assets.user_group is the correct path

const Hero = () => {
    const navigate = useNavigate();

    return (
        // Main container for the hero section
        // Changed: Background to a dark gradient, increased min-height for more visual impact.
        // Removed: bg-[url(/gradientBackground.png)] to use a gradient defined by Tailwind classes.
        <div className='px-4 sm:px-20 xl:px-32 relative
                        flex flex-col w-full justify-center items-center
                        bg-gradient-to-br from-gray-900 to-gray-800
                        min-h-[calc(100vh-80px)] text-white py-20'> {/* Adjusted min-height and added overall text-white */}

            {/* Hero Text Content */}
            <div className='text-center mb-10'> {/* Increased bottom margin for more separation */}
                {/* Main Heading */}
                {/* Changed: Text color to white, increased font size for impact, adjusted leading. */}
                {/* Updated "Quick.ai" to "Mindweave AI" */}
                <h1 className='text-4xl sm:text-6xl md:text-7xl 2xl:text-8xl
                               font-extrabold mx-auto leading-tight text-white'>
                    Create amazing content <br className='hidden sm:inline'/> with <span className='text-blue-500'>Mindweave AI</span>
                </h1>
                {/* Sub-paragraph */}
                {/* Changed: Text color to a lighter gray for readability on dark background, increased max-width. */}
                <p className='mt-6 max-w-sm sm:max-w-xl 2xl:max-w-2xl mx-auto
                              text-base sm:text-lg text-gray-300 leading-relaxed'>
                    Transform your content creation with our suite of intelligent AI tools.
                    Generate compelling text, create stunning images, and enhance your workflow
                    with unparalleled efficiency.
                </p>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-wrap justify-center gap-6 text-base'> {/* Increased gap and text size */}
                {/* Primary Button */}
                {/* Changed: Stronger blue background, added shadow, refined hover/active states. */}
                <button
                    onClick={() => navigate('/ai')}
                    className='bg-blue-600 text-white px-12 py-4 rounded-lg
                               shadow-lg shadow-blue-600/30 hover:bg-blue-700
                               hover:shadow-xl hover:shadow-blue-600/40
                               active:scale-98 transition-all duration-200 cursor-pointer font-semibold'
                >
                    Start creating now
                </button>
                {/* Secondary Button */}
                {/* Changed: Transparent background, white border, lighter text, refined hover/active states. */}
                <button
                    className='bg-transparent text-white px-12 py-4 rounded-lg
                               border border-gray-500 hover:border-blue-500 hover:text-blue-500
                               active:scale-98 transition-all duration-200 cursor-pointer font-semibold'
                >
                    Watch demo
                </button>
            </div>

            {/* "Trusted by" Section */}
            {/* Changed: Text color for readability, adjusted spacing. */}
            <div className='flex items-center gap-4 mt-12 text-gray-400 text-lg'> {/* Increased top margin and text size */}
                <img src={assets.user_group} alt="User group icon" className='h-9' /> {/* Slightly increased icon height */}
                Trusted by 10k+ creators
            </div>
        </div>
    );
};

export default Hero;
