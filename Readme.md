# Nadeem Mohamed — Portfolio Website Development Plan

> A step-by-step implementation guide for use with GitHub Copilot in VS Code.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack &amp; Architecture](#2-tech-stack--architecture)
3. [Folder Structure](#3-folder-structure)
4. [Data Structure (JSON Schema)](#4-data-structure-json-schema)
5. [Backend Design (Express.js)](#5-backend-design-expressjs)
6. [Frontend Design (React Components)](#6-frontend-design-react-components)
7. [Visual Design Direction](#7-visual-design-direction)
8. [Step-by-Step Implementation Plan](#8-step-by-step-implementation-plan)
9. [GitHub Setup &amp; Deployment](#9-github-setup--deployment)
10. [Sequential GitHub Copilot Prompts](#10-sequential-github-copilot-prompts)

---

## 1. Project Overview

**Owner:** Nadeem Mohamed Soliman
**Type:** Personal Portfolio Website
**Goal:** A responsive, modern portfolio that showcases Nadeem's software engineering experience, university projects, skills, and contact information — aimed at recruiters, engineering teams, and collaborators.

**Key Highlights to feature:**

- Graduating June 2026, German University in Cairo — GPA 1.24/5.0 (top of class, German scale)
- Bachelor Thesis: Vision Transformer for Autonomous Vehicle Intention Prediction (beat Uber's LSTM baseline by 52.9%)
- Current SWE at Turuq (logistics tech); internships at Ejada, Link Development, Electrolux, QNB Egypt
- Skills span backend, data engineering, AI/ML, cloud, and full-stack
- IEEE Director, Junior TA
- 9+ university projects across AI, distributed systems, data pipelines, and web

---

## 2. Tech Stack & Architecture

```
┌─────────────────────────────────────┐
│           GitHub Pages              │  ← Deployment (static hosting)
│     (serves built React app)        │
└────────────────┬────────────────────┘
                 │
┌────────────────▼────────────────────┐
│         React Frontend              │  ← Vite + React (SPA)
│   (fetches JSON, no live backend)   │
└────────────────┬────────────────────┘
                 │ reads
┌────────────────▼────────────────────┐
│         portfolio-data.json         │  ← Single source of truth
│    (static file in /public)         │
└─────────────────────────────────────┘

      + Express.js Backend (optional local dev server)
      Used during development only to serve/validate JSON.
      Not deployed — GitHub Pages serves the built static app.
```

**Why this architecture?**

- GitHub Pages only hosts static files, so the Express backend is a **local dev utility**, not a deployed server.
- All data lives in a single `portfolio-data.json` file — easy to update, no database overhead.
- React (via Vite) handles all rendering and routing on the client side.
- For deployment, `npm run build` produces a static `/dist` folder pushed to the `gh-pages` branch.

---

## 3. Folder Structure

```
nadeem-portfolio/
│
├── client/                          # React frontend (Vite)
│   ├── public/
│   │   ├── portfolio-data.json      # All portfolio content (single source of truth)
│   │   └── profile.jpg             # Your profile photo
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── sections/
│   │   │   │   ├── Hero.jsx
│   │   │   │   ├── About.jsx
│   │   │   │   ├── Experience.jsx
│   │   │   │   ├── Projects.jsx
│   │   │   │   ├── Skills.jsx
│   │   │   │   ├── Education.jsx
│   │   │   │   ├── Certifications.jsx
│   │   │   │   ├── Volunteering.jsx
│   │   │   │   └── Contact.jsx
│   │   │   └── ui/
│   │   │       ├── ProjectCard.jsx
│   │   │       ├── ExperienceCard.jsx
│   │   │       ├── SkillBadge.jsx
│   │   │       ├── SectionTitle.jsx
│   │   │       └── TagBadge.jsx
│   │   ├── hooks/
│   │   │   └── usePortfolioData.js  # Custom hook to fetch JSON
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   └── variables.css        # CSS custom properties (theme)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                          # Express backend (local dev only)
│   ├── index.js                     # Express app entry point
│   ├── routes/
│   │   └── portfolio.js             # GET /api/portfolio
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── deploy.yml               # GitHub Actions: build & deploy to gh-pages
│
├── .gitignore
└── README.md
```

---

## 4. Data Structure (JSON Schema)

File location: `client/public/portfolio-data.json`

```json
{
  "meta": {
    "name": "Nadeem Mohamed Soliman",
    "title": "Software Engineer",
    "tagline": "Building backend systems, data pipelines, and AI applications.",
    "email": "nadeem.mohammed@icloud.com",
    "phone": "+20 100 955 9273",
    "linkedin": "https://linkedin.com/in/nadeem-soliman",
    "github": "https://github.com/Nadeem202020",
    "location": "Cairo, Egypt",
    "profilePhoto": "/profile.jpg",
    "resumeUrl": "/resume.pdf"
  },

  "about": {
    "summary": "Senior Computer Science and Engineering student at the German University in Cairo, graduating June 2026 with an A+ Bachelor's degree. I have shipped backend systems, data pipelines, and AI applications across banking, logistics, and enterprise software. I focus on building services that hold up under load, pipelines that don't need babysitting, and code that the next engineer can actually understand."
  },

  "education": [
    {
      "id": "edu-1",
      "institution": "German University in Cairo (GUC)",
      "degree": "Bachelor of Science in Computer Engineering and Science",
      "period": "Sep 2021 – Jun 2026 (Expected)",
      "gpa": "1.24 / 5.0",
      "gpaNote": "Top of class — German grading scale where 1.0 is the highest possible grade",
      "thesis": {
        "title": "Vision Transformer Framework for Vehicle Intention Prediction",
        "grade": "A+",
        "description": "Trained a Vision Transformer (ViT) to predict vehicle maneuvers in autonomous driving scenarios, beating Uber's baseline LSTM model by 52.9%.",
        "tech": ["PyTorch", "Python", "Argoverse 2"],
        "period": "Feb 2025 – Jun 2025"
      },
      "coursework": [
        "Cloud Computing",
        "Data Structures and Algorithms",
        "Operating Systems",
        "Computer Networks",
        "Database Systems",
        "Network Security",
        "Project Management"
      ]
    }
  ],

  "experience": [
    {
      "id": "exp-1",
      "company": "Turuq",
      "role": "Software Engineer",
      "type": "Full-time",
      "period": "Oct 2025 – Present",
      "bullets": [
        "Built an embedded Shopify app in Remix, React, and Node.js connecting merchant stores to a logistics backend via Shopify Webhooks and GraphQL.",
        "Shipped bulk waybill generation cutting manual processing time by 80% across all merchant accounts.",
        "Contributed to a courier management service on Bun, Hono, Clerk, MongoDB, and Next.js for real-time order tracking.",
        "Built a customer communication service on Meta Cloud API handling inbound/outbound messaging and HMAC-verified webhooks.",
        "Unified WhatsApp, SMS, and email into a single modular TypeScript backend using inheritance and polymorphism."
      ],
      "tech": ["Remix", "React", "Node.js", "Shopify", "GraphQL", "Bun", "Hono", "MongoDB", "TypeScript", "Meta API"]
    },
    {
      "id": "exp-2",
      "company": "Ejada",
      "role": "Backend Developer Intern",
      "type": "Internship",
      "period": "Aug 2025",
      "bullets": [
        "Built Spring Boot microservices for a virtual banking platform with Apache Kafka for async messaging.",
        "Wired in WSO2 API Gateway for authenticated, rate-limited external routing.",
        "Delivered REST APIs with OAuth 2.0 authentication and role-based access control."
      ],
      "tech": ["Spring Boot", "Apache Kafka", "WSO2", "OAuth 2.0", "Java"]
    },
    {
      "id": "exp-3",
      "company": "Link Development",
      "role": "Backend Developer Intern",
      "type": "Internship",
      "period": "Jul 2025 – Aug 2025",
      "bullets": [
        "Integrated Keycloak SSO into OpenKM, consolidating identity management in a Dockerized MSSQL environment.",
        "Built automated backup and recovery pipelines using Rclone for compliance and disaster recovery.",
        "Wrote deployment documentation that cut engineer ramp-up time by 60%."
      ],
      "tech": ["Keycloak", "Docker", "MSSQL", "Rclone", "OpenKM"]
    },
    {
      "id": "exp-4",
      "company": "Electrolux",
      "role": "System Development Intern",
      "type": "Internship",
      "period": "Aug 2024 – Sep 2024",
      "bullets": [
        "Built an automated quality tracking system in VBA (Excel and Access) replacing a fully manual process.",
        "Cut data entry time by 70% while improving reporting accuracy."
      ],
      "tech": ["VBA", "Excel", "Access"]
    },
    {
      "id": "exp-5",
      "company": "QNB Egypt",
      "role": "Full Stack Intern",
      "type": "Internship",
      "period": "Jul 2024",
      "bullets": [
        "Built a customer survey platform in Java, XHTML, and MySQL for branch teams to collect and review structured feedback."
      ],
      "tech": ["Java", "XHTML", "MySQL"]
    },
    {
      "id": "exp-6",
      "company": "BVS Company",
      "role": "Technical Intern",
      "type": "Internship",
      "period": "Jul 2024 – Sep 2024",
      "bullets": [
        "Completed structured training in IBM DataPower API Gateway configuration, ACH payment processing, and enterprise banking security protocols."
      ],
      "tech": ["IBM DataPower", "ACH", "API Gateway"]
    },
    {
      "id": "exp-7",
      "company": "The Sparks Foundation",
      "role": "Software Development Intern",
      "type": "Internship",
      "period": "Jul 2023",
      "bullets": [
        "Delivered a full-stack MERN banking app with user authentication, account management, and transaction history end-to-end in one month."
      ],
      "tech": ["MongoDB", "Express.js", "React", "Node.js"]
    }
  ],

  "projects": [
    {
      "id": "proj-1",
      "title": "Vision Transformer for Autonomous Vehicle Intention Prediction",
      "category": "AI / Research",
      "highlight": true,
      "description": "Trained a ViT to predict vehicle maneuvers, beating Uber's LSTM baseline by 52.9% on Argoverse 2.",
      "bullets": [
        "Beat Uber's baseline LSTM model by 52.9%.",
        "Handled data preprocessing and temporal feature extraction on the Argoverse 2 dataset."
      ],
      "tech": ["PyTorch", "Python", "Vision Transformers", "Argoverse 2"]
    },
    {
      "id": "proj-2",
      "title": "Massively Scalable Food Delivery Platform (Talabat-like)",
      "category": "Backend / Distributed Systems",
      "highlight": true,
      "description": "Microservices-based food delivery platform with JWT auth, Redis caching, MongoDB audit logging, and distributed service communication.",
      "bullets": [
        "Owned User Service end-to-end with JWT auth, BCrypt hashing, and role-based access control.",
        "Applied Observer design pattern for MongoDB audit logging without touching the business layer.",
        "Added Redis caching layer with TTL expiration to reduce unnecessary database calls."
      ],
      "tech": ["Spring Boot", "PostgreSQL", "MongoDB", "Redis", "JWT"]
    },
    {
      "id": "proj-3",
      "title": "Agentic NDA Contract Analysis System",
      "category": "AI / NLP",
      "highlight": true,
      "description": "Fine-tuned Qwen with QLoRA on ContractNLI to classify legal hypotheses, with a vector embedding layer for semantic search over contract clauses.",
      "bullets": [
        "Fine-tuned Qwen using QLoRA on ContractNLI benchmark for 17 legal hypothesis classifications.",
        "Built vector embedding layer for semantic search over contract clauses.",
        "Focused on output reliability and consistency across real-world legal documents."
      ],
      "tech": ["LLMs", "QLoRA", "Agentic AI", "NLP", "Python"]
    },
    {
      "id": "proj-4",
      "title": "Real-Time Stock Analytics Platform",
      "category": "Data Engineering",
      "highlight": true,
      "description": "End-to-end data pipeline with Kafka/PySpark streaming, Airflow orchestration, PostgreSQL storage, and a GenAI Text-to-SQL agent with Apache Superset dashboards.",
      "bullets": [
        "Built streaming pipeline with Kafka and PySpark orchestrated by Apache Airflow.",
        "Integrated a GenAI Text-to-SQL agent using LangChain.",
        "Built interactive dashboards with Apache Superset."
      ],
      "tech": ["Kafka", "Spark", "Airflow", "Docker", "LangChain", "PostgreSQL", "Superset"]
    },
    {
      "id": "proj-5",
      "title": "Graph-RAG Travel Assistant",
      "category": "AI / Knowledge Graphs",
      "highlight": false,
      "description": "Knowledge graph from 50,000+ hotel reviews with Cypher-based retrieval, named entity recognition, SHAP/LIME explainability, and a Streamlit frontend.",
      "bullets": [
        "Built knowledge graph from 50,000+ hotel reviews with Cypher-based retrieval and NER.",
        "Combined vector similarity search with graph traversal for grounded LLM answers.",
        "Added SHAP and LIME explainability to ML models."
      ],
      "tech": ["Python", "Neo4j", "LangChain", "Streamlit", "SHAP", "LIME"]
    },
    {
      "id": "proj-6",
      "title": "All-in-One Vacation Platform",
      "category": "Full Stack",
      "highlight": false,
      "description": "Full-stack travel booking platform with flight/hotel search, promo codes, Stripe payments, and Amadeus live booking integration.",
      "bullets": [
        "Integrated Stripe for payments and Amadeus for live booking data.",
        "Built in an Agile team using Git and GitHub."
      ],
      "tech": ["MongoDB", "Express.js", "React", "Node.js", "Stripe API", "Amadeus API"]
    },
    {
      "id": "proj-7",
      "title": "University Academic System and Portal",
      "category": "Backend / Database",
      "highlight": false,
      "description": "Academic management system with 50+ stored procedures, views, triggers, and a role-based web portal for students, advisors, and administrators.",
      "bullets": [
        "Designed normalized relational schema with 50+ stored procedures, views, triggers, and functions.",
        "Automated registration, graduation checks, and probation rules.",
        "Built role-based portal for students, advisors, and administrators."
      ],
      "tech": ["SQL Server", "JavaScript", "HTML", "CSS"]
    },
    {
      "id": "proj-8",
      "title": "Embedded Auto Lane Detection",
      "category": "Embedded Systems",
      "highlight": false,
      "description": "Real-time lane detection system in C interfacing directly with hardware drivers for autonomous navigation.",
      "bullets": [
        "Built real-time lane detection in C with direct hardware driver integration."
      ],
      "tech": ["C", "Embedded Systems", "Hardware Integration"]
    }
  ],

  "skills": {
    "categories": [
      {
        "name": "Backend & APIs",
        "skills": ["Java", "Spring Boot", "Node.js", "Express.js", "Microservices", "REST APIs", "GraphQL", "OAuth 2.0", "Event-Driven Architecture", "WSO2"]
      },
      {
        "name": "AI & Machine Learning",
        "skills": ["PyTorch", "Scikit-learn", "Computer Vision", "NLP", "Vision Transformers", "QLoRA", "Hyperparameter Tuning (Optuna)", "TensorFlow"]
      },
      {
        "name": "Data Engineering",
        "skills": ["Apache Kafka", "Apache Spark (PySpark)", "Apache Airflow", "ETL Pipelines", "Stream Processing", "Apache Superset"]
      },
      {
        "name": "Databases & Graph",
        "skills": ["PostgreSQL", "MySQL", "MongoDB", "MSSQL", "Redis", "Neo4j", "SQL Optimization", "Knowledge Graphs"]
      },
      {
        "name": "Cloud & DevOps",
        "skills": ["Docker", "Git", "GitHub", "Linux", "GCP", "AWS (EC2, S3, RDS)", "CI/CD Pipelines", "IBM DataPower", "Kubernetes"]
      },
      {
        "name": "Frontend",
        "skills": ["React", "Remix", "TypeScript", "JavaScript", "HTML", "CSS"]
      },
      {
        "name": "Languages",
        "skills": ["Python", "Java", "TypeScript", "JavaScript", "C", "C++", "SQL"]
      },
      {
        "name": "Concepts",
        "skills": ["Distributed Systems", "System Design", "Design Patterns", "RAG Systems", "OOP", "Data Structures", "Algorithms", "Agile/Scrum"]
      }
    ]
  },

  "certifications": [
    {
      "title": "Data Structures and Algorithms",
      "issuer": "Microsoft",
      "date": "November 2025"
    },
    {
      "title": "Web Development",
      "issuer": "Microsoft & Sprints",
      "date": "October 2025"
    },
    {
      "title": "Machine Learning and AI",
      "issuer": "Microsoft & Sprints",
      "date": "September 2025"
    },
    {
      "title": "DevOps",
      "issuer": "Microsoft & Sprints",
      "date": "August 2025"
    },
    {
      "title": "Google Cloud Fundamentals: Core Infrastructure",
      "issuer": "Google Cloud",
      "date": "2024"
    },
    {
      "title": "Essential Google Cloud Infrastructure: Foundation",
      "issuer": "Google Cloud",
      "date": "2024"
    },
    {
      "title": "Essential Google Cloud Infrastructure: Core Services",
      "issuer": "Google Cloud",
      "date": "2024"
    }
  ],

  "volunteering": [
    {
      "id": "vol-1",
      "role": "Director, Juniors Technical Program",
      "organization": "IEEE GUC Student Branch",
      "period": "Sep 2024 – Jul 2025",
      "bullets": [
        "Led the technical program, coordinating a team to plan and run 36 technical sessions across the academic year.",
        "Nearly 50 students learned from the program."
      ]
    },
    {
      "id": "vol-2",
      "role": "Junior Teaching Assistant",
      "organization": "GUC — Introduction to Programming (CSEN 102)",
      "period": "Sep 2023 – Jan 2024",
      "bullets": [
        "Ran weekly Python lab sessions for 20+ students covering data structures, algorithms, and OOP."
      ]
    }
  ]
}
```

---

## 5. Backend Design (Express.js)

> The Express server is for **local development only**. It is not deployed.

**`server/index.js`** — Entry point:

- Serves `portfolio-data.json` via a GET endpoint
- Enables CORS so the React Vite dev server (port 5173) can fetch from it (port 3001)
- Serves static files from `client/public`

**Routes:**

| Method | Endpoint           | Response                                 |
| ------ | ------------------ | ---------------------------------------- |
| GET    | `/api/portfolio` | Full contents of `portfolio-data.json` |
| GET    | `/health`        | `{ status: "ok" }`                     |

**`server/routes/portfolio.js`:**

```js
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../../client/public/portfolio-data.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  res.json(data);
});

module.exports = router;
```

> **In production (GitHub Pages):** React fetches `portfolio-data.json` directly from `/public` using a relative URL — no server needed.

---

## 6. Frontend Design (React Components)

### Component Tree

```
App
├── Navbar                    — Fixed top nav with smooth scroll links
├── Hero                      — Full-screen intro: name, title, tagline, CTA buttons
├── About                     — Profile photo + summary paragraph
├── Experience                — Timeline of work experience (cards)
├── Projects                  — Filterable grid of project cards
│   └── ProjectCard           — Individual project: title, description, tech tags
├── Skills                    — Grouped skill badges by category
│   └── SkillBadge            — Individual skill chip
├── Education                 — Education card + thesis highlight
├── Certifications            — Certification list with issuer and date
├── Volunteering              — Volunteering cards
├── Contact                   — Email, LinkedIn, GitHub links + optional contact form
└── Footer                    — Short footer with copyright
```

### Component Specifications

**`Navbar.jsx`**

- Fixed at top, transparent → solid background on scroll
- Links: About, Experience, Projects, Skills, Education, Contact
- Hamburger menu on mobile (CSS-only or minimal JS)
- Resume download button

**`Hero.jsx`**

- Full viewport height section
- Large heading: name + animated subtitle (typewriter effect for roles)
- Two CTA buttons: "View Projects" (scroll) and "Download Resume"
- Subtle animated background (CSS-only: floating geometric shapes or gradient mesh)

**`About.jsx`**

- Two-column layout: profile photo (left) + summary text (right)
- Photo with a styled border/ring effect
- On mobile: stacked, photo centered above text

**`Experience.jsx`**

- Vertical timeline with left-side date markers
- Each `ExperienceCard` shows: company, role, period, tech tags, and bullet points (collapsed by default, expandable)
- Current role visually highlighted

**`Projects.jsx`**

- Filter bar: All | AI/ML | Backend | Data Engineering | Full Stack
- Responsive card grid (3 cols desktop, 2 tablet, 1 mobile)
- Each `ProjectCard`: title, category badge, description, tech tag list, optional "Highlighted" badge for featured projects

**`Skills.jsx`**

- Grouped by category (from JSON)
- Each group has a heading and a flex-wrap of `SkillBadge` components
- Hover animations on badges

**`Education.jsx`**

- University card with GPA prominently displayed (with note about German scale)
- Thesis sub-card: highlighted with key metric (52.9% improvement over Uber baseline)
- Coursework listed as compact tags

**`Certifications.jsx`**

- Clean list/grid with issuer logos (or issuer name if no logo) and date
- Grouped by issuer if desired

**`Volunteering.jsx`**

- Cards similar to Experience but simpler
- IEEE role highlighted

**`Contact.jsx`**

- Icon links for Email, LinkedIn, GitHub
- Optional: simple mailto-based contact form (no backend needed)
- Location displayed

**`usePortfolioData.js`** — Custom hook:

```js
import { useState, useEffect } from 'react';

export function usePortfolioData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/portfolio-data.json')
      .then(res => res.json())
      .then(json => { setData(json); setLoading(false); });
  }, []);

  return { data, loading };
}
```

---

## 7. Visual Design Direction

**Aesthetic:** Dark, refined, engineering-forward — think terminal meets editorial. Clean but with personality. Not generic.

**Color Palette (CSS variables in `variables.css`):**

```css
:root {
  --color-bg:         #0a0a0f;       /* Near-black with a blue tint */
  --color-surface:    #12121a;       /* Card backgrounds */
  --color-border:     #1e1e2e;       /* Subtle borders */
  --color-accent:     #4fffb0;       /* Electric mint green — primary accent */
  --color-accent-dim: #2a9966;       /* Dimmed accent for secondary use */
  --color-text:       #e8e8f0;       /* Primary text */
  --color-muted:      #7070a0;       /* Secondary text */
  --color-highlight:  #1a1a2e;       /* Highlighted row/section bg */
  --font-display:     'Syne', sans-serif;      /* Bold headings */
  --font-body:        'DM Mono', monospace;    /* Body text — gives a dev aesthetic */
  --font-ui:          'Inter', sans-serif;     /* UI elements only */
}
```

**Typography:** Import from Google Fonts:

- `Syne` (700, 800) — display headings
- `DM Mono` (400, 500) — body and descriptions
- Use large, confident heading sizes (clamp-based for responsiveness)

**Motion:**

- Fade + slide-up on section entry (use `IntersectionObserver`)
- Staggered card reveal in Projects and Experience
- Underline animation on nav links (CSS `::after` pseudo-element)
- Subtle hover lift on cards (`transform: translateY(-4px)`)

**Details:**

- Accent green line decorators on section headings (left border or `::before` bar)
- Gradient mesh background on Hero (CSS radial gradients)
- Cards have `border: 1px solid var(--color-border)` with a glow on hover
- Terminal-style cursor blink on tagline

---

## 8. Step-by-Step Implementation Plan

### Phase 1 — Project Initialization

- [ ] Create GitHub private repository: `nadeem-portfolio`
- [ ] Set up monorepo folder structure (`client/`, `server/`)
- [ ] Initialize Vite + React inside `client/`: `npm create vite@latest client -- --template react`
- [ ] Initialize Express inside `server/`: `npm init -y && npm install express cors`
- [ ] Add root-level `.gitignore` (node_modules, dist, .env)
- [ ] Add Google Fonts link to `client/index.html` (Syne, DM Mono)
- [ ] Create `client/src/styles/variables.css` and `global.css` with theme tokens

### Phase 2 — Data Layer

- [ ] Create `client/public/portfolio-data.json` with the full schema above
- [ ] Add your profile photo as `client/public/profile.jpg`
- [ ] Add your resume PDF as `client/public/resume.pdf`
- [ ] Create `client/src/hooks/usePortfolioData.js`
- [ ] Test fetch works in browser dev tools

### Phase 3 — Layout & Navigation

- [ ] Build `App.jsx` with section anchors and the `usePortfolioData` hook at the top level
- [ ] Pass data as props down to each section
- [ ] Build `Navbar.jsx` with scroll behavior and mobile hamburger menu
- [ ] Build `Footer.jsx`

### Phase 4 — Sections (implement in order)

- [ ] `Hero.jsx` — Name, animated subtitle, CTA buttons, background effect
- [ ] `About.jsx` — Photo + summary text, responsive two-column layout
- [ ] `Experience.jsx` + `ExperienceCard.jsx` — Timeline with expandable bullets
- [ ] `Projects.jsx` + `ProjectCard.jsx` — Grid with filter bar
- [ ] `Skills.jsx` + `SkillBadge.jsx` — Grouped categories
- [ ] `Education.jsx` — University card + thesis highlight card
- [ ] `Certifications.jsx` — Certification list
- [ ] `Volunteering.jsx` — Volunteering cards
- [ ] `Contact.jsx` — Links and contact info

### Phase 5 — UI Polish

- [ ] Add `IntersectionObserver`-based scroll animations to all sections
- [ ] Test and fix responsiveness at 375px, 768px, 1024px, 1440px
- [ ] Add hover states to all interactive elements
- [ ] Check color contrast ratios (WCAG AA minimum)
- [ ] Add `<meta>` tags in `index.html` (description, og:image, og:title)
- [ ] Optimize profile photo (WebP format, max 200KB)

### Phase 6 — Deployment

- [ ] Install `gh-pages`: `npm install --save-dev gh-pages` inside `client/`
- [ ] Set `base` in `vite.config.js` to `/nadeem-portfolio/` (your repo name)
- [ ] Add deploy scripts to `client/package.json`
- [ ] Set up GitHub Actions workflow (`.github/workflows/deploy.yml`)
- [ ] Push to GitHub, verify deployment on `https://nadeem202020.github.io/nadeem-portfolio/`

---

## 9. GitHub Setup & Deployment

### Repository Setup

```bash
# Initialize and push
git init
git remote add origin https://github.com/Nadeem202020/nadeem-portfolio.git
git add .
git commit -m "feat: initial portfolio setup"
git push -u origin main
```

### Vite Config for GitHub Pages

In `client/vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/nadeem-portfolio/',   // Must match your GitHub repo name exactly
})
```

### Deploy Scripts in `client/package.json`

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)

```yaml
name: Deploy Portfolio to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install
        working-directory: ./client

      - name: Build
        run: npm run build
        working-directory: ./client

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./client/dist
```

> After first deploy, go to GitHub repo → Settings → Pages → Source: `gh-pages` branch → `/root`.

---

## 10. Sequential GitHub Copilot Prompts

Use these prompts **in order** inside VS Code with GitHub Copilot Chat. Paste each one when you're at the relevant file or folder stage.

---

### Prompt 1 — Project Bootstrap

```
Set up a Vite + React project inside a folder called `client/`. 
Configure it with:
- React 18
- A `src/` folder with `components/`, `hooks/`, `styles/` subfolders
- An `index.html` that imports Google Fonts: Syne (700, 800) and DM Mono (400, 500)
- A `public/` folder placeholder for portfolio-data.json
Do not install any CSS frameworks. We will use plain CSS with custom properties.
```

---

### Prompt 2 — CSS Theme Variables

```
Create `client/src/styles/variables.css` and `global.css`.

In variables.css, define these CSS custom properties:
--color-bg: #0a0a0f
--color-surface: #12121a
--color-border: #1e1e2e
--color-accent: #4fffb0
--color-accent-dim: #2a9966
--color-text: #e8e8f0
--color-muted: #7070a0
--color-highlight: #1a1a2e
--font-display: 'Syne', sans-serif
--font-body: 'DM Mono', monospace
--font-ui: 'Inter', sans-serif

In global.css, apply a full reset, set box-sizing border-box everywhere, set body background to var(--color-bg) and color to var(--color-text), set font-family to var(--font-body), and add smooth scrolling to html.
```

---

### Prompt 3 — Data Hook

```
Create `client/src/hooks/usePortfolioData.js`.

It should be a custom React hook that:
- Uses useState and useEffect
- Fetches `/portfolio-data.json` on mount
- Returns { data, loading, error }
- Handles fetch errors gracefully
```

---

### Prompt 4 — App Shell

```
Create `client/src/App.jsx`.

It should:
- Use the usePortfolioData hook
- Show a centered loading spinner while data is loading
- Once loaded, render sections in this order: Navbar, Hero, About, Experience, Projects, Skills, Education, Certifications, Volunteering, Contact, Footer
- Pass the relevant slice of `data` as a prop to each section (e.g., data.experience to Experience, data.projects to Projects)
- Each section should have an id attribute matching its name in lowercase for scroll navigation
```

---

### Prompt 5 — Navbar

```
Create `client/src/components/layout/Navbar.jsx`.

Requirements:
- Fixed at the top of the viewport (position: fixed)
- Transparent background that transitions to var(--color-surface) with a bottom border on scroll (use a scroll event listener)
- Logo on the left: "NM" in var(--color-accent) using var(--font-display) font
- Navigation links on the right: About, Experience, Projects, Skills, Education, Contact
- Each link scrolls smoothly to the section with matching id
- A "Resume" button styled with var(--color-accent) as a border-only button that links to /resume.pdf
- On mobile (max-width 768px): hamburger icon toggles a dropdown menu
- CSS transitions for all hover states: links get an underline that slides in using ::after pseudo-element
```

---

### Prompt 6 — Hero Section

```
Create `client/src/components/sections/Hero.jsx`.

Props: { meta }

Requirements:
- Full viewport height (100vh)
- Center content vertically and horizontally
- Display: small label "Hello, I'm", then large display heading with meta.name using var(--font-display) at ~5rem
- Below the name: an animated typewriter text that cycles through ["Software Engineer", "Backend Developer", "AI Enthusiast"] — use a simple useEffect with setInterval and useState
- Tagline paragraph with meta.tagline below the animated text
- Two buttons: "View Projects" (scrolls to #projects) and "Download Resume" (links to /resume.pdf)
- Background: two large radial gradients in var(--color-accent) at low opacity (3-5%) positioned top-right and bottom-left to create a subtle glow
- A small blinking cursor after the animated text using CSS animation
```

---

### Prompt 7 — About Section

```
Create `client/src/components/sections/About.jsx`.

Props: { meta, about }

Requirements:
- Two-column layout: profile photo on the left, text on the right
- Profile photo: circular crop, 260px diameter, with a 2px ring in var(--color-accent) offset by 4px using outline/box-shadow
- Photo src: meta.profilePhoto
- Right column: section title "About Me", then about.summary paragraph
- Below the summary: a row of icon+text items showing meta.location, meta.email (mailto link), meta.linkedin, meta.github
- On mobile (max-width: 768px): single column, photo centered at 200px diameter
- Add a fade-in + slide-up animation triggered when the section enters the viewport using IntersectionObserver
```

---

### Prompt 8 — Experience Section

```
Create `client/src/components/sections/Experience.jsx` and `client/src/components/ui/ExperienceCard.jsx`.

Props for Experience: { experience }
Props for ExperienceCard: { item, isFirst }

Experience.jsx:
- Section heading "Experience"
- Vertical timeline: a left-side vertical line in var(--color-border), each card connected by a dot in var(--color-accent)
- Maps experience array and renders ExperienceCard for each item

ExperienceCard.jsx:
- Shows: company name (large, var(--color-text)), role (var(--color-accent)), period (var(--color-muted)), type badge (Full-time / Internship)
- A "show more / show less" toggle to expand/collapse the bullet points list
- Tech tags rendered as small rounded chips using TagBadge component
- If isFirst is true, show a "Current" badge in var(--color-accent)
- Subtle left border in var(--color-accent) on hover
```

---

### Prompt 9 — Projects Section

```
Create `client/src/components/sections/Projects.jsx` and `client/src/components/ui/ProjectCard.jsx`.

Props for Projects: { projects }
Props for ProjectCard: { project }

Projects.jsx:
- Section heading "Projects"
- A filter bar with category buttons: All, AI / ML, Backend, Data Engineering, Full Stack, Embedded
- Active filter button styled with var(--color-accent) background and dark text
- Filtered project grid: 3 columns on desktop, 2 on tablet, 1 on mobile
- Staggered fade-in animation when cards enter viewport

ProjectCard.jsx:
- Card background: var(--color-surface), border: var(--color-border), border-radius 8px
- Category badge at the top in small caps
- "Highlighted" badge in var(--color-accent) for projects where highlight: true
- Title in var(--font-display)
- Description text
- Bullet list (collapsed by default, expandable toggle)
- Tech tag chips at the bottom using TagBadge
- Hover: translateY(-4px) and border glow in var(--color-accent) at low opacity
```

---

### Prompt 10 — Skills Section

```
Create `client/src/components/sections/Skills.jsx` and `client/src/components/ui/SkillBadge.jsx`.

Props for Skills: { skills }
Props for SkillBadge: { label }

Skills.jsx:
- Section heading "Skills"
- Maps skills.categories array
- Each category renders its name as a subheading and a flex-wrap row of SkillBadge components

SkillBadge.jsx:
- Rounded pill shape
- Background: var(--color-surface), border: 1px solid var(--color-border), text: var(--color-text)
- On hover: border color transitions to var(--color-accent), text color transitions to var(--color-accent)
- Smooth CSS transition on all hover properties
```

---

### Prompt 11 — Education Section

```
Create `client/src/components/sections/Education.jsx`.

Props: { education }

Requirements:
- Section heading "Education"
- For each education item: institution name, degree, period, and a prominent GPA display with the gpaNote in smaller muted text
- Relevant coursework rendered as small tag chips
- A visually distinct thesis card below the main education card:
  - Left accent border in var(--color-accent)
  - Title: "Bachelor Thesis"
  - Thesis title in var(--font-display)
  - Grade badge "A+"
  - Description text
  - A prominent metric callout: "+52.9% over Uber's LSTM baseline" styled as a large number in var(--color-accent)
  - Tech tags
```

---

### Prompt 12 — Certifications Section

```
Create `client/src/components/sections/Certifications.jsx`.

Props: { certifications }

Requirements:
- Section heading "Certifications"
- Responsive grid: 3 columns desktop, 2 tablet, 1 mobile
- Each cert card: certification title (bold), issuer name (var(--color-accent)), date (var(--color-muted))
- Subtle left border in var(--color-accent-dim)
- Cards have the standard var(--color-surface) background and var(--color-border) border
```

---

### Prompt 13 — Volunteering Section

```
Create `client/src/components/sections/Volunteering.jsx`.

Props: { volunteering }

Requirements:
- Section heading "Volunteering & Leadership"
- Two cards side by side on desktop, stacked on mobile
- Each card: role (bold, var(--font-display)), organization (var(--color-accent)), period (var(--color-muted)), bullet points
- IEEE Director card visually elevated: slightly larger, with a top accent bar in var(--color-accent)
```

---

### Prompt 14 — Contact Section

```
Create `client/src/components/sections/Contact.jsx`.

Props: { meta }

Requirements:
- Section heading "Get In Touch"
- Short paragraph inviting recruiters and collaborators to reach out
- Three large icon+label link cards: Email, LinkedIn, GitHub
- Each card: centered icon (use Unicode or SVG), label, and the actual link text
- On hover: border color transitions to var(--color-accent), card slightly lifts
- Below the cards: location line "Based in Cairo, Egypt"
- All links open in new tab (except email, which uses mailto:)
```

---

### Prompt 15 — Footer

```
Create `client/src/components/layout/Footer.jsx`.

Requirements:
- Simple, minimal footer
- Centered text: "Designed & Built by Nadeem Mohamed Soliman"
- Current year via new Date().getFullYear()
- Three icon links: GitHub, LinkedIn, Email — same as Contact section
- Top border: 1px solid var(--color-border)
- Background: var(--color-bg)
- Text color: var(--color-muted)
```

---

### Prompt 16 — Scroll Animations

```
Create a utility at `client/src/hooks/useScrollAnimation.js`.

It should:
- Accept a ref and an optional options object
- Use IntersectionObserver to detect when the ref element enters the viewport
- Return a boolean `isVisible`
- Default threshold: 0.15

Then apply it to every section component:
- Add a CSS class `section-hidden` by default (opacity: 0, transform: translateY(24px))
- When isVisible becomes true, add class `section-visible` (opacity: 1, transform: translateY(0), transition: 0.6s ease)
- For grid sections (Projects, Skills, Certifications), apply staggered animation-delay to each child card (0ms, 100ms, 200ms, etc.)
```

---

### Prompt 17 — Responsiveness Audit

```
Review all section components and fix any responsiveness issues.

Apply these breakpoints consistently using CSS media queries:
- Mobile: max-width 480px
- Tablet: max-width 768px
- Desktop: min-width 769px

Check and fix:
1. Navbar hamburger menu works and closes on link click
2. Hero text doesn't overflow on small screens (use clamp() for font-size)
3. About section stacks to single column on mobile
4. Experience timeline collapses cleanly on mobile
5. Projects grid goes from 3 → 2 → 1 columns
6. Skills badges wrap correctly
7. Education and Certifications grids stack on mobile
8. Contact cards stack vertically on mobile
9. All touch targets are at least 44x44px
```

---

### Prompt 18 — Meta Tags & SEO

```
Update `client/index.html` to add:
- <title>Nadeem Mohamed Soliman — Software Engineer</title>
- <meta name="description" content="Portfolio of Nadeem Mohamed Soliman, a software engineer specializing in backend systems, data engineering, and AI applications.">
- <meta property="og:title" content="Nadeem Mohamed Soliman">
- <meta property="og:description" content="Software Engineer — Backend, Data Engineering, AI">
- <meta property="og:image" content="/profile.jpg">
- <meta property="og:type" content="website">
- <meta name="viewport" content="width=device-width, initial-scale=1.0">
- <link rel="icon" type="image/png" href="/favicon.ico"> (you'll add the actual favicon file)
```

---

### Prompt 19 — Build & Deploy

```
Configure the project for GitHub Pages deployment.

1. In `client/vite.config.js`, set base to '/nadeem-portfolio/' 
2. In `client/package.json`, add:
   - "predeploy": "npm run build"
   - "deploy": "gh-pages -d dist"
3. Install gh-pages as a dev dependency
4. Create `.github/workflows/deploy.yml` with a GitHub Actions workflow that:
   - Triggers on push to main
   - Installs dependencies in ./client
   - Runs npm run build in ./client
   - Deploys ./client/dist to the gh-pages branch using peaceiris/actions-gh-pages@v4
```

---

*End of development plan. Good luck, Nadeem — and congratulations on your upcoming graduation, God willing.*
