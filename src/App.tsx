import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Hero } from "./components/Hero";
import { Layout } from "./components/Layout";
import { Projects } from "./components/Projects";
import { TechMarquee } from "./components/TechMarquee";
import { WorkProjects } from "./components/WorkProjects";

export default function App() {
  return (
    <Layout page="home">
      <Hero />
      <About />
      <WorkProjects />
      <Projects />
      <TechMarquee />
      <Contact />
    </Layout>
  );
}
