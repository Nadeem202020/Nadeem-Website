import { usePortfolioData } from "./hooks/usePortfolioData";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Education from "./components/sections/Education";
import Certifications from "./components/sections/Certifications";
import Volunteering from "./components/sections/Volunteering";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";
import "./App.css";

export default function App() {
  const { data, loading, error } = usePortfolioData();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading portfolio...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h1>Oops!</h1>
        <p>Failed to load portfolio data: {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="error-container">
        <h1>No Data</h1>
        <p>Portfolio data could not be found.</p>
      </div>
    );
  }

  return (
    <main className="app">
      <Navbar />
      <section id="hero">
        <Hero meta={data.meta} />
      </section>
      <section id="about">
        <About meta={data.meta} about={data.about} />
      </section>
      <section id="experience">
        <Experience experience={data.experience} />
      </section>
      <section id="projects">
        <Projects projects={data.projects} />
      </section>
      <section id="skills">
        <Skills skills={data.skills?.categories || []} />
      </section>
      <section id="education">
        <Education education={data.education} />
      </section>
      <section id="certifications">
        <Certifications certifications={data.certifications} />
      </section>
      <section id="volunteering">
        <Volunteering volunteering={data.volunteering} />
      </section>
      <section id="contact">
        <Contact meta={data.meta} />
      </section>
      <Footer meta={data.meta} />
    </main>
  );
}
