import { allProjects, Project } from "contentlayer/generated";

type ProjectPage = {
  project: Project;
};

export async function GetStaticPaths() {
  const paths = allProjects.map((project) => ({
    params: { slug: project._raw.flattenedPath },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps() {}

export default function ProjectPage() {
  return <div></div>;
}
