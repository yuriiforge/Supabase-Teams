import { type RefObject, useEffect, useRef } from "react";

type Handler = (event: MouseEvent | TouchEvent) => void;

/**
 * A custom hook that triggers a handler function when a click is detected
 * outside of the element referenced by the returned ref.
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
    handler: Handler,
): RefObject<T | null> {
    const ref = useRef<T>(null);

    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }

            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);

    return ref;
}
