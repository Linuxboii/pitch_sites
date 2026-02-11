"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Returns an array of booleans that become `true` one-by-one with a stagger delay.
 * Used for fade+slide entry animations on lists/grids.
 *
 * @param count Number of items to stagger
 * @param staggerMs Delay between each item (default: 60ms)
 * @param initialDelayMs Delay before the first item appears (default: 80ms)
 */
export function useStaggeredEntry(
    count: number,
    staggerMs: number = 60,
    initialDelayMs: number = 80
): boolean[] {
    const [visible, setVisible] = useState<boolean[]>(() => new Array(count).fill(false));
    const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

    useEffect(() => {
        // Clear any existing timeouts
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];

        // Reset on count change
        setVisible(new Array(count).fill(false));

        for (let i = 0; i < count; i++) {
            const timeout = setTimeout(() => {
                setVisible(prev => {
                    const next = [...prev];
                    next[i] = true;
                    return next;
                });
            }, initialDelayMs + i * staggerMs);
            timeoutsRef.current.push(timeout);
        }

        return () => {
            timeoutsRef.current.forEach(clearTimeout);
        };
    }, [count, staggerMs, initialDelayMs]);

    return visible;
}
