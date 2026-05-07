import { useRef } from "react";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import ExperienceCard from "./ExperienceCard";
import "./Experience.css";

export default function Experience({ experience }) {
  const sectionRef = useRef(null);
  const isVisible = useScrollAnimation(sectionRef, { threshold: 0.2 });

  return (
    <section
      className={`experience ${isVisible ? "section-visible" : "section-hidden"}`}
      ref={sectionRef}
    >
      <h2 className="section-title">Experience</h2>

      <div className="timeline-container">
        {/* Vertical Line */}
        <div className="timeline-line"></div>

        {/* Experience Cards */}
        <div className="cards-list">
          {experience?.map((item, idx) => (
            <ExperienceCard
              key={item.id || idx}
              item={item}
              isFirst={idx === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
