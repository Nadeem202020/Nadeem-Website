import { useRef } from "react";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import "./Certifications.css";

export default function Certifications({ certifications }) {
  const sectionRef = useRef(null);
  const isVisible = useScrollAnimation(sectionRef, { threshold: 0.2 });

  return (
    <section
      className={`certifications ${isVisible ? "section-visible" : "section-hidden"}`}
      ref={sectionRef}
    >
      <h2 className="section-title">Certifications</h2>

      <div className="certifications-grid">
        {certifications?.map((cert, idx) => (
          <div
            key={cert.id || idx}
            className="certification-card"
            style={{
              animationDelay: `${idx * 0.1}s`,
            }}
          >
            <h3 className="cert-title">{cert.title}</h3>
            <p className="cert-issuer">{cert.issuer}</p>
            <p className="cert-date">{cert.date}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
