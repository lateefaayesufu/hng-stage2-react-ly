import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero hero-gradient">
      {/* Decorative Circles */}
      <div className="hero-circle hero-circle-1" aria-hidden="true"></div>
      <div className="hero-circle hero-circle-2" aria-hidden="true"></div>

      <div className="container">
        <div className="hero-content">
          <h1>
            Manage Tickets with <br />
            <span className="hero-gradient-text">Lightning Speed</span>
          </h1>
          <p>
            The modern ticket management system designed for teams that move
            fast. Track, organize, and resolve issues with elegance and
            efficiency.
          </p>
          <div className="hero-cta">
            <Link to="/auth/signup" className="btn btn-primary">
              Get Started Free
            </Link>
            <Link to="/auth/login" className="btn btn-secondary">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Wave SVG */}
      <div className="hero-wave">
        <svg
          viewBox="0 0 1440 120"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop
                offset="0%"
                style={{ stopColor: "#8b5cf6", stopOpacity: 0.3 }}
              />
              <stop
                offset="50%"
                style={{ stopColor: "#06b6d4", stopOpacity: 0.3 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#8b5cf6", stopOpacity: 0.3 }}
              />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveGradient)"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}

export default Hero;
