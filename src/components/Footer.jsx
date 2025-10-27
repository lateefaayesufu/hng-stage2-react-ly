import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="footer-text">
            &copy; {new Date().getFullYear()} Ticketrak. Built with React for
            Stage 2 Frontend Task.
          </p>
          <p className="footer-text mt-1" style={{ fontSize: "12px" }}>
            Multi-Framework Ticket Management System
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
