import "./footer.css"; // or the correct relative path to your CSS file

export default function Footer({ meta }) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      id: "email",
      icon: "✉️",
      href: meta?.email ? `mailto:${meta.email}` : null,
      external: false,
    },
    {
      id: "linkedin",
      icon: "💼",
      href: meta?.linkedin
        ? meta.linkedin
        : "https://www.linkedin.com/in/nadeem-soliman",
      external: true,
    },
    {
      id: "github",
      icon: "🔧",
      href: meta?.github || "https://github.com/nadeem202020",
      external: true,
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          Designed & Built by Nadeem Mohamed Soliman © {currentYear}
        </p>

        {/* Social Links */}
        <div className="footer-links">
          {socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="footer-link"
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              aria-label={link.id}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
