import React from 'react';
import { assets } from '../assets/assets'; // Assuming assets.logo is the correct path to your logo

const Footer = () => {
    return (
        // Main footer container
        // Changed: Darker background, increased top margin, adjusted padding for overall look.
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-12 w-full bg-gray-900 text-gray-400 mt-28">
            {/* Top section with logo, description, company links, and newsletter */}
            <div className="flex flex-col md:flex-row justify-between w-full gap-12 border-b border-gray-700 pb-8">
                {/* Logo and Description */}
                <div className="md:max-w-sm"> {/* Slightly increased max-width for description */}
                    {/* Assuming assets.logo is the correct path and it's a white/light logo for dark background */}
                    <img className="h-10" src={assets.logo} alt="Mindweave AI Logo" /> {/* Adjusted logo height */}
                    <p className="mt-6 text-base leading-relaxed"> {/* Increased text size and line height */}
                        Experience the power of Mindweave AI. <br />Transform your content creation with our suite of
                        cutting-edge AI tools. Generate text, create stunning images, and
                        streamline your workflow with intelligent assistance.
                    </p>
                </div>

                {/* Company Links and Newsletter */}
                <div className="flex-1 flex flex-col sm:flex-row items-start md:justify-end gap-16 sm:gap-24"> {/* Adjusted gaps and added flex-col for small screens */}
                    {/* Company Links */}
                    <div>
                        <h2 className="font-bold mb-6 text-white text-lg">Company</h2> {/* Stronger heading, white text */}
                        <ul className="text-base space-y-3"> {/* Increased text size and spacing */}
                            <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Home</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">About us</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Contact us</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Privacy policy</a></li>
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="max-w-md"> {/* Added max-width for better control on larger screens */}
                        <h2 className="font-bold text-white text-lg mb-6">Subscribe to our newsletter</h2> {/* Stronger heading, white text */}
                        <div className="text-base space-y-4"> {/* Increased text size and spacing */}
                            <p>The latest news, articles, and resources, sent directly to your inbox weekly.</p>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"> {/* Adjusted gap, flex-col for mobile */}
                                <input
                                    className="border border-gray-600 bg-gray-800 text-white placeholder-gray-500
                                               focus:ring-2 ring-blue-500 outline-none
                                               w-full h-11 rounded-md px-4 py-2 text-base" // Larger input, dark background, rounded
                                    type="email"
                                    placeholder="Enter your email"
                                />
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white
                                               w-full sm:w-32 h-11 rounded-md cursor-pointer
                                               font-semibold transition-colors duration-200" // Styled button, full width on mobile
                                >
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright information */}
            <p className="pt-6 text-center text-sm pb-8 text-gray-500"> {/* Adjusted padding and text color */}
                Copyright 2025 © Mindweave AI. All Rights Reserved.
            </p>
        </footer>
    );
};

export default Footer;
