import { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { id: "hero" },
    { label: "About", id: "about" },
    { label: "Experience", id: "experience" },
    { label: "Projects", id: "projects" },
    { label: "Skills", id: "skills" },
    { label: "Education", id: "education" },
    { label: "Certifications", id: "certifications" },
    { label: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div
          className="navbar-logo"
          onClick={() => {
            scrollToSection("hero");
          }}
        >
          NM
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links-desktop">
          {navLinks.map((link) => (
            <button
              key={link.id}
              className="nav-link"
              type="button"
              onClick={() => scrollToSection(link.id)}
            >
              {link.label}
            </button>
          ))}
          <a
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            className="resume-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`hamburger ${isOpen ? "active" : ""}`}
          type="button"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu" id="mobile-navigation">
          {navLinks.map((link) => (
            <button
              key={link.id}
              className="mobile-nav-link"
              type="button"
              onClick={() => scrollToSection(link.id)}
            >
              {link.label}
            </button>
          ))}
          <a
            href={`${import.meta.env.BASE_URL}resume.pdf`}
            className="mobile-resume-button"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
          >
            Portfolio
          </a>
        </div>
      )}
    </nav>
  );
}
