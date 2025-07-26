import React from 'react';
import { PricingTable } from '@clerk/clerk-react';

const Plan = () => {
    return (
        // Main container for the Plan section
        // Changed: Increased vertical padding, adjusted max-width, ensured text color for consistency.
        // Added: A dark background to match the overall theme, assuming this component renders on its own page.
        <div className='px-4 sm:px-20 xl:px-32 py-24 bg-gray-900 text-white'>
            <div className='max-w-4xl mx-auto z-20'> {/* Increased max-w for content */}

                {/* Section Header */}
                <div className='text-center mb-16'> {/* Increased bottom margin */}
                    {/* Heading: Changed text color, font weight, and size to match other sections */}
                    <h2 className='text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-tight'>
                        Choose Your Perfect Plan
                    </h2>
                    {/* Paragraph: Adjusted text color for readability on dark background, increased max-width */}
                    <p className='text-gray-400 max-w-xl mx-auto mt-4 text-lg leading-relaxed'>
                        Start for free and scale up as you grow. Find the perfect plan for your
                        content creation needs, designed to empower your workflow.
                    </p>
                </div>

                {/* Pricing Table (Clerk Component) */}
                {/* Note: Styling for Clerk's <PricingTable /> component itself is largely controlled by Clerk.
                           You might need to configure Clerk's theming options (if available)
                           or use CSS overrides if you want to deeply customize its internal appearance.
                           Here, we ensure its container is well-spaced. */}
                <div className='mt-10 max-sm:mx-4'> {/* Adjusted top margin and horizontal margin for small screens */}
                    <PricingTable />
                </div>

            </div>
        </div>
    );
};

export default Plan;
