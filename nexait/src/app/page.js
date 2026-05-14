import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import "./globals.css";
import Portfolio from "./components/Portfolio";
import SwiperWrapper from "./components/SwiperWrapper";
import ExpandCards from "./components/ExpandCards";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="w-full">
      <Navbar />
      <Hero />
      <Portfolio />
      <SwiperWrapper />
      <ExpandCards />
      <Footer />
    </div>
  );
}
