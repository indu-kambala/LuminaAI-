import { assets } from "../assets/assets"; // Assuming assets.star_icon and assets.star_dull_icon are suitable

const Testimonial = () => {
    const dummyTestimonialData = [
        {
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            name: 'John Doe',
            title: 'Marketing Director, Mindweave AI', // Updated for branding
            content: 'Mindweave AI has revolutionized our content workflow. The quality of the articles is outstanding, and it saves us hours of work every week. Truly a game-changer for our team!',
            rating: 4,
        },
        {
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            name: 'Jane Smith',
            title: 'Lead Content Creator, Innovate Solutions', // Updated for variety
            content: 'Mindweave AI has made our content creation process effortless. The AI tools have helped us produce high-quality content faster and more creatively than ever before. Highly recommended!',
            rating: 5,
        },
        {
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
            name: 'David Lee',
            title: 'Freelance Writer, Global Media', // Updated for variety
            content: 'Mindweave AI has transformed my writing process. The AI tools are intuitive and powerful, allowing me to generate diverse content and overcome writer\'s block with ease. Fantastic platform!',
            rating: 4,
        },
    ];

    return (
        // Main container for the testimonial section
        // Changed: Darker background, consistent vertical padding.
        <div className='px-4 sm:px-20 xl:px-32 py-24 bg-gray-900 text-white'>
            {/* Section Header */}
            <div className='text-center mb-16'> {/* Increased bottom margin */}
                {/* Heading: Changed text color, font weight, and size to match other sections */}
                <h2 className='text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-tight'>
                    Loved by Creators Worldwide
                </h2>
                {/* Paragraph: Adjusted text color for readability on dark background, increased max-width */}
                <p className='text-gray-400 max-w-xl mx-auto mt-4 text-lg leading-relaxed'>
                    Don't just take our word for it. Here's what our users are saying about Mindweave AI.
                </p>
            </div>

            {/* Testimonial Cards Grid */}
            <div className='flex flex-wrap mt-10 justify-center gap-8'> {/* Added gap for better spacing */}
                {dummyTestimonialData.map((testimonial, index) => (
                    // Individual Testimonial Card
                    // Changed: Darker background, stronger shadow, refined border, increased padding,
                    // more pronounced hover effect.
                    <div
                        key={index}
                        className='p-8 max-w-xs w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]
                                   rounded-xl bg-gray-800 border border-gray-700
                                   shadow-xl shadow-gray-700/10
                                   hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20
                                   transition-all duration-300 cursor-pointer flex flex-col'
                    >
                        {/* Star Rating */}
                        <div className="flex items-center gap-1 mb-4"> {/* Increased bottom margin */}
                            {Array(5).fill(0).map((_, starIndex) => (
                                <img
                                    key={starIndex}
                                    src={starIndex < testimonial.rating ? assets.star_icon : assets.star_dull_icon}
                                    className='w-5 h-5' // Slightly increased star icon size
                                    alt="star rating"
                                />
                            ))}
                        </div>
                        {/* Testimonial Content */}
                        <p className='text-gray-300 text-base my-5 leading-relaxed flex-grow'>"{testimonial.content}"</p> {/* Adjusted text color, size, line height, flex-grow */}
                        <hr className='my-5 border-gray-700' /> {/* Darker border for consistency */}

                        {/* Author Info */}
                        <div className='flex items-center gap-4'>
                            <img
                                src={testimonial.image}
                                className='w-14 h-14 object-cover rounded-full border-2 border-blue-500 p-0.5' // Increased size, added border
                                alt={testimonial.name}
                            />
                            <div className='text-sm text-gray-300'> {/* Adjusted text color */}
                                <h3 className='font-semibold text-white'>{testimonial.name}</h3> {/* Bolder name, white text */}
                                <p className='text-xs text-gray-400 mt-0.5'>{testimonial.title}</p> {/* Adjusted text color, spacing */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonial;
