import { useRef } from "react";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import "./Volunteering.css";

export default function Volunteering({ volunteering }) {
  const sectionRef = useRef(null);
  const isVisible = useScrollAnimation(sectionRef, { threshold: 0.2 });

  return (
    <section
      className={`volunteering ${isVisible ? "section-visible" : "section-hidden"}`}
      ref={sectionRef}
    >
      <h2 className="section-title">Volunteering & Leadership</h2>

      <div className="volunteering-grid">
        {volunteering?.map((item, idx) => (
          <div
            key={item.id || idx}
            className={`volunteer-card ${
              item.role?.includes("Director") ? "elevated" : ""
            }`}
            style={{
              animationDelay: `${idx * 0.1}s`,
            }}
          >
            {item.role?.includes("Director") && (
              <div className="accent-bar"></div>
            )}

            <h3 className="volunteer-role">{item.role}</h3>
            <p className="volunteer-organization">{item.organization}</p>
            <p className="volunteer-period">{item.period}</p>

            {/* Bullet Points */}
            {item.bullets && item.bullets.length > 0 && (
              <ul className="volunteer-bullets">
                {item.bullets.map((bullet, bulletIdx) => (
                  <li key={bulletIdx}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
