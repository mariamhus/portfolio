import { useEffect, useRef, useState } from "react";

// True once the element has scrolled into view. It stays true, so entrance animations play once.
export function useInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [inView, threshold]);

  return [ref, inView] as const;
}
