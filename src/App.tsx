import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Experience } from "./components/Experience";
import { Hero } from "./components/Hero";
import { Layout } from "./components/Layout";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { WorkProjects } from "./components/WorkProjects";

export default function App() {
  return (
    <Layout page="home">
      <Hero />
      <About />
      <Experience />
      <WorkProjects />
      <Projects />
      <Skills />
      <Contact />
    </Layout>
  );
}
