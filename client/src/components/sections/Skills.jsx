import { useRef } from "react";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import SkillBadge from "../ui/SkillBadge";
import "./Skills.css";

export default function Skills({ skills = [] }) {
  const sectionRef = useRef(null);
  const isVisible = useScrollAnimation(sectionRef, { threshold: 0.2 });

  return (
    <section
      className={`skills ${isVisible ? "section-visible" : "section-hidden"}`}
      ref={sectionRef}
    >
      <h2 className="section-title">Skills</h2>

      <div className="skills-container">
        {Array.isArray(skills) &&
          skills.map((category, idx) => (
            <div
              key={idx}
              className="skill-category"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <h3 className="category-name">{category.name}</h3>
              <div className="skills-row">
                {Array.isArray(category.skills) &&
                  category.skills.map((skill, skillIdx) => (
                    <SkillBadge key={skillIdx} label={skill} />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
