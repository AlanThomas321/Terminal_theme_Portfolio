import aboutMe from '../components/data/Aboutme.json';
import './AboutMe.css';

export default function AboutMe() {
  return (
    <div className="details">
      <h2>{aboutMe.name}</h2>
      <h4>{aboutMe.title}</h4>
      <p className="description">{aboutMe.description}</p>

      <div className="info-grid">
        <div><strong>Experience:</strong> {aboutMe.experience}</div>
        <div><strong>Certification:</strong> {aboutMe.certification}</div>
        <div><strong>Email:</strong> <a href={`mailto:${aboutMe.email}`}>{aboutMe.email}</a></div>
        <div><strong>GitHub:</strong> <a href={aboutMe.github} target="_blank" rel="noopener noreferrer">Visit</a></div>
        <div><strong>Resume:</strong> <a href={aboutMe.resume} target="_blank" rel="noopener noreferrer">View PDF</a></div>
        <div><strong>Hobby:</strong> {aboutMe.hobby}</div>
      </div>

      <h5>Skills:</h5>
      <ul className="skills-list">
        {aboutMe.skills.map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}
