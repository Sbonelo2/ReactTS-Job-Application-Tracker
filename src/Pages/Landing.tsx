import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Landing.css';

export default function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
      navigate('/Home');
    }
  }, [navigate]);

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Job Application Tracker</h1>
          <p className="hero-subtitle">
            Stay organized and track your job search journey with ease
          </p>
          <div className="hero-buttons">
            <Link to="/registration" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Use Our Job Tracker?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Track Applications</h3>
              <p>Keep track of all your job applications in one place with detailed information</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Monitor Progress</h3>
              <p>See your job search statistics and success rates with visual dashboards</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Priority Management</h3>
              <p>Set priorities for applications and focus on the most important opportunities</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Detailed Notes</h3>
              <p>Add notes and contact information for each application</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Search & Filter</h3>
              <p>Quickly find applications using powerful search and filtering options</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Responsive Design</h3>
              <p>Access your job tracker from any device, anywhere</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Create Account</h3>
              <p>Sign up for a free account to get started</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Add Applications</h3>
              <p>Start adding your job applications with all relevant details</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Track Progress</h3>
              <p>Monitor your progress and update application statuses</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Land Your Dream Job</h3>
              <p>Stay organized and increase your chances of success</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Take Control of Your Job Search?</h2>
          <p>Join thousands of job seekers who have organized their search with our tracker</p>
          <Link to="/registration" className="btn btn-primary btn-large">
            Start Tracking Now
          </Link>
        </div>
      </section>
    </div>
  );
}
