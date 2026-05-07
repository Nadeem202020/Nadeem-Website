import { useState } from "react";
import TagBadge from "../ui/TagBadge";
import "./ExperienceCard.css";

export default function ExperienceCard({ item, isFirst }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="experience-card">
      {/* Timeline Dot */}
      <div className="timeline-dot"></div>

      {/* Card Content */}
      <div className="card-content">
        <div className="card-header">
          <div className="card-title-group">
            <h3 className="company-name">{item.company}</h3>
            <p className="role">{item.role}</p>
          </div>
          <div className="header-badges">
            <span className="job-type">{item.type}</span>
          </div>
        </div>

        <p className="period">{item.period}</p>

        {/* Expandable Bullets */}
        <div className={`bullets-container ${isExpanded ? "expanded" : ""}`}>
          <ul className="bullets-list">
            {item.bullets?.map((bullet, idx) => (
              <li key={idx}>{bullet}</li>
            ))}
          </ul>
        </div>

        <button
          className="toggle-button"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>

        {/* Tech Tags */}
        {item.tech && item.tech.length > 0 && (
          <div className="tech-tags">
            {item.tech.map((tech, idx) => (
              <TagBadge key={idx} label={tech} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
