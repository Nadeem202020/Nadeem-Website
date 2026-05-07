import { useEffect, useRef, useState } from "react";
import useScrollAnimation from "../../hooks/useScrollAnimation";
import ProjectCard from "../ui/ProjectCard";
import "./Projects.css";

const categories = [
  "All",
  "AI / ML",
  "Backend",
  "Data Engineering",
  "Full Stack",
  "Embedded",
  "Project Management",
];

export default function Projects({ projects }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const sectionRef = useRef(null);
  const isVisible = useScrollAnimation(sectionRef, { threshold: 0.05 });

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects?.filter((project) => project.category === activeFilter),
      );
    }
  }, [activeFilter, projects]);

  return (
    <section
      className={`projects ${isVisible ? "section-visible" : "section-hidden"}`}
      ref={sectionRef}
    >
      <h2 className="section-title">Projects</h2>

      {/* Filter Bar */}
      <div className="filter-bar">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-button ${
              activeFilter === category ? "active" : ""
            }`}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects?.map((project, idx) => (
          <div
            key={project.id || idx}
            className="project-card-wrapper"
            style={{
              animationDelay: `${idx * 0.1}s`,
            }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects?.length === 0 && (
        <div className="empty-state">
          <p>No projects found in this category.</p>
        </div>
      )}
    </section>
  );
}
