import CallToAction from "./components/CallToAction";
import Experience from "./components/experience";
import Intro from "./components/intro";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";

export default function Home() {
  return (
    <main className="p-10 ">
      <Intro />
      <TechStack />
      <Experience />
      <Projects />
      <CallToAction />
    </main>
  );
}
