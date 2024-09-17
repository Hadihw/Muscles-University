import NavigationBar from "../../components/PreAuth/NavigationBar";
import {useNavigate} from "react-router-dom";
import SlideInOnViewAnimation from "../../components/Animations/SlideInOnViewAnimation";
import FadeInOnViewAnimation from "../../components/Animations/FadeInOnViewAnimation";
import ShineOnViewAnimation from "../../components/Animations/ShineOnViewAnimation";
import {FaDumbbell, FaNutritionix } from 'react-icons/fa';




const MainContent = () => {

    const navigate= useNavigate();

    return (
        <SlideInOnViewAnimation>
        <div className="flex flex-1 items-center justify-center md:justify-start pl-4 md:pl-20 text-white animate-fade-in">
            <div className="max-w-lg w-full text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-axiom mb-4">Muscles University</h1>
                <p className="mb-8">
                    Unleash your inner Titan.
                </p>
                <button onClick={() => navigate('/register')} className="btn-light">
                    Get Started
                </button>
            </div>
        </div>
        </SlideInOnViewAnimation>
    );
};


const Feature = ({ title, description, IconComponent }) => {
    return (
        <div className="relative overflow-hidden rounded-lg shadow-lg p-6 bg-white">
            <div className="flex flex-col items-center justify-center text-center">
                <IconComponent className="w-12 h-12 text-[#FBEDC7]"/>
                <h3 className="text-lg font-bold text-black mt-4">{title}</h3>
                <p className="text-gray-700 mt-2">{description}</p>
                <button className="mt-4 px-4 py-2 bg-[#FBEDC7] hover:bg-[#FBEDC7] text-white border-none rounded">Learn
                    More
                </button>
            </div>
        </div>
    );
};


const Features = () => {
    return (
        <section className="bg-black w-full py-6 md:py-12 lg:py-16 grid grid-cols-1 md:grid-cols-5 gap-6">
            <Feature
                title="Nutrition Plan"
                description="Get personalized nutrition plans tailored to your needs."
                IconComponent={FaDumbbell}
            />
            <Feature
                title="Personal Training"
                description="Get 1-on-1 training sessions from our experts."
                IconComponent={FaNutritionix}
            />
            {/* Add more FeatureCards here */}
        </section>
    );
};






const Benefit = ({ icon, title, description }) => {

    return (

            <div className={`flex items-center text-white mb-8`}>
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-light flex items-center justify-center mr-4">
                    {icon}
                </div>
                <div>
                    <h3 className="font-bold font-axiom text-light uppercase">{title}</h3>
                    <p className="text-gray-300">{description}</p>
                </div>
            </div>

    );
};


const Benefits = () => {

    return (

        <section className="bg-black">
            <div className="container mx-auto px-4 flex flex-col lg:flex-row justify-center items-center py-32 md:py-32">
                {/* Benefits list */}
                <div  className="w-full lg:w-2/5">
                    <SlideInOnViewAnimation direction={"left"}>
                        <h2 className="text-3xl mb-8 text-light font-axiom">Why Muscles University?</h2>
                        <Benefit
                            title="Stronger"
                            description="Recommended for anyone 6ft 6in and shorter. Easily adjustable jump rope from 10ft down to your desired length within seconds!"
                            icon={<i className="fas fa-arrows-alt-v text-3xl text-white" />} // Replace with actual icon component
                        />
                        <Benefit
                            title="Faster"
                            description="Recommended for anyone 6ft 6in and shorter. Easily adjustable jump rope from 10ft down to your desired length within seconds! Jump rope comes with easy to understand instructions."
                            // icon={<YourIconComponent />} // Replace with actual icon
                        />
                        <Benefit
                            title="Smoother"
                            description="Our high quality thicker (6mm) heavier rope allows for a smooth rotation & the ball bearings in the handles ensure a tangle free jumping experience."
                            // icon={<YourIconComponent />} // Replace with actual icon
                        />
                        <Benefit
                            title="More Durable"
                            description="Ergonomically designed weighted memory foam handles offer extra comfort while also preventing palm sweat and providing the firm grip. Weights in jump rope handles are removable. Total weight = 1.2 lbs."
                            // icon={<YourIconComponent />} // Replace with actual icon
                        />
                </SlideInOnViewAnimation>
                </div>

                {/* Placeholder for the person's image on the right */}
                <div className="lg:w-1/3 lg:ml-20 flex justify-center lg:justify-end relative">
                    {/* Here you'll add the person's image */}
                    <FadeInOnViewAnimation>
                        <img src="/assets/images/flexingImg1.png" alt="Person" className="w-full h-auto object-cover" />
                    </FadeInOnViewAnimation>

                    {/* Gradient overlay at the bottom*/}
                    <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black to-transparent"></div>

                    {/* Gradient overlay at the right */}
                    <div className="absolute top-0 right-0 bottom-0 w-10 h-full bg-gradient-to-l from-black to-transparent"></div>
                    {/* Gradient overlay at the left */}
                    <div className="absolute top-0 left-0 bottom-0 w-10 h-full bg-gradient-to-r from-black to-transparent"></div>

                </div>

            </div>
        </section>
    );
};

const CallToAction = () => {
    return (
        <div className="flex flex-wrap bg-black justify-center items-center w-full py-20 md:py-20">
            {['onlineCoachingCTA.png', 'fitnessConsultationCTA.png'].map((image, index) => (
                <div key={index} className="w-full lg:w-1/2 flex justify-center lg:justify-end lg:last:justify-start">
                    {/* Image container */}
                    <div className="w-full lg:max-w-2xl relative m-5">

                        <ShineOnViewAnimation>

                        {/* Image */}
                            <img src={`/assets/images/${image}`} alt="Call to Action" className="w-full h-auto cursor-pointer" />

                        </ShineOnViewAnimation>
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-light bg-opacity-0 hover:bg-opacity-10 cursor-pointer"></div>

                        {/* Gradient overlay at the bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black to-transparent" />

                        {/* Gradient overlay at the top */}
                        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-t from-transparent to-black" />

                        {/* Gradient overlay at the right */}
                        <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-l from-black to-transparent"></div>

                        {/* Gradient overlay at the left */}
                        <div className="absolute top-0 left-0 bottom-0 w-10 bg-gradient-to-r from-black to-transparent"></div>


                    </div>
                </div>
            ))}
        </div>
    );
};


const Testimonial = ({ quote, author }) => {
    return (
        <div className="text-white text-center p-4">
            <blockquote className="italic mb-4">"{quote}"</blockquote>
            <p className="font-bold">{author}</p>
        </div>
    );
};


const Testimonials = () => {
    const testimonials = [
        { quote: "This is the best fitness program I've ever joined!", author: "John Doe" },
        { quote: "I've seen incredible results in just a few weeks.", author: "Jane Smith" },
        { quote: "Highly recommend Muscles University to anyone looking to improve their fitness.", author: "Alex Johnson" },
        // Add more testimonials as needed
    ];

    return (
        <section className="bg-black py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl text-light font-axiom mb-8 text-center">What Our Customers Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <FadeInOnViewAnimation key={index}>
                            <Testimonial quote={testimonial.quote} author={testimonial.author} />
                        </FadeInOnViewAnimation>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Background = () => {
    return (
        <div className="absolute inset-0 z-0">
            {/* Background image */}
            <div className="absolute inset-0 bg-landingPageBackground bg-no-repeat bg-cover bg-center" />

            {/* Gradient overlay at the bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </div>
    );
};
const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col animate-fade-in-0.5">
            {/* Section that fits entirely on the screen */}
            <div className="relative h-screen flex flex-col">
                {/* Background with darkening effect */}
                <Background />

                {/* Header */}
                <NavigationBar/>

                {/* Main content */}
                <div className="flex-1 flex items-center z-10">
                    <MainContent />

                </div>
            </div>
            {/*<Features />*/}

            <Benefits />

            <CallToAction/>

            <Testimonials/>


        </div>
    );
};

export default LandingPage;