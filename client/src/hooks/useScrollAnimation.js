import { useEffect, useState } from "react";

export default function useScrollAnimation(ref, options = {}) {
  const {
    threshold = 0.15,
    root = null,
    rootMargin = "0px",
    triggerOnce = true,
  } = options;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref?.current;

    if (!element) {
      return undefined;
    }

    const rect = element.getBoundingClientRect();
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const visibleHeight =
      Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
    const visibleRatio = visibleHeight > 0 ? visibleHeight / rect.height : 0;

    if (visibleRatio >= threshold) {
      setIsVisible(true);

      if (triggerOnce) {
        return undefined;
      }
    }

    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          if (triggerOnce) {
            observer.unobserve(entry.target);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, root, rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, root, rootMargin, threshold, triggerOnce]);

  return isVisible;
}
