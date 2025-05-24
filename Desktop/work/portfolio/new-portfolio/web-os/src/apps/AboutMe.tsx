import aboutMe from '../components/data/Aboutme.json';
import './AboutMe.css'

export default function AboutMe() {
  return (
    <div>
      <h2>{aboutMe.name}</h2>
      <h4>{aboutMe.title}</h4>
      <p>{aboutMe.description}</p>
      <h5>Skills:</h5>
      <ul>
        {aboutMe.skills.map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}
