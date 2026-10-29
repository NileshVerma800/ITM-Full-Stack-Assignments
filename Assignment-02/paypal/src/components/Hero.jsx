import { Link } from 'react-router-dom'
import { externalLink } from '../data/content'

function Hero({ content }) {
  return (
    <section className="hero">
      <h1 className="hero-title">{content.title}</h1>
      <h2 className="hero-subtitle">{content.subtitle}</h2>
      <p className="hero-description">{content.description}</p>
      <div className="hero-buttons">
        <Link to="/signup" className="btn btn-dark btn-large">
          {content.primary}
        </Link>
        <a
          href={externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-light btn-large"
        >
          {content.secondary}
        </a>
      </div>
    </section>
  )
}

export default Hero
