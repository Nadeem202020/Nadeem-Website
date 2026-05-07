import { useRef } from "react";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import TagBadge from "../ui/TagBadge";
import "./Education.css";

export default function Education({ education }) {
  const sectionRef = useRef(null);
  const isVisible = useScrollAnimation(sectionRef, { threshold: 0.2 });

  if (!education) return null;

  return (
    <section
      className={`education ${isVisible ? "section-visible" : "section-hidden"}`}
      ref={sectionRef}
    >
      <h2 className="section-title">Education</h2>

      <div className="education-container">
        {/* Main Education Card */}
        <div className="education-card">
          <div className="education-header">
            <div className="education-info">
              <h3 className="institution">{education.institution}</h3>
              <p className="degree">{education.degree}</p>
              <p className="period">{education.period}</p>
            </div>

            {/* GPA Display */}
            <div className="gpa-display">
              <span className="gpa-value">{education.gpa}</span>
              <span className="gpa-note">{education.gpaNote}</span>
            </div>
          </div>

          {/* Coursework Tags */}
          {education.coursework && education.coursework.length > 0 && (
            <div className="coursework-section">
              <p className="coursework-label">Relevant Coursework</p>
              <div className="coursework-tags">
                {education.coursework.map((course, idx) => (
                  <TagBadge key={idx} label={course} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Thesis Card */}
        {education.thesis && (
          <div className="thesis-card">
            <div className="thesis-header">
              <span className="thesis-label">Bachelor Thesis</span>
              <span className="grade-badge">{education.thesis.grade}</span>
            </div>

            <h3 className="thesis-title">{education.thesis.title}</h3>
            <p className="thesis-description">{education.thesis.description}</p>

            {/* Metric Callout */}
            <div className="metric-callout">
              <span className="metric-value">+52.9%</span>
              <span className="metric-label">over Uber's LSTM baseline</span>
            </div>

            {/* Tech Tags */}
            {education.thesis.tech && education.thesis.tech.length > 0 && (
              <div className="thesis-tech-tags">
                {education.thesis.tech.map((tech, idx) => (
                  <TagBadge key={idx} label={tech} />
                ))}
              </div>
            )}

            {/* Period */}
            {education.thesis.period && (
              <p className="thesis-period">{education.thesis.period}</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
