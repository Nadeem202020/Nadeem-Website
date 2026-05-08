import { useEffect, useRef, useState } from "react";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import "./Hero.css";

const titles = ["Software Engineer", "Backend Developer", "AI Enthusiast"];

export default function Hero({ meta }) {
  const sectionRef = useRef(null);
  const audioCtxRef = useRef(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [audioReady, setAudioReady] = useState(false); // tracks if audio is unlocked
  const isVisible = useScrollAnimation(sectionRef, {
    threshold: 0.15,
    triggerOnce: false,
  });

  const initAudio = () => {
    if (audioCtxRef.current) return; // already initialized
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      audioCtxRef.current.resume().then(() => setAudioReady(true));
    } catch (e) {
      // AudioContext not supported
    }
  };

  const playSound = (deleting = false) => {
    const ctx = audioCtxRef.current;
    if (!ctx || ctx.state !== "running") return;

    try {
      const now = ctx.currentTime;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.connect(g);
      g.connect(ctx.destination);

      o.type = "sine";
      o.frequency.value = deleting ? 420 : 880;

      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.06, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      o.start(now);
      o.stop(now + 0.09);
    } catch (e) {
      // silently fail
    }
  };

  // Unlock audio on first interaction anywhere on the page
  useEffect(() => {
    const unlock = () => {
      initAudio();
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("scroll", unlock); // scroll also counts as interaction
    };

    window.addEventListener("click", unlock, { passive: true });
    window.addEventListener("keydown", unlock, { passive: true });
    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("scroll", unlock, { passive: true }); // catches mobile swipe-to-scroll

    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("scroll", unlock);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const currentTitle = titles[titleIndex];
    let deleteTimer = null;

    const timer = setTimeout(
      () => {
        if (isDeleting) {
          if (displayedTitle.length > 0) playSound(true);
          setDisplayedTitle(
            currentTitle.substring(0, displayedTitle.length - 1),
          );
          if (displayedTitle.length === 1) {
            setIsDeleting(false);
            setTitleIndex((titleIndex + 1) % titles.length);
          }
        } else {
          if (displayedTitle.length < currentTitle.length) {
            playSound(false);
            setDisplayedTitle(
              currentTitle.substring(0, displayedTitle.length + 1),
            );
          } else {
            deleteTimer = setTimeout(() => setIsDeleting(true), 1500);
          }
        }
      },
      isDeleting ? 50 : 75,
    );

    return () => {
      clearTimeout(timer);
      if (deleteTimer) clearTimeout(deleteTimer);
    };
  }, [displayedTitle, isDeleting, titleIndex, isVisible, audioReady]);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className={`hero ${isVisible ? "section-visible" : "section-hidden"}`}
      ref={sectionRef}
    >
      <div className="hero-content">
        <p className="hero-label">Hello, I'm</p>
        <h1 className="hero-name">{meta?.name || "Nadeem Mohamed"}</h1>

        <div className="hero-typewriter">
          <span className="typewriter-text">{displayedTitle}</span>
          <span className="typewriter-cursor"></span>
        </div>

        <p className="hero-tagline">{meta?.tagline}</p>

        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={scrollToProjects}>
            View Projects
          </button>
          <a
            href={`${import.meta.env.BASE_URL}portfolio.pdf`}
            className="btn btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Portfolio
          </a>
        </div>
      </div>
    </section>
  );
}
