import './Contact.css';

export default function Contact() {
  return (
    <div className="contact-container">
      <h2>Contact Me</h2>
      <p>Let's connect! Feel free to reach out through any of the platforms below:</p>
      <div className="contact-icons">
        <a href="mailto:alanthomas2999@gmail.com" target="_blank" rel="noopener noreferrer" className="contact-icon email">
          📧 Email
        </a>
        <a href="https://github.com/AlanThomas321" target="_blank" rel="noopener noreferrer" className="contact-icon github">
          💻 GitHub
        </a>
        <a href="https://linkedin.com/in/alanthomas321" target="_blank" rel="noopener noreferrer" className="contact-icon linkedin">
          💼 LinkedIn
        </a>
      </div>
    </div>
  );
}
