import { useEffect, useRef, useCallback } from 'react';

// Click sound hook - plays on button/link clicks
const useClickSound = () => {
    const audioContextRef = useRef(null);

    const playClickSound = useCallback(() => {
        try {
            // Create audio context if it doesn't exist
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            }

            const ctx = audioContextRef.current;

            // Resume context if suspended (browser autoplay policy)
            if (ctx.state === 'suspended') {
                ctx.resume();
            }

            // Create oscillator for a short, satisfying click
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            // Settings for a soft, pleasant "tick" sound
            oscillator.frequency.setValueAtTime(800, ctx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.03);

            oscillator.type = 'sine';

            // Quick fade for a clean, non-intrusive sound
            gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.05);
        } catch (e) {
            // Silently fail if audio context isn't supported
            console.log('Audio not supported');
        }
    }, []);

    useEffect(() => {
        // Add click event listener to document
        const handleClick = (e) => {
            const target = e.target;

            // Check if clicked element is interactive
            const isInteractive =
                target.tagName === 'BUTTON' ||
                target.tagName === 'A' ||
                target.closest('button') ||
                target.closest('a') ||
                target.classList.contains('btn-primary') ||
                target.closest('.btn-primary') ||
                target.getAttribute('role') === 'button';

            if (isInteractive) {
                playClickSound();
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [playClickSound]);

    return playClickSound;
};

// Component wrapper
const ClickSoundProvider = ({ children }) => {
    useClickSound();
    return children;
};

export { useClickSound };
export default ClickSoundProvider;
