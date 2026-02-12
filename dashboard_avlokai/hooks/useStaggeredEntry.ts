"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Returns an array of booleans that become `true` in batches with a stagger delay.
 * Used for fade+slide entry animations on lists/grids.
 *
 * Items are revealed progressively, but batched to avoid excessive re-renders.
 * For large counts (>20), items are grouped into batches to keep renders manageable.
 *
 * @param count Number of items to stagger
 * @param staggerMs Delay between each batch (default: 60ms)
 * @param initialDelayMs Delay before the first item appears (default: 80ms)
 */
export function useStaggeredEntry(
    count: number,
    staggerMs: number = 60,
    initialDelayMs: number = 80
): boolean[] {
    const [visible, setVisible] = useState<boolean[]>(() => new Array(count).fill(false));
    const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
    const prevCountRef = useRef(count);

    useEffect(() => {
        // Clear any existing timeouts
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];

        // Reset if count changed
        if (prevCountRef.current !== count) {
            prevCountRef.current = count;
        }
        setVisible(new Array(count).fill(false));

        // For large counts, batch items to limit total re-renders to ~20
        const maxRenders = 20;
        const batchSize = Math.max(1, Math.ceil(count / maxRenders));
        const totalBatches = Math.ceil(count / batchSize);

        for (let batch = 0; batch < totalBatches; batch++) {
            const timeout = setTimeout(() => {
                setVisible(prev => {
                    const next = [...prev];
                    const start = batch * batchSize;
                    const end = Math.min(start + batchSize, count);
                    for (let i = start; i < end; i++) {
                        next[i] = true;
                    }
                    return next;
                });
            }, initialDelayMs + batch * staggerMs);
            timeoutsRef.current.push(timeout);
        }

        return () => {
            timeoutsRef.current.forEach(clearTimeout);
        };
    }, [count, staggerMs, initialDelayMs]);

    return visible;
}
