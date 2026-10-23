import { About } from "./components/About";
import { Layout } from "./components/Layout";
import { WorkProjects } from "./components/WorkProjects";

// About flows straight into Professional work: the line at the end of About leads into the timeline.
export default function AboutPage() {
  return (
    <Layout page="about">
      <About />
      <WorkProjects />
    </Layout>
  );
}
