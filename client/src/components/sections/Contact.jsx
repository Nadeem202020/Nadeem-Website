import { useRef } from "react";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import "./Contact.css";

export default function Contact({ meta }) {
  const sectionRef = useRef(null);
  const isVisible = useScrollAnimation(sectionRef, { threshold: 0.2 });

  const contactCards = [
    {
      id: "email",
      icon: "✉️",
      label: "Email",
      href: `mailto:${meta?.email}`,
      text: meta?.email,
      external: false,
    },
    {
      id: "linkedin",
      icon: "💼",
      label: "LinkedIn",
      href: meta?.linkedin,
      text: "Visit Profile",
      external: true,
    },
    {
      id: "github",
      icon: "🔧",
      label: "GitHub",
      href: meta?.github,
      text: "View Work",
      external: true,
    },
  ];

  return (
    <section
      className={`contact ${isVisible ? "section-visible" : "section-hidden"}`}
      ref={sectionRef}
    >
      <h2 className="section-title">Get In Touch</h2>

      <p className="contact-intro">
        I'm always interested in hearing from recruiters, collaborators, and
        anyone passionate about technology. Whether you have an opportunity, a
        question, or just want to chat, feel free to reach out!
      </p>

      {/* Contact Cards */}
      <div className="contact-cards">
        {contactCards.map((card, idx) => (
          <a
            key={card.id}
            href={card.href}
            className="contact-card"
            target={card.external ? "_blank" : undefined}
            rel={card.external ? "noopener noreferrer" : undefined}
            style={{
              animationDelay: `${idx * 0.1}s`,
            }}
          >
            <div className="contact-icon">{card.icon}</div>
            <p className="contact-label">{card.label}</p>
            <p className="contact-text">{card.text}</p>
          </a>
        ))}
      </div>

      {/* Location */}
      <p className="contact-location">Based in {meta?.location}</p>
    </section>
  );
}
