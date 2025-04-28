/**
 * @file index.js
 * @descrizione Funzione di utilità React per animare l'apertura e la chiusura
 *              del menu delle lingue utilizzando la libreria GSAP.
 *
 *              La funzione esportata `Spawn` applica un effetto animato
 *              all'elemento con classe `.lang-options` in base allo stato
 *              `langMenuState`.
 *
 * @autore Zs
 * @creato il 23/04/2025
 * @ultimaModifica 23/04/2025
 */

import { useEffect } from 'react';
import gsap  from 'gsap';

/**
 * Applica un effetto animato al menu delle lingue quando cambia il suo stato di visibilità.
 *
 * @param {boolean} langMenuState - Stato che indica se il menu delle lingue è aperto (true) o chiuso (false).
 * @param {string} className - Nome della classe (non utilizzato direttamente in questa funzione ma previsto per estensioni future).
 */
export const Spawn = (langMenuState, className) => {
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
            gsap.to(className, {
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
    }, [langMenuState, className]);
}
