import { allProjects, Project } from "contentlayer/generated";
import { GetStaticPropsContext } from "next";

type ProjectPageProps = {
  project: Project;
};

export async function getStaticPaths() {
  const paths = allProjects.map((project) => ({
    params: { slug: project._raw.flattenedPath },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const project = allProjects.find(
    (project) => project._raw.flattenedPath === params!.slug
  );

  if (!project) {
    return { notFound: true };
  }

  return {
    props: {
      key: project._id,
      project,
    },
  };
}

export default function ProjectPage({ project }: ProjectPageProps) {
  return (
    <div className="container my-20 mx-auto flex flex-col gap-4">
      <h1 className="text-3xl">{project.title}</h1>
    </div>
  );
}
