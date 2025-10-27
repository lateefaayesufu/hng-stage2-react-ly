import React from "react";
import Layout from "../components/Layout";
import Hero from "../components/Hero";

function Home() {
  return (
    <>
      <Hero />

      {/* Features Section */}
      <section style={{ padding: "80px 0" }}>
        <div className="container">
          <div className="text-center mb-4">
            <h2
              style={{
                fontSize: "40px",
                fontWeight: "700",
                marginBottom: "16px",
              }}
            >
              Everything you need to manage tickets
            </h2>
            <p
              className="text-muted"
              style={{ fontSize: "18px", maxWidth: "600px", margin: "0 auto" }}
            >
              Simple, powerful, and designed for modern teams
            </p>
          </div>

          <div className="grid grid-3 mt-4">
            <div className="card text-center">
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚡</div>
              <h3 className="card-title">Lightning Fast</h3>
              <p className="card-description">
                Create, update, and manage tickets in seconds. Built for speed
                and efficiency.
              </p>
            </div>

            <div className="card text-center">
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎯</div>
              <h3 className="card-title">Stay Organized</h3>
              <p className="card-description">
                Track ticket status with visual indicators. Keep your workflow
                clean and simple.
              </p>
            </div>

            <div className="card text-center">
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔒</div>
              <h3 className="card-title">Secure & Private</h3>
              <p className="card-description">
                Your data is protected with secure authentication and session
                management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "80px 0", background: "var(--surface)" }}>
        <div className="container text-center">
          <h2
            style={{
              fontSize: "40px",
              fontWeight: "700",
              marginBottom: "24px",
            }}
          >
            Ready to get started?
          </h2>
          <p className="text-muted mb-3" style={{ fontSize: "18px" }}>
            Join teams managing thousands of tickets every day
          </p>
          <a
            href="/auth/signup"
            className="btn btn-primary"
            style={{ fontSize: "18px", padding: "16px 32px" }}
          >
            Start Free Today
          </a>
        </div>
      </section>
    </>
  );
}


export default Home;
