import { gsap } from 'gsap';

export const animateFormSwitch = (formRef, bgRef, isLogin, setIsLogin) => {
  const formElements = formRef.current.querySelectorAll('input, button, label');

  gsap.to(formElements, {
    opacity: 0,
    y: -30,
    duration: 0.5,
    stagger: 0.05,
    ease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    onComplete: () => {
      setIsLogin(prev => !prev);

      gsap.to(formRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          gsap.delayedCall(0.2, () => {
            gsap.fromTo(
              formElements,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: 'power4.out' }
            );
            gsap.to(formRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: 'power3.out',
            });
          });
        },
      });

      gsap.fromTo(
        bgRef.current,
        { opacity: 0.4, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
      );
    },
  });
};

export const initializeAuthAnimations = (formRef, bgRef) => {
  const formElements = formRef.current.querySelectorAll('input, button, label');
  gsap.set(formElements, { opacity: 1, y: 0 });
  gsap.set(bgRef.current, { opacity: 1, scale: 1 });
};
