import { useEffect, useRef, useState } from "react";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import "./Hero.css";

const titles = ["Software Engineer", "Backend Developer", "AI Enthusiast"];

export default function Hero({ meta }) {
  const sectionRef = useRef(null);
  const audioCtxRef = useRef(null);
  const audioBufferRef = useRef(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const isVisible = useScrollAnimation(sectionRef, {
    threshold: 0.15,
    triggerOnce: false,
  });

  const playSound = (deleting = false) => {
    try {
      // Don't play when section is not visible
      if (!isVisible) return;

      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      // If context is suspended (Chrome autoplay policy) don't try to play here.
      if (ctx.state !== "running") return;

      const now = ctx.currentTime;

      // If we have a decoded paper sound sample, play a short slice of it.
      if (audioBufferRef.current) {
        const src = ctx.createBufferSource();
        const g = ctx.createGain();
        src.buffer = audioBufferRef.current;
        // Slightly vary pitch for deleting vs typing
        src.playbackRate.value = deleting ? 0.9 : 1.05;
        src.connect(g);
        g.connect(ctx.destination);

        g.gain.setValueAtTime(0.0001, now);
        g.gain.exponentialRampToValueAtTime(0.06, now + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

        src.start(now, 0, 0.12);
        // no need to call stop if duration provided, but schedule safety
        src.stop(now + 0.13);
        return;
      }

      // Fallback oscillator (keeps existing behavior if sample not available)
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
      // silently fail if AudioContext is not available
    }
  };

  // Ensure AudioContext is created/resumed on first user gesture (Chrome autoplay rules)
  useEffect(() => {
    const resumeHandler = () => {
      try {
        if (!audioCtxRef.current) {
          const AudioCtx = window.AudioContext || window.webkitAudioContext;
          audioCtxRef.current = new AudioCtx();
        }
        if (audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume().catch(() => {});
        }
        // Try to load a paper-scratch sample from public/ for a more natural sound
        try {
          const base = import.meta.env.BASE_URL || "/";
          const url = `${base}paper-scratch.mp3`;
          fetch(url)
            .then((r) => {
              if (!r.ok) throw new Error("no sample");
              return r.arrayBuffer();
            })
            .then((ab) => audioCtxRef.current.decodeAudioData(ab))
            .then((buf) => {
              audioBufferRef.current = buf;
            })
            .catch(() => {
              // ignore if sample missing or decode fails
            });
        } catch (e) {
          // ignore
        }
      } catch (e) {
        // ignore
      }
    };

    window.addEventListener("click", resumeHandler, { once: true });
    window.addEventListener("keydown", resumeHandler, { once: true });

    return () => {
      try {
        if (audioCtxRef.current) {
          audioCtxRef.current.close().catch(() => {});
          audioCtxRef.current = null;
        }
      } catch (e) {
        // ignore
      }
      window.removeEventListener("click", resumeHandler);
      window.removeEventListener("keydown", resumeHandler);
    };
  }, []);

  useEffect(() => {
    // Pause the typewriter when the hero isn't visible so it preserves state
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
  }, [displayedTitle, isDeleting, titleIndex, isVisible]);

  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
          {/* <a
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            className="btn btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume
          </a> */}
        </div>
      </div>
    </section>
  );
}
