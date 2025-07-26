import { Scissors, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
    const [input, setInput] = useState(null); // Changed to null for file input
    const [object, setObject] = useState('');

    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState(''); // This will hold the processed image URL

    const { getToken } = useAuth();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            if (!input) {
                toast.error("Please select an image to upload.");
                setLoading(false);
                return;
            }
            if (!object.trim()) {
                toast.error("Please describe the object to remove.");
                setLoading(false);
                return;
            }
            if (object.trim().split(' ').length > 1) {
                toast.error("Please enter only one object name.");
                setLoading(false);
                return;
            }

            const formData = new FormData();
            formData.append('image', input); // 'input' is now the File object
            formData.append('object', object.trim()); // Trim whitespace from object name

            // Backend logic remains unchanged as per your instruction
            const { data } = await axios.post('/api/ai/remove-image-object', formData, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`,
                    'Content-Type': 'multipart/form-data', // Important for file uploads
                }
            });

            if (data.success) {
                setContent(data.content); // Assuming data.content is the processed image URL
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    };

    return (
        // Main container for the Remove Object page
        // Changed: Dark background, increased padding, adjusted gap between columns.
        <div className='h-full overflow-y-scroll p-8 sm:p-10 md:p-12
                        flex flex-col lg:flex-row items-start lg:items-stretch
                        gap-8 bg-gray-900 text-white'>

            {/* Left Column: Input Form */}
            <form onSubmit={onSubmitHandler}
                  className='w-full max-w-full lg:max-w-lg p-6 bg-gray-800 rounded-xl
                             border border-gray-700 shadow-lg shadow-gray-900/20 flex-shrink-0'>
                <div className='flex items-center gap-3 mb-6'>
                    <Sparkles className='w-7 h-7 text-purple-500' /> {/* Changed icon color to purple accent, increased size */}
                    <h1 className='text-2xl font-semibold text-white'>Object Removal</h1>
                </div>

                <p className='mt-4 text-base font-medium text-gray-300'>Upload Image</p>
                <input
                    onChange={(e) => setInput(e.target.files[0])} // Correctly get the File object
                    type="file"
                    accept='image/*' // Ensure only image files are selectable
                    className='w-full p-3 px-4 mt-2 outline-none text-base rounded-md
                               border border-gray-600 bg-gray-700 text-white
                               file:mr-4 file:py-2 file:px-4
                               file:rounded-full file:border-0
                               file:text-sm file:font-semibold
                               file:bg-blue-500 file:text-white
                               hover:file:bg-blue-600 transition-colors duration-200
                               focus:ring-2 ring-purple-500 cursor-pointer' // Styled file input, purple focus
                    required
                />

                <p className='mt-6 text-base font-medium text-gray-300'>Describe object name to remove</p> {/* Adjusted text color, size */}
                <textarea
                    onChange={(e) => setObject(e.target.value)}
                    value={object}
                    rows={4}
                    className='w-full p-3 px-4 mt-2 outline-none text-base rounded-md
                               border border-gray-600 bg-gray-700 text-white placeholder-gray-500
                               focus:ring-2 ring-purple-500 transition-colors duration-200' // Darker input, purple focus
                    placeholder='e.g., watch or spoon (Only single object name)' // Clarified placeholder
                    required
                />

                {/* Submit Button */}
                <button
                    disabled={loading}
                    className='w-full flex justify-center items-center gap-2
                               bg-gradient-to-r from-purple-600 to-indigo-500 text-white
                               px-6 py-3 mt-8 text-lg rounded-lg cursor-pointer
                               font-semibold shadow-lg shadow-purple-900/40
                               hover:from-purple-700 hover:to-indigo-600 transition-all duration-200
                               disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {loading ? (
                        <span className='w-5 h-5 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
                    ) : (
                        <Scissors className='w-6 h-6' />
                    )}
                    Remove Object
                </button>
            </form>

            {/* Right Column: Processed Image Display */}
            <div className='w-full max-w-full lg:max-w-lg p-6 bg-gray-800 rounded-xl
                            flex flex-col border border-gray-700 shadow-lg shadow-gray-900/20
                            min-h-[400px] items-center justify-center'>

                <div className='flex items-center gap-3 mb-6'>
                    <Scissors className='w-7 h-7 text-purple-500' />
                    <h1 className='text-2xl font-semibold text-white'>Processed Image</h1>
                </div>

                {!content ? (
                    <div className='flex-1 flex flex-col items-center justify-center text-gray-500'>
                        <Scissors className='w-16 h-16 mb-4 text-gray-600' />
                        <p className='text-lg font-medium text-center'>Upload an image and describe the object to remove to get started</p> {/* Adjusted placeholder text */}
                    </div>
                ) : (
                    <div className='mt-3 w-full h-full flex justify-center items-center overflow-hidden'>
                        <img src={content} alt="Processed" className='w-full h-auto max-h-full object-contain rounded-lg shadow-md' />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RemoveObject;
