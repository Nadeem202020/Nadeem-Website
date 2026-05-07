import { useEffect, useRef, useState } from "react";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import "./Hero.css";

const titles = ["Software Engineer", "Backend Developer", "AI Enthusiast"];

export default function Hero({ meta }) {
  const sectionRef = useRef(null);
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const isVisible = useScrollAnimation(sectionRef);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    const timer = setTimeout(
      () => {
        if (isDeleting) {
          setDisplayedTitle(
            currentTitle.substring(0, displayedTitle.length - 1),
          );
          if (displayedTitle.length === 1) {
            setIsDeleting(false);
            setTitleIndex((titleIndex + 1) % titles.length);
          }
        } else {
          if (displayedTitle.length < currentTitle.length) {
            setDisplayedTitle(
              currentTitle.substring(0, displayedTitle.length + 1),
            );
          } else {
            setTimeout(() => setIsDeleting(true), 1500);
          }
        }
      },
      isDeleting ? 50 : 75,
    );

    return () => clearTimeout(timer);
  }, [displayedTitle, isDeleting, titleIndex]);

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
          <a
            href="/resume.pdf"
            className="btn btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
