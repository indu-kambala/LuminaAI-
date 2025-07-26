import React, { useState } from 'react';
import Markdown from 'react-markdown';

const CreationItem = ({ item }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        // Main container for each creation item
        // Changed: Darker background, stronger shadow, refined border, increased padding, subtle hover effect.
        <div
            onClick={() => setExpanded(!expanded)}
            className='p-6 max-w-5xl w-full text-sm
                       bg-gray-800 border border-gray-700 rounded-lg
                       shadow-md shadow-gray-700/10
                       hover:bg-gray-700 hover:shadow-lg hover:shadow-gray-600/15
                       transition-all duration-200 cursor-pointer'
        >
            {/* Header section with prompt, type, and date */}
            <div className='flex justify-between items-center gap-4'>
                <div>
                    {/* Prompt Title: Changed text color for contrast */}
                    <h2 className='text-white text-base font-semibold'>{item.prompt}</h2>
                    {/* Type and Date: Adjusted text color for readability */}
                    <p className='text-gray-400 text-xs mt-1'>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)} - {new Date(item.created_at).toLocaleDateString()}
                    </p>
                </div>
                {/* Type Button */}
                {/* Changed: Darker background, blue border, lighter blue text to fit dark theme */}
                <button className='bg-blue-900/20 border border-blue-700 text-blue-300
                                   px-4 py-1 rounded-full text-xs font-medium
                                   hover:bg-blue-800/30 transition-colors duration-200'>
                    {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </button>
            </div>

            {/* Expanded Content Section */}
            {expanded && (
                <div className='mt-4 pt-4 border-t border-gray-700'> {/* Added top border for separation */}
                    {item.type === 'image' ? (
                        // Image content
                        <div className='flex justify-center'> {/* Centered image */}
                            <img src={item.content} alt="Generated image" className='mt-3 w-full max-w-md rounded-lg shadow-md' /> {/* Added rounded corners and shadow */}
                        </div>
                    ) : (
                        // Text content (Markdown)
                        // Adjusted text color for readability on dark background
                        <div className='mt-3 h-full overflow-y-auto text-sm text-gray-300 leading-relaxed'> {/* Added leading-relaxed for better line spacing */}
                            <div className='reset-tw'>
                                <Markdown>{item.content}</Markdown>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CreationItem;
