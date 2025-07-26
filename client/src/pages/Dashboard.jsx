import React, { useEffect, useState } from 'react';
import { Gem, Sparkles } from 'lucide-react';
import { Protect, useAuth } from '@clerk/clerk-react';
import CreationItem from '../components/CreationItem'; // Assuming CreationItem is already updated
import axios from 'axios';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
    const [creations, setCreations] = useState([]);
    const [loading, setLoading] = useState(true);
    const { getToken } = useAuth();

    const getDashboardData = async () => {
        try {
            const { data } = await axios.get('/api/user/get-user-creations', {
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

    useEffect(() => {
        getDashboardData();
    }, []); // Empty dependency array means this runs once on mount

    return (
        // Main container for the Dashboard page
        // Changed: Dark background, increased padding, consistent text color.
        <div className='h-full overflow-y-scroll p-8 sm:p-10 md:p-12 bg-gray-900 text-white'>
            {/* Dashboard Stats Cards */}
            <div className='flex justify-start gap-6 flex-wrap mb-10'> {/* Increased gap and bottom margin */}
                {/* Total Creations Card */}
                <div className='flex justify-between items-center w-full sm:w-72 p-6 bg-gray-800 rounded-xl
                                border border-gray-700 shadow-lg shadow-gray-900/20'> {/* Darker background, border, shadow */}
                    <div className='text-gray-300'> {/* Adjusted text color */}
                        <p className='text-base'>Total Creations</p> {/* Increased text size */}
                        <h2 className='text-2xl font-semibold text-white mt-1'>{creations.length}</h2> {/* Increased text size, white color */}
                    </div>
                    <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500
                                    text-white flex justify-center items-center shadow-md'> {/* Larger icon container, vibrant gradient, shadow */}
                        <Sparkles className='w-6 h-6 text-white' /> {/* Increased icon size */}
                    </div>
                </div>

                {/* Active Plan Card */}
                <div className='flex justify-between items-center w-full sm:w-72 p-6 bg-gray-800 rounded-xl
                                border border-gray-700 shadow-lg shadow-gray-900/20'> {/* Darker background, border, shadow */}
                    <div className='text-gray-300'> {/* Adjusted text color */}
                        <p className='text-base'>Active Plan</p> {/* Increased text size */}
                        <h2 className='text-2xl font-semibold text-white mt-1'> {/* Increased text size, white color */}
                            <Protect plan='premium' fallback={<span className="text-gray-500">Free</span>}>
                                <span className="text-blue-400">Premium</span>
                            </Protect>
                        </h2>
                    </div>
                    <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600 to-pink-500
                                    text-white flex justify-center items-center shadow-md'> {/* Larger icon container, vibrant gradient, shadow */}
                        <Gem className='w-6 h-6 text-white' /> {/* Increased icon size */}
                    </div>
                </div>
            </div>

            {/* Recent Creations Section */}
            {loading ? (
                // Loading State
                <div className='flex justify-center items-center h-[calc(100vh-250px)]'> {/* Adjusted height for spinner */}
                    <span className='w-14 h-14 rounded-full border-4 border-blue-500 border-t-transparent animate-spin'></span> {/* Larger, blue spinner */}
                </div>
            ) : (
                <div className='space-y-4'> {/* Increased space-y for better spacing between creation items */}
                    <p className='text-xl font-semibold text-white mb-4'>Recent Creations</p> {/* Larger, white text for heading */}
                    {creations.length > 0 ? (
                        creations.map((item) => <CreationItem key={item.id} item={item} />)
                    ) : (
                        <div className='flex flex-col items-center justify-center h-48 text-gray-500'>
                            <Sparkles className='w-16 h-16 mb-4 text-gray-600' />
                            <p className='text-lg font-medium'>No creations yet. Start creating!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
