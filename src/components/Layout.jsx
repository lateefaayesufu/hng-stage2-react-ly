import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh" }}>
        <Outlet /> {/* ← THIS is what renders Home, Dashboard, etc */}
      </main>
      <Footer />
    </>
  );
}
