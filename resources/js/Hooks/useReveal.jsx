// resources/js/hooks/useReveal.js
//
// Unified reveal helper built on `motion` (the rebranded framer-motion).
// Exposes:
//   - hasMotion: boolean — is `motion` available at runtime?
//   - useInView: IntersectionObserver fallback (used only if motion is missing)
//   - Reveal: a drop-in wrapper component
//
// Consumers never import from `motion/react` directly — they import Reveal
// from here. That way, if the library name changes again, we patch one file.

import { useEffect, useRef, useState } from "react";
import { motion as MotionLib } from "motion/react";

export const hasMotion = Boolean(MotionLib);

/**
 * Fallback IntersectionObserver hook — only used if `motion` fails to load
 * (e.g. SSR edge case, or dev accidentally uninstalls it).
 * In normal operation this is never invoked because `Reveal` short-circuits
 * to the motion-based implementation.
 */
export function useInView(options = {}) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -60px 0px", ...options }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options.threshold, options.rootMargin]);

    return [ref, inView];
}

/**
 * Reveal — the wrapper used everywhere on the site.
 *
 * Props:
 *   - as: element tag (default "div")
 *   - delay: seconds (default 0)
 *   - y: initial vertical offset in px (default 24)
 *   - duration: seconds (default 0.7)
 *   - once: animate only on first in-view (default true)
 *   - className, style, children: passed through
 *
 * Usage:
 *   <Reveal delay={0.1}><h1>Hello</h1></Reveal>
 *   <Reveal as="section" y={40}><p>...</p></Reveal>
 */
export function Reveal({
    as = "div",
    delay = 0,
    y = 24,
    duration = 0.7,
    once = true,
    className = "",
    style,
    children,
    ...rest
}) {
    // Map `as` to a motion component (motion.div, motion.section, etc.)
    const MotionTag = MotionLib?.[as] ?? MotionLib?.div ?? "div";

    if (!hasMotion) {
        // Extremely defensive fallback — CSS class does the work.
        const FallbackTag = as;
        return (
            <FallbackTag
                className={`reveal-fallback ${className}`}
                style={{ animationDelay: `${delay}s`, ...style }}
                {...rest}
            >
                {children}
            </FallbackTag>
        );
    }

    return (
        <MotionTag
            className={className}
            style={style}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, amount: 0.2 }}
            transition={{
                duration,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
            {...rest}
        >
            {children}
        </MotionTag>
    );
}