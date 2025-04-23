import { useEffect } from 'react';
import gsap from 'gsap';


const Spawn = (langMenuState, className) => {
    useEffect(() => {
        if (langMenuState) {
            gsap.fromTo(
                className,
                { opacity: 0, y: -20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                    display: 'block',
                }
            );
        } else {
            gsap.to(
                className,
                {
                opacity: 0,
                y: -20,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                    const menu = document.querySelector('.lang-options');
                    if (menu) menu.style.display = 'none';
                },
            });
        }
    }, [langMenuState]);
}


export default Spawn;