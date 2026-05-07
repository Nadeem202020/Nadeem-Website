import { useRef } from "react";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import "./About.css";

export default function About({ meta, about }) {
  const sectionRef = useRef(null);
  const isVisible = useScrollAnimation(sectionRef, { threshold: 0.3 });

  const contactItems = [
    {
      id: "location",
      icon: "📍",
      label: meta?.location,
      href: null,
    },
    {
      id: "email",
      icon: "✉️",
      label: meta?.email,
      href: `mailto:${meta?.email}`,
    },
    {
      id: "linkedin",
      icon: "in",
      label: "LinkedIn",
      href: meta?.linkedin,
    },
    {
      id: "github",
      icon: "gh",
      label: "GitHub",
      href: meta?.github,
    },
  ];

  return (
    <section
      className={`about ${isVisible ? "section-visible" : "section-hidden"}`}
      ref={sectionRef}
    >
      <div className="about-container">
        {/* Left: Profile Photo */}
        <div className="about-photo">
          <img
            src={meta?.profilePhoto}
            alt={meta?.name}
            className="profile-image"
          />
        </div>

        {/* Right: Content */}
        <div className="about-content">
          <h2 className="section-title">About Me</h2>
          <p className="about-summary">{about?.summary}</p>

          {/* Contact Info */}
          <div className="contact-info">
            {contactItems.map((item) => (
              <div key={item.id} className="contact-item">
                <span className="contact-icon">{item.icon}</span>
                {item.href ? (
                  <a
                    href={item.href}
                    className="contact-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="contact-text">{item.label}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
