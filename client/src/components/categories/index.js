/**
 * @file useNavbarAnimation.js
 * @description Custom hook per gestire l'animazione di una navbar.
 *              Aggiunge un'animazione di discesa a cascata per ogni 
 *              elemento span all'interno di una navbar utilizzando GSAP.
 * 
 * @param {React.RefObject} navbarRef - Riferimento alla navbar contenente 
 *                                       gli span da animare.
 * @returns {void} Nessun valore restituito.
 */
import { useEffect } from 'react';
import gsap from 'gsap';

const useNavbarAnimation = (navbarRef) => {
    useEffect(() => {
        const spans = navbarRef.current.querySelectorAll('.categories_span');

        spans.forEach((span, index) => {
            gsap.fromTo(
                span,
                {
                    y: -140 - (index * 30),
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.25,
                    ease: "power4.inOut",
                    delay: index * 0.1,
                }
            );
        });
    }, [navbarRef]);
};

export default useNavbarAnimation;
