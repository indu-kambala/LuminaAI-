import { useAuth, useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
    const [creations, setCreations] = useState([]);
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();

    const fetchCreations = async () => {
        try {
            const { data } = await axios.get('/api/user/get-published-creations', {
                headers: { Authorization: `Bearer ${await getToken()}` }
            });
            if (data.success) {
                setCreations(data.creations);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
        setLoading(false);
    };

    const imageLikeToggle = async (id) => {
        try {
            const { data } = await axios.post('/api/user/toggle-like-creation', { id }, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            });

            if (data.success) {
                toast.success(data.message);
                await fetchCreations(); // Refresh creations to update like count/status
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (user) {
            fetchCreations();
        }
    }, [user]); // Depend on user to refetch when auth state changes

    return !loading ? (
        // Main container for the Community page
        // Changed: Dark background, increased padding, adjusted flex properties.
        <div className='flex-1 h-full flex flex-col gap-6 p-8 sm:p-10 md:p-12 bg-gray-900 text-white'>
            {/* Section Heading */}
            <h1 className='text-3xl sm:text-4xl font-bold text-white mb-4'>Community Creations</h1>

            {/* Creations Grid Container */}
            <div className='bg-gray-800 h-full w-full rounded-xl overflow-y-scroll
                            p-4 sm:p-6 border border-gray-700 shadow-xl shadow-gray-900/20
                            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'> {/* Changed to grid layout */}
                {creations.length > 0 ? (
                    creations.map((creation) => (
                        // Individual Creation Item (Image Card)
                        <div key={creation._id || creation.id} // Use _id or id for unique key
                             className='relative group w-full aspect-square overflow-hidden rounded-lg shadow-md'> {/* Added aspect-square for uniform size */}
                            <img
                                src={creation.content}
                                alt={creation.prompt} // Use prompt as alt text for accessibility
                                className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105'
                            />

                            {/* Overlay on hover */}
                            <div className='absolute inset-0 flex flex-col justify-end p-4
                                            bg-gradient-to-t from-black/80 to-transparent
                                            text-white opacity-0 group-hover:opacity-100
                                            transition-opacity duration-300'>
                                {/* Prompt text */}
                                <p className='text-sm font-medium mb-2 line-clamp-2'>{creation.prompt}</p> {/* Limited lines for long prompts */}
                                {/* User and Likes */}
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center gap-2'>
                                        {/* Display user info if available, e.g., avatar and name */}
                                        {creation.user?.imageUrl && (
                                            <img src={creation.user.imageUrl} alt={creation.user.fullName} className='w-6 h-6 rounded-full object-cover border border-gray-500' />
                                        )}
                                        <span className='text-xs text-gray-300'>{creation.user?.fullName || 'Anonymous'}</span>
                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <p className='text-sm'>{creation.likes.length}</p>
                                        <Heart
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent card expansion when clicking heart
                                                imageLikeToggle(creation._id || creation.id);
                                            }}
                                            className={`min-w-5 h-5 cursor-pointer
                                                        ${creation.likes.includes(user?.id) ? 'fill-red-500 text-red-600' : 'text-white'}
                                                        hover:scale-110 transition-transform duration-200`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    // No Creations Message
                    <div className='col-span-full flex flex-col items-center justify-center h-full text-gray-500'>
                        <Heart className='w-16 h-16 mb-4 text-gray-600' />
                        <p className='text-lg font-medium'>No creations published yet. Be the first!</p>
                    </div>
                )}
            </div>
        </div>
    ) : (
        // Loading State
        <div className='flex justify-center items-center h-full bg-gray-900'> {/* Dark background for loading */}
            <span className='w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin'></span> {/* Larger, blue spinner */}
        </div>
    );
};

export default Community;
