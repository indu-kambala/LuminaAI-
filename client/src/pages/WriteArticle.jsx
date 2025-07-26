import { Edit, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
    const articleLength = [
        { length: 800, text: 'Short (500-800 words)' },
        { length: 1200, text: 'Medium (800-1200 words)' },
        { length: 1600, text: 'Long (1200+ words)' }
    ];

    const [selectedLength, setSelectedLength] = useState(articleLength[0]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');

    const { getToken } = useAuth();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const prompt = `Write an article about ${input} in ${selectedLength.text}`;

            // Backend logic remains unchanged as per your instruction
            const { data } = await axios.post('/api/ai/generate-article', { prompt, length: selectedLength.length }, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            });

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
        // Main container for the Write Article page
        // Changed: Dark background, increased padding, adjusted gap between columns.
        <div className='h-full overflow-y-scroll p-8 sm:p-10 md:p-12
                        flex flex-col lg:flex-row items-start lg:items-stretch
                        gap-8 bg-gray-900 text-white'>

            {/* Left Column: Article Configuration Form */}
            <form onSubmit={onSubmitHandler}
                  className='w-full max-w-full lg:max-w-lg p-6 bg-gray-800 rounded-xl
                             border border-gray-700 shadow-lg shadow-gray-900/20 flex-shrink-0'>
                <div className='flex items-center gap-3 mb-6'>
                    <Sparkles className='w-7 h-7 text-blue-500' /> {/* Changed icon color to blue accent, increased size */}
                    <h1 className='text-2xl font-semibold text-white'>Article Configuration</h1>
                </div>

                <p className='mt-4 text-base font-medium text-gray-300'>Article Topic</p>
                <input
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    type="text"
                    className='w-full p-3 px-4 mt-2 outline-none text-base rounded-md
                               border border-gray-600 bg-gray-700 text-white placeholder-gray-500
                               focus:ring-2 ring-blue-500 transition-colors duration-200' // Darker input, blue focus
                    placeholder='e.g., The impact of AI on modern society...'
                    required
                />

                <p className='mt-6 text-base font-medium text-gray-300'>Article Length</p>
                <div className='mt-3 flex gap-3 flex-wrap'>
                    {articleLength.map((item, index) => (
                        <span
                            onClick={() => setSelectedLength(item)}
                            className={`text-sm px-5 py-2 border rounded-full cursor-pointer
                                        transition-colors duration-200 font-medium
                                        ${selectedLength.text === item.text
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-900/30' // Vibrant blue active state
                                            : 'text-gray-400 border-gray-600 bg-gray-700 hover:bg-gray-600 hover:text-white' // Darker inactive state
                                        }`}
                            key={index}
                        >
                            {item.text}
                        </span>
                    ))}
                </div>

                {/* Generate Button */}
                <button
                    disabled={loading}
                    className='w-full flex justify-center items-center gap-2
                               bg-gradient-to-r from-blue-600 to-indigo-500 text-white
                               px-6 py-3 mt-8 text-lg rounded-lg cursor-pointer
                               font-semibold shadow-lg shadow-blue-900/40
                               hover:from-blue-700 hover:to-indigo-600 transition-all duration-200
                               disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {loading ? (
                        <span className='w-5 h-5 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
                    ) : (
                        <Edit className='w-6 h-6' />
                    )}
                    Generate Article
                </button>
            </form>

            {/* Right Column: Generated Article Display */}
            <div className='w-full max-w-full lg:max-w-lg p-6 bg-gray-800 rounded-xl
                            flex flex-col border border-gray-700 shadow-lg shadow-gray-900/20
                            min-h-[400px] max-h-[600px]'>

                <div className='flex items-center gap-3 mb-6'>
                    <Edit className='w-7 h-7 text-blue-500' />
                    <h1 className='text-2xl font-semibold text-white'>Generated Article</h1>
                </div>

                {!content ? (
                    <div className='flex-1 flex flex-col items-center justify-center text-gray-500'>
                        <Edit className='w-16 h-16 mb-4 text-gray-600' />
                        <p className='text-lg font-medium text-center'>Enter a topic and click "Generate Article" to get started</p>
                    </div>
                ) : (
                    <div className='mt-3 h-full overflow-y-auto text-base text-gray-300 leading-relaxed'>
                        <div className='reset-tw'>
                            <Markdown>{content}</Markdown>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WriteArticle;
