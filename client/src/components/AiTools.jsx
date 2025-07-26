import React from 'react';
import { AiToolsData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react'; // Assuming Clerk is used for auth

const AiTools = () => {
    const navigate = useNavigate();
    const { user } = useUser(); // User object from Clerk, still used for navigation logic

    return (
        // Main container for the section
        // Added: dark background, increased vertical padding, default text color white
        <div className='px-4 sm:px-20 xl:px-32 py-24 bg-gray-900 text-white'>
            {/* Section Header */}
            <div className='text-center'>
                {/* Heading: Changed text color for contrast on dark background */}
                <h2 className='text-white text-[42px] font-bold leading-tight'>
                    Unleash Your Creativity with <br className='hidden md:inline' />Powerful AI Tools
                </h2>
                {/* Paragraph: Adjusted text color for readability */}
                <p className='text-gray-400 max-w-2xl mx-auto mt-4 text-lg'>
                    Everything you need to create, enhance, and optimize your content with cutting-edge AI technology,
                    designed to elevate your projects effortlessly.
                </p>
            </div>

            {/* AI Tools Grid */}
            <div className='flex flex-wrap mt-16 justify-center gap-8'> {/* Added gap for better spacing */}
                {AiToolsData.map((tool, index) => (
                    // Individual Tool Card
                    // Changed: darker background, stronger shadow with a subtle blue glow,
                    // darker border, refined hover effect for more pop.
                    <div
                        key={index}
                        className='p-8 max-w-xs w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] xl:w-[calc(25%-1.5rem)]
                                   rounded-xl bg-gray-800 shadow-xl shadow-blue-500/10 border border-gray-700
                                   hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20
                                   transition-all duration-300 cursor-pointer flex flex-col items-center text-center'
                        onClick={() => user && navigate(tool.path)}
                    >
                        {/* Tool Icon */}
                        {/* Kept original dynamic gradient for icons, ensuring they stand out */}
                        <tool.Icon
                            className='w-14 h-14 p-3 text-white rounded-xl flex items-center justify-center' // Increased icon size slightly
                            style={{ background: `linear-gradient(to bottom right, ${tool.bg.from}, ${tool.bg.to})` }} // Adjusted gradient direction
                        />
                        {/* Tool Title: Changed text color for contrast */}
                        <h3 className='mt-6 mb-3 text-xl font-semibold text-white'>{tool.title}</h3> {/* Increased font size */}
                        {/* Tool Description: Adjusted text color */}
                        <p className='text-gray-400 text-sm max-w-[95%]'>{tool.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AiTools;