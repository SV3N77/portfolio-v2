import { allProjects, Project } from "contentlayer/generated";
import { GetStaticPropsContext } from "next";

type ProjectPageProps = {
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

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const project = allProjects.find(
    (project) => project._raw.flattenedPath === params!.slug
  );

  if (!project || !project.images) {
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
    <div className="my-20 flex flex-col gap-4">
      <div>{project.title}</div>
    </div>
  );
}
