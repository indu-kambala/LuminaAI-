import { Image, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
    const imageStyle = [
        'Realistic', 'Ghibli style', 'Anime style', 'Cartoon style', 'Fantasy style', '3D style', 'Portrait style'
    ];

    const [selectedStyle, setSelectedStyle] = useState('Realistic');
    const [input, setInput] = useState('');
    const [publish, setPublish] = useState(false);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState(''); // This will hold the image URL

    const { getToken } = useAuth();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;

            // Backend logic remains unchanged as per your instruction
            const { data } = await axios.post('/api/ai/generate-image', { prompt, publish }, { headers: { Authorization: `Bearer ${await getToken()}` } });

            if (data.success) {
                setContent(data.content); // Assuming data.content is the image URL
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    };

    return (
        // Main container for the Generate Images page
        // Changed: Dark background, increased padding, adjusted gap between columns.
        <div className='h-full overflow-y-scroll p-8 sm:p-10 md:p-12
                        flex flex-col lg:flex-row items-start lg:items-stretch
                        gap-8 bg-gray-900 text-white'>

            {/* Left Column: Input Form */}
            <form onSubmit={onSubmitHandler}
                  className='w-full max-w-full lg:max-w-lg p-6 bg-gray-800 rounded-xl
                             border border-gray-700 shadow-lg shadow-gray-900/20 flex-shrink-0'>
                <div className='flex items-center gap-3 mb-6'>
                    <Sparkles className='w-7 h-7 text-green-500' /> {/* Changed icon color to green accent, increased size */}
                    <h1 className='text-2xl font-semibold text-white'>AI Image Generator</h1>
                </div>

                <p className='mt-4 text-base font-medium text-gray-300'>Describe Your Image</p>
                <textarea
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                    rows={5} // Increased rows for more description space
                    className='w-full p-3 px-4 mt-2 outline-none text-base rounded-md
                               border border-gray-600 bg-gray-700 text-white placeholder-gray-500
                               focus:ring-2 ring-green-500 transition-colors duration-200'
                    placeholder='Describe what you want to see in the image, e.g., "A futuristic city at sunset with flying cars"'
                    required
                />

                <p className='mt-6 text-base font-medium text-gray-300'>Style</p>
                <div className='mt-3 flex gap-3 flex-wrap'>
                    {imageStyle.map((item) => (
                        <span
                            onClick={() => setSelectedStyle(item)}
                            className={`text-sm px-5 py-2 border rounded-full cursor-pointer
                                        transition-colors duration-200 font-medium
                                        ${selectedStyle === item
                                            ? 'bg-green-600 text-white border-green-600 shadow-md shadow-green-900/30' // Vibrant green active state
                                            : 'text-gray-400 border-gray-600 bg-gray-700 hover:bg-gray-600 hover:text-white' // Darker inactive state
                                        }`}
                            key={item}
                        >
                            {item}
                        </span>
                    ))}
                </div>

                {/* Publish Toggle */}
                <div className='my-8 flex items-center gap-3'> {/* Increased margin and gap */}
                    <label className='relative cursor-pointer'>
                        <input type="checkbox" onChange={(e) => setPublish(e.target.checked)} checked={publish} className='sr-only peer' />
                        <div className='w-11 h-6 bg-gray-600 rounded-full peer-checked:bg-green-500 transition-colors duration-300'></div> {/* Darker inactive, green active */}
                        <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5'></span> {/* Larger toggle knob */}
                    </label>
                    <p className='text-base text-gray-300'>Make this image Public</p> {/* Adjusted text color and size */}
                </div>

                {/* Generate Button */}
                <button
                    disabled={loading}
                    className='w-full flex justify-center items-center gap-2
                               bg-gradient-to-r from-green-600 to-lime-500 text-white
                               px-6 py-3 mt-6 text-lg rounded-lg cursor-pointer
                               font-semibold shadow-lg shadow-green-900/40
                               hover:from-green-700 hover:to-lime-600 transition-all duration-200
                               disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {loading ? (
                        <span className='w-5 h-5 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
                    ) : (
                        <Image className='w-6 h-6' />
                    )}
                    Generate Image
                </button>
            </form>

            {/* Right Column: Generated Image Display */}
            <div className='w-full max-w-full lg:max-w-lg p-6 bg-gray-800 rounded-xl
                            flex flex-col border border-gray-700 shadow-lg shadow-gray-900/20
                            min-h-[400px] items-center justify-center'> {/* Darker card, shadow, rounded, min-height, centered content */}

                <div className='flex items-center gap-3 mb-6'>
                    <Image className='w-7 h-7 text-green-500' />
                    <h1 className='text-2xl font-semibold text-white'>Generated Image</h1>
                </div>

                {!content ? (
                    <div className='flex-1 flex flex-col items-center justify-center text-gray-500'>
                        <Image className='w-16 h-16 mb-4 text-gray-600' />
                        <p className='text-lg font-medium text-center'>Enter a description and click "Generate Image" to get started</p>
                    </div>
                ) : (
                    <div className='mt-3 w-full h-full flex justify-center items-center overflow-hidden'> {/* Centered image, hidden overflow */}
                        <img src={content} alt="Generated" className='w-full h-auto max-h-full object-contain rounded-lg shadow-md' /> {/* Adjusted image styling */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenerateImages;
