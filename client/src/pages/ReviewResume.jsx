import { FileText, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
    const [input, setInput] = useState(null); // Changed to null for file input
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState(''); // This will hold the analysis results (Markdown)

    const { getToken } = useAuth();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            if (!input) {
                toast.error("Please select a resume file to upload.");
                setLoading(false);
                return;
            }

            const formData = new FormData();
            formData.append('resume', input); // 'input' is now the File object

            // Backend logic remains unchanged as per your instruction
            const { data } = await axios.post('/api/ai/resume-review', formData, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`,
                    'Content-Type': 'multipart/form-data', // Important for file uploads
                }
            });

            if (data.success) {
                setContent(data.content); // Assuming data.content is the Markdown analysis
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    };

    return (
        // Main container for the Review Resume page
        // Changed: Dark background, increased padding, adjusted gap between columns.
        <div className='h-full overflow-y-scroll p-8 sm:p-10 md:p-12
                        flex flex-col lg:flex-row items-start lg:items-stretch
                        gap-8 bg-gray-900 text-white'>

            {/* Left Column: Input Form */}
            <form onSubmit={onSubmitHandler}
                  className='w-full max-w-full lg:max-w-lg p-6 bg-gray-800 rounded-xl
                             border border-gray-700 shadow-lg shadow-gray-900/20 flex-shrink-0'>
                <div className='flex items-center gap-3 mb-6'>
                    <Sparkles className='w-7 h-7 text-teal-500' /> {/* Changed icon color to teal accent, increased size */}
                    <h1 className='text-2xl font-semibold text-white'>Resume Review</h1>
                </div>

                <p className='mt-4 text-base font-medium text-gray-300'>Upload Resume</p>
                <input
                    onChange={(e) => setInput(e.target.files[0])} // Correctly get the File object
                    type="file"
                    accept='application/pdf' // Ensure only PDF files are selectable
                    className='w-full p-3 px-4 mt-2 outline-none text-base rounded-md
                               border border-gray-600 bg-gray-700 text-white
                               file:mr-4 file:py-2 file:px-4
                               file:rounded-full file:border-0
                               file:text-sm file:font-semibold
                               file:bg-blue-500 file:text-white
                               hover:file:bg-blue-600 transition-colors duration-200
                               focus:ring-2 ring-teal-500 cursor-pointer' // Styled file input, teal focus
                    required
                />

                <p className='text-xs text-gray-500 font-light mt-2'>Supports PDF resumes only.</p> {/* Adjusted text color, spacing */}

                {/* Submit Button */}
                <button
                    disabled={loading} // Added disabled prop for loading state
                    className='w-full flex justify-center items-center gap-2
                               bg-gradient-to-r from-teal-600 to-cyan-500 text-white
                               px-6 py-3 mt-8 text-lg rounded-lg cursor-pointer
                               font-semibold shadow-lg shadow-teal-900/40
                               hover:from-teal-700 hover:to-cyan-600 transition-all duration-200
                               disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {loading ? (
                        <span className='w-5 h-5 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
                    ) : (
                        <FileText className='w-6 h-6' />
                    )}
                    Review Resume
                </button>
            </form>

            {/* Right Column: Analysis Results Display */}
            <div className='w-full max-w-full lg:max-w-lg p-6 bg-gray-800 rounded-xl
                            flex flex-col border border-gray-700 shadow-lg shadow-gray-900/20
                            min-h-[400px] max-h-[600px]'> {/* Darker card, shadow, rounded, min/max-height */}

                <div className='flex items-center gap-3 mb-6'>
                    <FileText className='w-7 h-7 text-teal-500' />
                    <h1 className='text-2xl font-semibold text-white'>Analysis Results</h1>
                </div>

                {!content ? (
                    <div className='flex-1 flex flex-col items-center justify-center text-gray-500'>
                        <FileText className='w-16 h-16 mb-4 text-gray-600' />
                        <p className='text-lg font-medium text-center'>Upload a resume and click "Review Resume" to get started</p>
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

export default ReviewResume;
