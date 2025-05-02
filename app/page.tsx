import CallToAction from "./components/CallToAction";
import Experience from "./components/experience";
import Footer from "./components/Footer";
import Intro from "./components/intro";
import NavBar from "./components/NavBar";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import ThemeProvider from "./components/theme-provider";

export default function Home() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="w-[70%] mx-auto sticky top-0 z-50 bg-white">
        <NavBar />
      </div>
      <main className="p-10 w-full max-w-7xl px-4 mx-auto">
        <Intro />
        <TechStack />
        <Experience />
        <Projects />
        <CallToAction />
        <Footer />
      </main>
    </ThemeProvider>
  );
}
