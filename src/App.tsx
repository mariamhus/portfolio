import { Contact } from "./components/Contact";
import { Hero } from "./components/Hero";
import { Layout } from "./components/Layout";
import { Projects } from "./components/Projects";
import { TechMarquee } from "./components/TechMarquee";

export default function App() {
  return (
    <Layout page="home">
      <Hero />
      <Projects />
      <TechMarquee />
      <Contact />
    </Layout>
  );
}
