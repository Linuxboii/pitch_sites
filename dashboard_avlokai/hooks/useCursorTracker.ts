"use client";

import { useRef, useCallback, useEffect, useState } from "react";

interface CursorPosition {
    /** Normalized X position within element (0–1) */
    x: number;
    /** Normalized Y position within element (0–1) */
    y: number;
    /** X offset from center (-0.5 to 0.5) */
    offsetX: number;
    /** Y offset from center (-0.5 to 0.5) */
    offsetY: number;
    /** Whether cursor is inside the element */
    isInside: boolean;
}

const DEFAULT_POSITION: CursorPosition = {
    x: 0.5,
    y: 0.5,
    offsetX: 0,
    offsetY: 0,
    isInside: false,
};

/**
 * Tracks cursor position relative to a referenced element.
 * Returns normalized coordinates for parallax, shadow direction, and glow effects.
 * Uses RAF for smooth 60fps updates without re-render storms.
 */
export function useCursorTracker<T extends HTMLElement = HTMLDivElement>() {
    const ref = useRef<T>(null);
    const [cursor, setCursor] = useState<CursorPosition>(DEFAULT_POSITION);
    const rafRef = useRef<number>(0);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!ref.current) return;

        cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            const rect = ref.current!.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            setCursor({
                x: Math.max(0, Math.min(1, x)),
                y: Math.max(0, Math.min(1, y)),
                offsetX: Math.max(-0.5, Math.min(0.5, x - 0.5)),
                offsetY: Math.max(-0.5, Math.min(0.5, y - 0.5)),
                isInside: true,
            });
        });
    }, []);

    const handleMouseLeave = useCallback(() => {
        cancelAnimationFrame(rafRef.current);
        setCursor(DEFAULT_POSITION);
    }, []);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            el.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(rafRef.current);
        };
    }, [handleMouseMove, handleMouseLeave]);

    return { ref, cursor };
}

/**
 * Generates inline styles for cursor-driven effects.
 * Use with useCursorTracker for parallax, shadow direction, and glow.
 */
export function getCursorStyles(cursor: CursorPosition, options?: {
    parallaxIntensity?: number;
    shadowIntensity?: number;
    glowColor?: string;
    glowIntensity?: number;
}) {
    const {
        parallaxIntensity = 2,
        shadowIntensity = 8,
        glowColor = "59, 130, 246",
        glowIntensity = 0.06,
    } = options ?? {};

    if (!cursor.isInside) {
        return {};
    }

    const translateX = cursor.offsetX * parallaxIntensity;
    const translateY = cursor.offsetY * parallaxIntensity;
    const shadowX = cursor.offsetX * shadowIntensity;
    const shadowY = cursor.offsetY * shadowIntensity;

    return {
        transform: `translate(${translateX}px, ${translateY}px) translateY(-1px)`,
        boxShadow: `${shadowX}px ${shadowY + 4}px 24px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(${glowColor}, ${glowIntensity})`,
        borderWidth: "1px",
        borderStyle: "solid" as const,
        borderColor: `rgba(255, 255, 255, 0.09)`,
    };
}
