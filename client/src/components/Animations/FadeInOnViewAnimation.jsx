// FadeInOnView.js
import { useInView } from 'react-intersection-observer';

const FadeInOnViewAnimation = ({ children }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    return (
        <div ref={ref} className={`transition-opacity duration-500 ${inView ? 'animate-fade-in' : 'opacity-0'}`}>
            {children}
        </div>
    );
};

export default FadeInOnViewAnimation;