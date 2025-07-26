import { useAuth } from '@clerk/clerk-react';
import { Hash, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
    const blogCategories = [
        'General', 'Technology', 'Business', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food'
    ];

    const [selectedCategory, setSelectedCategory] = useState('General');
    const [input, setInput] = useState('');

    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');

    const { getToken } = useAuth();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`;

            // Backend logic remains unchanged as per your instruction
            const { data } = await axios.post('/api/ai/generate-blog-title', { prompt }, { headers: { Authorization: `Bearer ${await getToken()}` } });

            if (data.success) {
                setContent(data.content);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    };

    return (
        // Main container for the Blog Titles page
        // Changed: Dark background, increased padding, adjusted gap between columns.
        <div className='h-full overflow-y-scroll p-8 sm:p-10 md:p-12
                        flex flex-col lg:flex-row items-start lg:items-stretch
                        gap-8 bg-gray-900 text-white'> {/* Added dark background and default text color */}

            {/* Left Column: Input Form */}
            <form onSubmit={onSubmitHandler}
                  className='w-full max-w-full lg:max-w-lg p-6 bg-gray-800 rounded-xl
                             border border-gray-700 shadow-lg shadow-gray-900/20 flex-shrink-0'> {/* Darker card, shadow, rounded */}
                <div className='flex items-center gap-3 mb-6'> {/* Increased bottom margin */}
                    <Sparkles className='w-7 h-7 text-blue-500' /> {/* Changed icon color to blue accent, increased size */}
                    <h1 className='text-2xl font-semibold text-white'>AI Title Generator</h1> {/* Changed text color, size */}
                </div>

                <p className='mt-4 text-base font-medium text-gray-300'>Keyword</p> {/* Adjusted text color, size */}
                <input
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    type="text"
                    className='w-full p-3 px-4 mt-2 outline-none text-base rounded-md
                               border border-gray-600 bg-gray-700 text-white placeholder-gray-500
                               focus:ring-2 ring-blue-500 transition-colors duration-200' // Darker input, better focus, larger padding
                    placeholder='The future of artificial intelligence is...'
                    required
                />

                <p className='mt-6 text-base font-medium text-gray-300'>Category</p> {/* Adjusted text color, size, margin */}
                <div className='mt-3 flex gap-3 flex-wrap'>
                    {blogCategories.map((item) => (
                        <span
                            onClick={() => setSelectedCategory(item)}
                            className={`text-sm px-5 py-2 border rounded-full cursor-pointer
                                        transition-colors duration-200 font-medium
                                        ${selectedCategory === item
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-900/30' // Vibrant blue active state
                                            : 'text-gray-400 border-gray-600 bg-gray-700 hover:bg-gray-600 hover:text-white' // Darker inactive state
                                        }`}
                            key={item}
                        >
                            {item}
                        </span>
                    ))}
                </div>

                {/* Generate Button */}
                <button
                    disabled={loading}
                    className='w-full flex justify-center items-center gap-2
                               bg-gradient-to-r from-blue-600 to-purple-600 text-white
                               px-6 py-3 mt-8 text-lg rounded-lg cursor-pointer
                               font-semibold shadow-lg shadow-blue-900/40
                               hover:from-blue-700 hover:to-purple-700 transition-all duration-200
                               disabled:opacity-50 disabled:cursor-not-allowed' // Enhanced gradient, shadow, larger, disabled styles
                >
                    {loading ? (
                        <span className='w-5 h-5 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
                    ) : (
                        <Hash className='w-6 h-6' /> // Increased icon size
                    )}
                    Generate title
                </button>
            </form>

            {/* Right Column: Generated Titles Display */}
            <div className='w-full max-w-full lg:max-w-lg p-6 bg-gray-800 rounded-xl
                            flex flex-col border border-gray-700 shadow-lg shadow-gray-900/20 min-h-[400px]'> {/* Darker card, shadow, rounded, min-height */}

                <div className='flex items-center gap-3 mb-6'> {/* Increased bottom margin */}
                    <Hash className='w-7 h-7 text-blue-500' /> {/* Changed icon color, increased size */}
                    <h1 className='text-2xl font-semibold text-white'>Generated Titles</h1> {/* Changed text color, size */}
                </div>

                {!content ? (
                    <div className='flex-1 flex justify-center items-center'>
                        <div className='text-base flex flex-col items-center gap-5 text-gray-500'> {/* Adjusted text color, size */}
                            <Hash className='w-12 h-12 text-gray-600' /> {/* Increased icon size, adjusted color */}
                            <p className='text-center'>Enter a topic and click "Generate title" to get started</p> {/* Adjusted text */}
                        </div>
                    </div>
                ) : (
                    <div className='mt-3 h-full overflow-y-auto text-base text-gray-300 leading-relaxed'> {/* Adjusted text color, size, line height */}
                        <div className='reset-tw'>
                            <Markdown>{content}</Markdown>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogTitles;
