import { useState } from "react";
import TagBadge from "../ui/TagBadge";
import "./ProjectCard.css";

export default function ProjectCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="project-card">
      {/* Category Badge */}
      <div className="card-top">
        <span className="category-badge">{project.category}</span>
        {project.highlight && (
          <span className="highlight-badge">Highlighted</span>
        )}
      </div>

      {/* Title */}
      <h3 className="project-title">{project.title}</h3>

      {/* Description */}
      <p className="project-description">{project.description}</p>

      {/* Expandable Bullets */}
      <div className={`bullets-container ${isExpanded ? "expanded" : ""}`}>
        <ul className="bullets-list">
          {project.bullets?.map((bullet, idx) => (
            <li key={idx}>{bullet}</li>
          ))}
        </ul>
      </div>

      {/* Toggle Button */}
      {project.bullets && project.bullets.length > 0 && (
        <button
          className="toggle-button"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      )}

      {/* Tech Tags */}
      {project.tech && project.tech.length > 0 && (
        <div className="tech-tags">
          {project.tech.map((tech, idx) => (
            <TagBadge key={idx} label={tech} />
          ))}
        </div>
      )}
    </div>
  );
}
