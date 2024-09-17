import React, {useEffect, useState} from 'react';
import Logo from '/assets/images/logo(500x500).png';



const calculateTimeLeft = (targetDate) => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }

    return timeLeft;
};

const Countdown = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearTimeout(timer);
    });

    return (
        <div className="flex justify-between space-x-2">
            <div className="text-2xl font-bold">{timeLeft.days}<span className="block text-sm">Days</span></div>
            <div className="text-2xl font-bold">{timeLeft.hours}<span className="block text-sm">Hours</span></div>
            <div className="text-2xl font-bold">{timeLeft.minutes}<span className="block text-sm">Minutes</span></div>
            <div className="text-2xl font-bold">{timeLeft.seconds}<span className="block text-sm">Seconds</span></div>
        </div>
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

const ComingSoon = () => {
    const launchDate = '2023-12-31'; // Set your launch date (YYYY-MM-DD)

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800">
            <Background/>
            <div className="absolute top-0 left-0 right-0 z-20 flex justify-center mt-8 md:mt-12">
                {/* Use the imported Logo here */}
                <img className="w-32 md:w-48" src={Logo} alt="Logo"/>
            </div>
            <div className="z-10">
                <div className="space-y-4 bg-white bg-opacity-75 rounded-lg p-6 shadow-lg text-center text-gray-800">
                    <h2 className="text-4xl font-bold tracking-tighter  font-axiom">Under construction </h2>
                    <p className="max-w-lg md:text-xl lg:text-lg xl:text-xl font-axiom">
                        We're launching soon.
                    </p>
                    <p className="text-gray-600 md:text-lg lg:text-lg xl:text-xl">
                        Sign up to get notified when the site is ready.
                    </p>
                    <div className="w-full max-w-sm mx-auto space-y-2">
                        <form className="flex space-x-2 justify-center">
                            <input
                                className="flex-1 p-2 border border-gray-300 rounded"
                                placeholder="Enter your email"
                                type="email"
                            />
                            <button
                                type="submit"
                                className="bg-black text-white font-bold py-2 px-4 rounded"
                            >
                                Notify Me
                            </button>
                        </form>
                        <p className="text-xs">
                            By signing up, you agree to our
                            <a href="#" className="underline pl-1">Terms & Conditions</a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ComingSoon;
