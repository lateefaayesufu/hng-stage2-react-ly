import React from "react";
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
                fontSize: "48px",
                fontWeight: "800",
                marginBottom: "16px",
                background:
                  "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, var(--tertiary) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.02em",
                lineHeight: "1.1",
              }}
            >
              Everything you need to
              <br />
              manage tickets ⚡
            </h2>
            <p
              className="text-muted"
              style={{
                fontSize: "20px",
                maxWidth: "650px",
                margin: "0 auto",
                lineHeight: "1.6",
              }}
            >
              Simple, powerful, and designed for teams that move at lightning
              speed
            </p>
          </div>

          <div className="grid grid-3 mt-4">
            <div className="card text-center">
              <div style={{ marginBottom: "16px" }}>
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"
                    fill="url(#lightning)"
                    stroke="var(--primary)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <defs>
                    <linearGradient
                      id="lightning"
                      x1="3"
                      y1="2"
                      x2="21"
                      y2="22"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="var(--primary)" stopOpacity="0.3" />
                      <stop
                        offset="1"
                        stopColor="var(--secondary)"
                        stopOpacity="0.5"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className="card-title">Lightning Fast</h3>
              <p className="card-description">
                Create, update, and manage tickets in seconds. Built for speed
                and efficiency.
              </p>
            </div>

            <div className="card text-center">
              <div style={{ marginBottom: "16px" }}>
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="url(#target)"
                    stroke="var(--primary)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="6"
                    fill="none"
                    stroke="var(--secondary)"
                    strokeWidth="1.5"
                  />
                  <circle cx="12" cy="12" r="2" fill="var(--tertiary)" />
                  <defs>
                    <radialGradient
                      id="target"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(12 12) scale(10)"
                    >
                      <stop stopColor="var(--primary)" stopOpacity="0.2" />
                      <stop
                        offset="1"
                        stopColor="var(--secondary)"
                        stopOpacity="0.05"
                      />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
              <h3 className="card-title">Stay Organized</h3>
              <p className="card-description">
                Track ticket status with visual indicators. Keep your workflow
                clean and simple.
              </p>
            </div>

            <div className="card text-center">
              <div style={{ marginBottom: "16px" }}>
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="5"
                    y="11"
                    width="14"
                    height="10"
                    rx="2"
                    fill="url(#lock)"
                    stroke="var(--primary)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 11V7a4 4 0 018 0v4"
                    stroke="var(--secondary)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="12" cy="16" r="1.5" fill="var(--tertiary)" />
                  <defs>
                    <linearGradient
                      id="lock"
                      x1="5"
                      y1="11"
                      x2="19"
                      y2="21"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="var(--primary)" stopOpacity="0.2" />
                      <stop
                        offset="1"
                        stopColor="var(--secondary)"
                        stopOpacity="0.1"
                      />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
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
      <section
        style={{
          padding: "80px 0",
          background: "var(--surface)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative glow effect */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        ></div>

        <div
          className="container text-center"
          style={{ position: "relative", zIndex: 1 }}
        >
          <h2
            style={{
              fontSize: "48px",
              fontWeight: "800",
              marginBottom: "24px",
              background:
                "linear-gradient(135deg, var(--secondary), var(--primary))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-0.02em",
            }}
          >
            Ready to get started?
          </h2>
          <p
            className="text-muted mb-3"
            style={{
              fontSize: "20px",
              maxWidth: "500px",
              margin: "0 auto 32px",
            }}
          >
            Join teams managing thousands of tickets every day
          </p>
          <a
            href="/auth/signup"
            className="btn btn-primary"
            style={{ fontSize: "18px", padding: "16px 40px" }}
          >
            Start Free Today →
          </a>
        </div>
      </section>
    </>
  );
}

export default Home;
