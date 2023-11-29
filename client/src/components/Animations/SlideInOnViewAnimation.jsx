// SlideInOnViewAnimation.js
import { useInView } from 'react-intersection-observer';

const SlideInOnViewAnimation = ({ children, direction = 'left' }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    const animationClass = direction === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left';

    return (
        <div ref={ref} className={`transition-all duration-500 ${inView ? animationClass : 'opacity-0'}`}>
            {children}
        </div>
    );
};

export default SlideInOnViewAnimation;